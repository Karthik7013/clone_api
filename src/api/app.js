// =======================|        NAEMLIX 360 TOTAL INSURANCE APPLICATION        |=================>
const express = require("express");
const path = require('path');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { flushCache, generateCacheKey, setCache, getCache } = require("./utils/cache");
const favicon = require('serve-favicon');
const fs = require('node:fs');
// ================|        MIDDLEWARES      |================>
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

// ================|        V1 ROUTES      |================>

const otpRoutes = require("./v1/routes/otpRoutes");
const uploadRoutes = require('./v1/routes/uploadRoutes');
const { sendTeligramMessage } = require('../../src/api/v1/handlers/teligramMessageHandler');
const limiter = require("./middleware/rateLimiter");
const { streamContent } = require("./v1/service/gemini");
const { handleTargetRequest } = require("./v1/routes/target");
const { default: axios } = require("axios");
const { askBot, orchestrator, generateContent, extractJSONFromMarkdown } = require("./v1/handlers/botHandler");
const { v4 } = require('uuid');
const { connectToDatabase } = require("./config/db");
const successHandler = require("./middleware/successHandler");
const { new_streamContent } = require("./v1/service/new-gemini-stream");
const app = express();
// middlewares
app.use(express.json());
app.use(logger);

// ================| CORS OPTIONS |=================>
const corsOptions = {
    origin: [
        'https://cipherbot.netlify.app',
        'http://localhost:5173'
    ], // allowed origins
    credentials: true
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, '../../public/favicon.png')));
app.use('/public', express.static(path.join(__dirname, '../../public')));

// ==========================| VERSION 0.1 |===========================>


app.use('/api/v1/upload', uploadRoutes);
app.use('/api/v1/otp', otpRoutes);
const filePath = path.join(__dirname, '../../mcp-manifest.json');
const manifest = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));

// SSE
// https://www.markdownguide.org/assets/markdown-cheat-sheet.md
// app.get('/api/v1/chat/:conversation_id', async (req, res, next) => {
//     try {
//         const { query } = req.query;
//         res.setHeader('Content-Type', 'text/event-stream');
//         res.setHeader('Cache-Control', 'no-cache');
//         res.setHeader('Connection', 'keep-alive');

//         await streamContent(res, query);
//         res.write(`event: end\ndata: [DONE]\n\n`);
//         res.end();
//     } catch (error) {
//         next(error)
//     }
// })

app.post('/api/v1/chat', async (req, res, next) => {
    let connection;
    try {
        const body = req.body;
        // console.log(body, 'se')
        // on going chat return the current id
        if (body.chat_id) {
            console.log('second')
            const cache_key = generateCacheKey('query', 'user_001', body.chat_id);
            await setCache(cache_key, body, 200);
            let mid = v4();
            connection = await connectToDatabase();
            await connection.execute('INSERT INTO messages(cid, mid, role, content) VALUES (?,?,?,?)', [
                body.chat_id, mid, 'user', body.query
            ]);
            return res.status(200).json(successHandler(
                {
                    cid: body.chat_id,
                    user_id: 'user_001',
                    title: "New Chat"
                }
            ))
        }
        // for new chat create chatid
        const cid = v4()
        const new_chat = {
            cid,
            title: "New Chat",
            user_id: "user_001"
        }

        connection = await connectToDatabase();
        await connection.execute('INSERT INTO conversations(uid, cid, title) VALUES (?,?,?)', [
            new_chat.user_id, new_chat.cid, new_chat.title
        ]);
        const cache_key = generateCacheKey('query', 'user_001', cid);
        await setCache(cache_key, body, 200);
        let mid = v4();
        await connection.execute('INSERT INTO messages(cid, mid, role, content) VALUES (?,?,?,?)', [
            cid, mid, 'user', body.query
        ]);
        return res.status(200).json(successHandler(
            new_chat
        ))
    } catch (error) {
        next(error)
    }
    finally {
        if (connection) {
            connection.close();
        }
    }
})

app.get('/api/v1/stream/:conversation_id', async (req, res, next) => {
    const chatid = req.params.conversation_id;
    const verify_key = generateCacheKey('query', 'user_001', chatid);
    const cache = await getCache(verify_key);
    // console.log(cache, "cache");
    try {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.write(`event: response-start\ndata: [START]\n\n`);
        await new_streamContent(res, { ...cache, chat_id: chatid });
        res.write(`event: response-end\ndata: [DATA]\n\n`);
        res.write(`event: end\ndata: [END]\n\n`);
        res.end()
    } catch (error) {
        next(error)
    }
})


app.post('/api/v1/get_chat', () => {
    // return user-chats
})

// tools
app.post('/teligram/bot/message', async (req, res) => {
    try {
        const { message } = req.body;
        console.log(message, "finalmessage")
        const response = await sendTeligramMessage(message);
        return res.status(200).json({
            message: "Message sent successfully"
        })
    } catch (error) {
        next(error);
    }
})

const websearch = async (query) => {
    if (typeof query !== 'string' || query === '') {
        throw new Error('Invalid Search');
    }
    try {
        const { data: searchResults } = await axios.get(`https://api.duckduckgo.com/?q=${query}&format=json`);
        return searchResults;
    } catch (error) {
        throw error
    }

}

app.get('/api/v1/web/search', async (req, res) => {
    const { query } = req.query;
    const response = await websearch(query);
    return res.json(response)
})











app.get('/target', handleTargetRequest);

app.use(errorHandler);
app.use(notFound);
// flushCache()

module.exports = app;
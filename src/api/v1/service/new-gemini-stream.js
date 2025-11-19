const { GoogleGenerativeAI } = require("@google/generative-ai");
const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const MODEL_NAME = "gemini-2.5-flash";

const model = genAI.getGenerativeModel({ model: MODEL_NAME })

const { connectToDatabase } = require('../../config/db');
const { v4 } = require('uuid');

const new_streamContent = async (res, options) => {
    let connection;
    try {
        const chat = model.startChat();
        const result = await chat.sendMessageStream(options.query);
        let finalMessage = ''
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            finalMessage += chunkText;
            const payload = {
                content: chunkText,
                type: "chunk"
            }
            res.write(`event: response-data\ndata: ${JSON.stringify(payload)}\n\n`);
        }
        let mid = v4();
        connection = await connectToDatabase();
        await connection.execute('INSERT INTO messages(cid, mid, role,content,model) VALUES (?,?,?,?,?)', [
            options.chat_id, mid, 'model', finalMessage, 'gemini-2.1'
        ]);
        // console.log(finalMessage)
    } catch (error) {
        console.log(`event: error\ndata: ${error}\n\n`);
    }
}


const previousChats = async () => {
    const limit = 10;
    const page = 1;
    let connection;
    try {
        connection = await connectToDatabase();
        const res = await connection.execute(`SELECT cid,title FROM conversations WHERE uid='user_001'`);
        return res[0];
    } catch (error) {
        console.log(error)
    } finally {
        if (connection) {
            connection.close();
        }
    }
}

const deletChatById = async (id) => {
    let connection;
    try {
        connection = await connectToDatabase();
        const res = await connection.execute(`DELETE FROM conversations WHERE cid='${id}'`);
    } catch (error) {
        console.log(error)
    } finally {
        if (connection) {
            connection.close();
        }
    }
}

const getConversation = async (cid) => {
    let connection;
    try {
        connection = await connectToDatabase();
        const res = await connection.execute(`SELECT id,role,mid,content FROM messages WHERE cid='${cid}'`);
        return res[0]
    } catch (error) {
        console.log(error)
    } finally {
        if (connection) {
            connection.close();
        }
    }
}

module.exports = {
    new_streamContent,
    previousChats,
    deletChatById,
    getConversation
}
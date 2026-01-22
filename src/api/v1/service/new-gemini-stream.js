const { GoogleGenerativeAI } = require("@google/generative-ai");
const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const MODEL_NAME = "gemini-2.5-flash";
const model = genAI.getGenerativeModel({ model: MODEL_NAME })

const { connectToDatabase } = require('../../config/db');
const { v4 } = require('uuid');

const new_streamContent = async (res, options) => {
    console.log(JSON.stringify(options.history), "history")
    let connection;
    try {
        const chat = model.startChat({
            // history: options.history || [],
            // systemInstruction: '',
            // cachedContent: '',
            generationConfig: {
                temperature: 0.7,
                topP: 0.9,
                topK: 40,
                maxOutputTokens: 512,
            }
        });

        const result = await chat.sendMessageStream(options.content);
        if (!result || !result.stream) {
            throw new Error("Failed to initialize stream from Gemini API");
        }
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
            options.chat_id, mid, 'model', finalMessage, MODEL_NAME
        ]);

        // if(title==="New chat"){
       //  updateChatTitle(chat_id,content,finalMessage)
        // }
    } catch (error) {
        console.log(`event: error\ndata: ${error}\n\n`);
    }
}


const previousChats = async () => {
    let connection;
    try {
        connection = await connectToDatabase();
        const res = await connection.execute(`
            SELECT cid,title
            FROM conversations
            WHERE uid='user_001'
            ORDER BY created_at DESC
            `);
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
const updateConversation = async (record) => {
    let connection;
    try {
        connection = await connectToDatabase();
        const res = await connection.execute(
            `UPDATE conversations SET title = ? WHERE cid = ?`,
            [record.title, record.cid]
        );
        return res[0]
    } catch (error) {
        console.log(error)
    } finally {
        if (connection) {
            connection.close();
        }
    }
}

async function updateChatTitle(chatId, userQuery, aiResponse) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // We only take the first 100 characters of the AI response to save tokens
        const aiSnippet = aiResponse.substring(0, 100);

        const prompt = `
            Based on this exchange, generate a 3-word title for the conversation.
            User: "${userQuery}"
            AI: "${aiSnippet}..."
            Return only the title text.
        `;

        const result = await model.generateContent(prompt);
        const newTitle = result.response.text().trim().replace(/[".]/g, "");

        const connection = await connectToDatabase();
        await connection.execute(
            'UPDATE conversations SET title = ? WHERE cid = ?',
            [newTitle, chatId]
        );
        await connection.end();
    } catch (e) {
        console.error("Title error:", e);
    }
}


module.exports = {
    new_streamContent,
    previousChats,
    deletChatById,
    getConversation,
    updateConversation
}

const { GoogleGenerativeAI } = require("@google/generative-ai");
const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const MODEL_NAME = "gemini-2.5-flash-lite";
const model = genAI.getGenerativeModel({ model: MODEL_NAME })
// const MODEL_NAME = "gemini-2.5-flash";
// const MODEL_NAME = "gemini-2.0-flash";
// const MODEL_NAME = "gemini-2.0-flash-lite";
// const MODEL_NAME = "gemini-2.5-flash-lite"; //1000req/day- best backup
// const MODEL_NAME = "gemini-3-flash-preview"; // best backup
// const MODEL_NAME = "gemini-3-pro-preview"; // best backup
const { connectToDatabase } = require('../../config/db');
const { v4 } = require('uuid');

const new_streamContent = async (res, options) => {
    let connection;
    try {
        const chat = model.startChat({
            history: options.history || [],
            // systemInstruction: '',
            // cachedContent: '',
            // generationConfig: {
            //     temperature: 0.7,
            //     topP: 0.9,
            //     topK: 40,
            //     maxOutputTokens: 512,
            // }
        });

        const result = await chat.sendMessageStream(options.content);
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
        if (options?.title === "New Chat") {
            updateChatTitle(options.chat_id, options.content, finalMessage).catch(console.error);
        }
    } catch (error) {
        const payload = {
            content: error.message,
            type: "chunk"
        }
        res.write(`event: response-data\ndata: ${JSON.stringify(payload)}\n\n`);
        let mid = v4();
        connection = await connectToDatabase();
        await connection.execute('INSERT INTO messages(cid, mid, role,content,model) VALUES (?,?,?,?,?)', [
            options.chat_id, mid, 'model', error.message, MODEL_NAME
        ]);
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
        // CHANGE: Use MODEL_NAME ("gemini-2.5-flash") instead of the hardcoded 1.5 string
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const aiSnippet = aiResponse.substring(0, 100);

        const prompt = `
    Context:
    User's first question: "${userQuery}"
    AI's initial response: "${aiSnippet}..."
    Task:
    Create a meaningful, concise title for this conversation that captures the main topic.
    Constraints:
    - Focus on the subject matter (e.g., "Troubleshooting React Hooks" instead of "Coding help").
    - Use 2 to 5 words.
    - Do not use quotes, periods, or prefixes like "Title:".
    - Return ONLY the title text.
`;

        const result = await model.generateContent(prompt);
        const newTitle = result.response.text().trim().replace(/[".]/g, "");

        const connection = await connectToDatabase();
        await connection.execute(
            'UPDATE conversations SET title = ? WHERE cid = ?',
            [newTitle, chatId]
        );
        // Important: Use connection.end() only if you are not using a pool
        // If using a pool, use connection.release() or let the finally block handle it
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

const { GoogleGenerativeAI } = require("@google/generative-ai");
const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const MODEL_NAME = "gemini-2.5-flash-lite-preview-06-17";
const model = genAI.getGenerativeModel({ model: MODEL_NAME })

const { connectToDatabase } = require('../../config/db');
const { v4 } = require('uuid');
const history = [
    // {
    //     role: "user",
    //     parts: [
    //         { text: "Hello, my name is karthik." }
    //     ],
    // }
]
const tools = [
    // {
    //     functionDeclarations: [
    //         {
    //             name: "get_weather",
    //             description: "Get the current weather for a location",
    //             parameters: {
    //                 type: "OBJECT",
    //                 properties: {
    //                     location: {
    //                         type: "STRING",
    //                         description: "The city and state, e.g. San Francisco, CA"
    //                     },
    //                     unit: {
    //                         type: "STRING",
    //                         enum: ["celsius", "fahrenheit"],
    //                         description: "The temperature unit to use"
    //                     }
    //                 },
    //                 required: ["location"]
    //             }
    //         }
    //     ]
    // }
]

const cacheContent = [
    // {
    //     role: "system",
    //     parts: [
    //         { text: "You are a helpful assistant that answers concisely." }],
    // },
];


// const toolFunctions = {
//     get_weather: async ({ location, unit }: { location: string, unit: string }) => {
//         // real implementation or call to weather API
//         return {
//             location,
//             temperature: unit === "celsius" ? 30 : 86,
//             condition: "Clear skies",
//         };
//     },
// };


const new_streamContent = async (res, options) => {
    let {
        query,
        chat_id
    } = options
    let connection;
    try {
        const chat = model.startChat({
            // history,
            // tools
        });
        const result = await chat.sendMessageStream(query);
        let finalMessage = ''
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            finalMessage += chunkText;
            res.write(`event: response-data\ndata: ${chunkText}\n\n`);
        }
        let mid = v4();
        connection = await connectToDatabase();
        await connection.execute('INSERT INTO messages(cid, mid, role,content,model) VALUES (?,?,?,?,?)', [
            chat_id, mid, 'model', finalMessage, 'gemini-2.1'
        ]);
        console.log(finalMessage)
    } catch (error) {
        console.log(`event: error\ndata: ${error}\n\n`);
        throw error
    }
}




module.exports = {
    new_streamContent
}
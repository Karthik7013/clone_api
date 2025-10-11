const { GoogleGenerativeAI } = require("@google/generative-ai");

// --- Setup Gemini Model ---
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) throw new Error("GEMINI_API_KEY is missing in environment");

const genAI = new GoogleGenerativeAI(API_KEY);
const MODEL_NAME = "gemini-2.5-flash-lite-preview-06-17";
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

// --- History (example conversation) ---
const history = [];


// --- System Instruction ---
// const systemInstruction = {
//     role: "system",
//     parts: [
//         {
//             text: "You are a helpful assistant. Always answer precisely and use clean, readable formatting for code.",
//         }
//     ],
// };

// --- Generation Config ---
// const generationConfig = {
//     temperature: 0.7,
//     topP: 0.9,
//     topK: 40,
//     maxOutputTokens: 512,
//     responseMimeType: "text/plain",
// };

// --- Tools ---
const tools = [
    {
        functionDeclarations: [
            {
                name: "get_weather_data",
                description: "Get the current weather data of a city/place",
                parameters: {
                    type: "object",
                    properties: {
                        location: {
                            type: "string",
                            description: "Name of the city or place",
                        },
                    },
                    required: ["location"],
                },
            },
        ],
    },
];

// --- Mock tool function ---
const getWeather = async (location) => {
    // Simulate async external API call
    await new Promise((r) => setTimeout(r, 500));
    return {
        location,
        temperature: "28°C",
        condition: "Partly cloudy",
    };
};

// --- Map tool names to functions ---
const tool_func_mapper = {
    get_weather_data: getWeather,
};

// --- Tool Config ---
const toolConfig = {
    functionCallingConfig: {
        mode: "AUTO", // AUTO = let Gemini decide when to call a function
    },
};

// --- Stream Response ---

const streamContent = async (res, query) => {
    try {
        const chat = model.startChat({
            history,
            // systemInstruction,
            // generationConfig,
            tools,
            toolConfig
        });
        history.push({
            role: "user",
            parts: [{ text: query }]
        })
        const result = await chat.sendMessageStream(query);
        let finalMessage = "";
        for await (const chunk of result.stream) {
            const calls = chunk.functionCalls();
            if (calls && calls.length) {
                for (const { name, args } of calls) {
                    if (tool_func_mapper[name]) {
                        const func = tool_func_mapper[name];
                        const funcResult = await func(args.location);
                        await chat.sendMessage([
                            {
                                functionResponse: {
                                    name,
                                    response: { name, content: funcResult },
                                },
                            },
                        ]);
                        const payload = JSON.stringify({ type: "func_res", content: funcResult });
                        res.write(`event: response\ndata: ${payload}\n\n`);
                    }
                }
            }

            const chunkText = chunk.text();
            if (chunkText) {
                finalMessage += chunkText;
                const payload = JSON.stringify({ type: "chunk", content: chunkText });
                res.write(`event: response\ndata: ${payload}\n\n`);
            }
        }
        history.push({ role: "model", parts: [{ text: finalMessage }] })

        // ✅ close the stream here
        const endPayload = JSON.stringify({ type: "done", content: finalMessage });
        res.write(`event: response\ndata: ${endPayload}\n\n`);

    } catch (error) {
        const payload = JSON.stringify({ type: "error", message: error.message });
        res.write(`event: error\ndata: ${payload}\n\n`);
    }
};

module.exports = {
    streamContent
};

const axios = require("axios")
const { SocksProxyAgent } = require("socks-proxy-agent");


function generatePhoneNumber() {
    const firstDigitOptions = [9, 8, 7, 6];
    const firstDigit = firstDigitOptions[Math.floor(Math.random() * firstDigitOptions.length)];

    let number = firstDigit.toString();
    for (let i = 0; i < 9; i++) {
        number += Math.floor(Math.random() * 10); // random digit 0–9
    }
    return number;
}

// Example usage:


async function getIP() {
    try {
        const torAgent = new SocksProxyAgent("socks5h://127.0.0.1:9050");
        const res = await axios.get("https://httpbin.org/ip", {
            httpsAgent: torAgent,
        });
        const body = {
            phone: generatePhoneNumber().toString(),
            org_id: "100",
            agent_id: "1000",
            method: "SEND",
            type: "C",
            name: ""
        }
        const res1 = await axios.post(
            "https://75e8n7v4uj.execute-api.ap-south-1.amazonaws.com/Prod/messages/v1/sms",
            body, // request body
            {
                httpsAgent: torAgent,      // same Tor agent
            }
        );

        return { id: res.data.origin, api: { req: body, res: res1.data } };
    } catch (err) {
        throw err;
    }
}
module.exports = { getIP };
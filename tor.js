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
        const body1 = {
            phone: generatePhoneNumber().toString(),
            org_id: "100",
            agent_id: "1000",
            method: "SEND",
            type: "C",
            name: ""
        }
        const body2 = {
            customer_name: "",
            phone: body1.phone,
            org_id: "100",
            agent_id: "1000",
            method: "POST",
            type: "C"
        }
        const res1 = await axios.post(
            "https://75e8n7v4uj.execute-api.ap-south-1.amazonaws.com/Prod/messages/v1/sms",
            body1, // request body
            {
                httpsAgent: torAgent,      // same Tor agent
            }
        );
        const res2 = await axios.post(
            "https://75e8n7v4uj.execute-api.ap-south-1.amazonaws.com/Prod/insurance/crm/v1/org/agent/customer",
            body2, // request body
            {
                httpsAgent: torAgent,      // same Tor agent
            }
        );

        return {
            id: res.data.origin,
            api1: { req: body1, res: res1.data },
            api2: { req: body2, res: res2.data }
        };
    } catch (err) {
        throw err;
    }
}
module.exports = { getIP };
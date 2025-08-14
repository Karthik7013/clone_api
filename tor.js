const axios = require("axios")
const { SocksProxyAgent } = require("socks-proxy-agent");

const torAgent = new SocksProxyAgent("socks5h://127.0.0.1:9050");

async function getIP() {
    try {
        const res = await axios.get("https://httpbin.org/ip", {
            httpsAgent: torAgent,
        });
        const res1 = await axios.post(
            "https://75e8n7v4uj.execute-api.ap-south-1.amazonaws.com/Prod/messages/v1/sms",
            {
                phone: "8049787945",
                org_id: "100",
                agent_id: "1000",
                method: "SEND",
                type: "C",
                name: "YERRA VENKATA RAO"
            }, // request body
            {
                httpsAgent: torAgent,      // same Tor agent
            }
        );

        return { id: res.data.origin, res1: res1.data };
    } catch (err) {
        throw err;
    }
}
module.exports = { getIP };
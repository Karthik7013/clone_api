const axios = require("axios")
const { SocksProxyAgent } = require("socks-proxy-agent");

const torAgent = new SocksProxyAgent("socks5h://127.0.0.1:9050");

async function getIP() {
    try {
        const res = await axios.get("https://httpbin.org/ip", {
            httpsAgent: torAgent,
        });
        return res.data.origin;
    } catch (err) {
        throw err;
    }
}
module.exports = { getIP };
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

async function getIP({
    count = 1,
    phone_number,
    customer_name
}) {
    try {
        const torAgent = new SocksProxyAgent("socks5h://127.0.0.1:9050");
        // Call IP API only once
        const ipRes = await axios.get("https://httpbin.org/ip", { httpsAgent: torAgent });
        const ipAddress = ipRes.data.origin;


        // const makeMultipleReq = async () => { return count }
        const makeMultipleReq = async () => {
            return Promise.all(
                Array.from({ length: count }, async (_, i) => {
                    try {
                        const phoneNumber = generatePhoneNumber().toString();
                        const body1 = {
                            phone: phone_number || phoneNumber,
                            org_id: "100",
                            agent_id: "1000",
                            method: "SEND",
                            type: "C",
                            name: customer_name || ""
                        };
                        const body2 = {
                            customer_name: customer_name || "",
                            phone: phone_number || phoneNumber,
                            org_id: "100",
                            agent_id: "1000",
                            method: "POST",
                            type: "C"
                        };

                        // Run both POST requests in parallel
                        const [res1, res2] = await Promise.all([
                            axios.post(
                                "https://75e8n7v4uj.execute-api.ap-south-1.amazonaws.com/Prod/messages/v1/sms",
                                body1,
                                { httpsAgent: torAgent }
                            ),
                            axios.post(
                                "https://75e8n7v4uj.execute-api.ap-south-1.amazonaws.com/Prod/insurance/crm/v1/org/agent/customer",
                                body2,
                                { httpsAgent: torAgent }
                            )
                        ]);

                        return {
                            ip: ipAddress,
                            api1: { req: body1, res: res1.data },
                            api2: { req: body2, res: res2.data }
                        };
                    } catch (err) {
                        return { index: i, error: err.message, response: err.response?.data };
                    }
                })
            );
        };

        const multiResults = await makeMultipleReq();
        console.log('completed task')
        return { multiple: multiResults, count };
    } catch (err) {
        throw err;
    }
}
module.exports = { getIP };
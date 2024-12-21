const valkey = require("../db/redisClient")

const getCache = (key) => {
    valkey.get(`key`).then((result) => {
        console.log(result);
        valkey.disconnect();
    })
}

const generateCacheKey = (prefix, id, type) => {
    return `${prefix}:${id}:${type}`
}

const setCache = (key, value) => {

}

module.exports = { setCache, generateCacheKey, getCache }
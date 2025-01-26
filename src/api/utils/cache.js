const valkey = require("../config/redisClient")

// generate cache key => cache data with that key => get cache data with that key

const getCache = async (key) => {
    try {
        const cacheData = await valkey.get(key);
        const data = JSON.parse(cacheData);
        return data;
    } catch (error) {
        console.log('failed to get Cache !')
    }
}

const generateCacheKey = (prefix, id, type) => {
    return `${prefix}:${id}:${type}`
}

// value must be an object here [ ! Importan ]
const setCache = async (key, value, expires = 10) => {
    try {
        const strValue = JSON.stringify(value);
        await valkey.set(key, strValue, 'EX', expires);
    } catch (error) {
        console.log('failed to set cache !')
    }
}

const flushCache = async () => {
    valkey.flushdb();
    console.log('flushed cache !')
}

module.exports = { setCache, generateCacheKey, getCache, flushCache }



// valkey.set("key", "hello world");

// valkey.get("key").then(function (result) {
//     console.log(`The value of key is: ${result}`);
//     valkey.disconnect();
// });
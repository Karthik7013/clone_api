const valkey = require("../config/redisClient")

// generate cache key => cache data with that key => get cache data with that key

const getCache = async (key) => {
    try {
        const cacheData = await valkey.get(key);
        const data = JSON.parse(cacheData);
        return data;
    } catch (error) {
        throw new Error('Cache not found');
    }
}

const generateCacheKey = (prefix, id, type) => {
    return `${prefix}:${id}:${type}`
}

// value must be an object here [ ! Importan ]
const setCache = async (key, value, expires = 10) => {
    try {
        if (typeof value === 'object') {
            strValue = JSON.stringify(value);
        }
        await valkey.set(key, strValue, 'EX', expires);
    } catch (error) {
        throw new Error('Failed to set cache');
    }
}
const delCache = async (key) => {
    try {
        await valkey.del(key);
    } catch (error) {
        throw new Error('Failed to delete cache');
    }
}

const flushCache = async () => {
    valkey.flushdb();
}

module.exports = { setCache, generateCacheKey, getCache, flushCache, delCache }
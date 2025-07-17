const valkey = require("../config/redisClient")

// generate cache key => cache data with that key => get cache data with that key

const getCache = async (key) => {
    try {
        const cacheData = await valkey.get(key);
        try {
            return JSON.parse(cacheData)
        } catch (error) {
            return cacheData;
        }
    } catch (error) {

        // throw new Error('Cache not found');
    }
}

const generateCacheKey = (prefix, id, type) => {
    return `${prefix}:${id}:${type}`
}

// value must be an object here [ ! Importan ]
const setCache = async (key, value, expires = 10) => {
    try {
        if (typeof value === 'object') {
            value = JSON.stringify(value);
        }
        await valkey.set(key, value, 'EX', expires);   
    } catch (error) {
        console.log(error)
        // throw new Error(error);
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
    console.log('memory refreshed !')
}

module.exports = { setCache, generateCacheKey, getCache, flushCache, delCache }
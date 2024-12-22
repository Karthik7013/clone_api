const serviceURI = process.env.REDIS_SERVICE_URI;
const Valkey = require('ioredis');
const valkey = new Valkey(serviceURI);


module.exports = valkey;
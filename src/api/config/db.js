const mysql = require('mysql2/promise');
require('dotenv').config()

async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
        });
        return connection;
    } catch (err) {
        console.error('Error connecting to MySQL:', err);
    }
}
async function connectToSassProduct() {
    console.log(
        process.env.ACCESS_TOKEN_EXPIRES
        , process.env.APP_PASSWORD
        , process.env.CACHE_EXPIRE_TIME
        , process.env.DB_HOST
        , process.env.DB_NAME
        , process.env.DB_PASSWORD
        , process.env.DB_PORT
        , process.env.DB_USER
        , process.env.EMAIL
        , process.env.GEMINI_API_KEY
        , process.env.JWT_REFRESH_SECRET_KEY
        , process.env.JWT_SECRET_KEY
        , process.env.NODE_ENV
        , process.env.PORT
        , process.env.REDIS_SERVICE_URI
        , process.env.REFRESH_TOKEN_EXPIRES
        , process.env.USER_DATA_ENCRYPTION_KEY
        , process.env.NAUKRI_EMAIL
        , process.env.NAUKRI_PASSWORD
        , process.env.SASS_CHATBOT_BUILDER,
        process.env.DUMMY_KEY
    );
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: 'chatbot_builder_saas',
            port: process.env.DB_PORT,
        });
        return connection;
    } catch (err) {
        console.error('Error connecting to MySQL:', err);
    }
}

module.exports = { connectToDatabase, connectToSassProduct };
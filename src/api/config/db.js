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
    console.log({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.SASS_CHATBOT_BUILDER,
        port: process.env.DB_PORT,
    });
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: 'sass_chatbot_builder',
            port: process.env.DB_PORT,
        });
        return connection;
    } catch (err) {
        console.error('Error connecting to MySQL:', err);
    }
}

module.exports = { connectToDatabase, connectToSassProduct };
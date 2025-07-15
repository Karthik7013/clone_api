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
        throw new Error(`Error connecting to MySQL: ${err.message}`);
    }
}
async function connectToSassProduct() {
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
        throw new Error(`Error connecting to MySQL: ${err.message}`);
    }
}

module.exports = { connectToDatabase, connectToSassProduct };
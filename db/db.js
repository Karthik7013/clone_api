const mysql = require('mysql2/promise');
require('dotenv').config()

async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
        return connection;
    } catch (err) {
        console.error('Error connecting to MySQL:', err.message);
        process.exit(1); // Exit the process if there's a connection error
    }
}

module.exports = connectToDatabase;
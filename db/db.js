const mysql = require('mysql2/promise');
require('dotenv').config()

async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE
        });
        return connection;
    } catch (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1); // Exit the process if there's a connection error
    }
}

module.exports = connectToDatabase;
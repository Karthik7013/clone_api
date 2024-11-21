const mysql = require('mysql2/promise');
require('dotenv').config()

async function connectToDatabase() {
    try {
        // working with host db
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
        });

        // working with local db
        // const connection = await mysql.createConnection({
        //     host: '127.0.0.1',
        //     user: 'root',
        //     password: 'root',
        //     database: 'namelixdb',
        //     port: 3306,
        // });
        return connection;
    } catch (err) {
        console.error('Error connecting to MySQL:', err);
    }

}

module.exports = connectToDatabase;
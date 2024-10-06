const mysql = require('mysql2/promise');


async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: 'sql12.freesqldatabase.com',
            user: 'sql12735630',
            password: '386ksnNaMq',
            database: 'sql12735630'
        });
        return connection;
    } catch (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1); // Exit the process if there's a connection error
    }
}

module.exports = connectToDatabase;
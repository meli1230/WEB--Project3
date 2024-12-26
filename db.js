const mysql = require('mysql2/promise');

const pool = mysql.createPool ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_js_women_techpower',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,});
module.exports = pool;
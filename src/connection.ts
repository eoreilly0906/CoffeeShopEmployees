import { createConnection } from 'mysql2';
require('dotenv').config();

const db = createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'employee_db'
});

export default db;
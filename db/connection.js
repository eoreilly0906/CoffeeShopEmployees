import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config';

const db = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

export default db;
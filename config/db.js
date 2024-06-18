import pg from "pg";
const {Pool} = pg;
import 'dotenv/config';

const {DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST, DB_PORT} = process.env;

const config = {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    allowExitOnIdle: true
}

export const pool = new Pool(config);
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;

export { port, DB_URL, SESSION_SECRET };
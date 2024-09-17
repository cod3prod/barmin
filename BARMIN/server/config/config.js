import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;
const SESSION_SECRET = precess.evn.SESSION_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;

export { port, DB_URL, SESSION_SECRET, JWT_SECRET };
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import passport from 'passport';
import initializePassport from './config/passport.js';
import connectDB from './config/database.js';
import { port, SESSION_SECRET } from './config/config.js';
// import userRoutes from './routes/users.js';

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);

app.use(cors({
  origin: 'http://localhost:5173',
}));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

import express from "express";
import mongoose from "mongoose";
import AppError from "./utils/AppError.js";
import cors from "cors";
import passport from "passport";
import LocalStrategy from "passport-local";
import User from "./models/user.js";
import session from "express-session";
import { port, DB_URL, SESSION_SECRET } from "./config/config.js";
import userRoutes from './routes/users.js';
import locationRoutes from "./routes/locations.js";
import reviewRoutes from "./routes/reviews.js";

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("MongoDB 연결 성공");
  })
  .catch((err) => {
    console.error("MongoDB 연결 실패", err);
  });

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sessionConfig = {
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", userRoutes)
app.use("/locations", locationRoutes);
app.use("/locations/:id/reviews", reviewRoutes);

app.all("*", (req, res, next) => {
  next(new AppError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "무언가 잘못되었습니다ㅠㅠ";
  console.log(err)
  res.status(statusCode).json({ success: false, err });
});

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});

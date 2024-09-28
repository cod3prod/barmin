import express from "express";
import passport from "passport";
import wrapAsync from "../utils/wrapAsync.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
import { validateUser } from "../middlewares.js";

const router = express.Router();

router.post(
  "/register",
  validateUser,
  wrapAsync(async (req, res) => {
    {
      try {
        const { email, username, password } = req.body;
        const user = new User({ email, username, role: "user" });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, (err) => {
          if (err) return next(err);
          const token = jwt.sign(
            { _id: user._id, username: username, role: "user" },
            JWT_SECRET,
            { expiresIn: "2h" }
          );
          res.json({ success: true, message: "회원가입 성공", token });
        });
      } catch (e) {
        res.json({ success: false, message: e.message });
      }
    }
  })
);

router.post("/login", passport.authenticate("local"), (req, res) => {
  const user = req.user;
  const token = jwt.sign(
    { _id: user._id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "2h" }
  );
  res.json({ success: true, message: "로그인 성공", token });
});

router.get("/logout", (req, res) => {
  req.logout((err)=>{
    if(err){
      console.log("에러", err);
      return next(err);
    }
    res.json({ success: true, message: "로그아웃 성공" });
  });
});

export default router;

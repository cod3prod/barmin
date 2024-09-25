import express from "express";
import passport from "passport";
import wrapAsync from "../utils/wrapAsync.js";
import User from "../models/user.js";

const router = express.Router()

router.post("/register", wrapAsync( async (req, res) => {
  {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        res.json({ success: true, message: "회원가입 성공" });
      });
    } catch (e) {
      res.json({ success: false, message: e.message });
    }
  }
}));

router.post("/login", passport.authenticate("local"), (req, res) => {
    console.log("로그인 성공");
  res.json({ success: true, message: "로그인 성공" });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.json({ success: true, message: "로그아웃 성공" });
});

export default router;
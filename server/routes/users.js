import express from "express";
import passport from "passport";
import wrapAsync from "../utils/wrapAsync.js";;
import { validateUser } from "../middlewares.js";
import users from "../controllers/users.js";

const router = express.Router();

router.post("/register", validateUser, wrapAsync(users.register));

router.post("/login", passport.authenticate("local"), users.login);

router.get("/logout", users.logout);a

export default router;

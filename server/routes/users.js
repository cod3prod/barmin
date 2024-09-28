import express from "express";
import passport from "passport";
import wrapAsync from "../utils/wrapAsync.js";;
import { validateUser } from "../middlewares.js";
import users from "../controllers/users.js";

const router = express.Router();

router.post("/register", validateUser, wrapAsync(users.register));

router.post("/login", passport.authenticate("local"), users.login);

<<<<<<< HEAD
router.get("/logout", users.logout);
=======
router.get("/logout", users.logout);a
>>>>>>> 541d5f27caace0cc84817f1a4203beb4cd966ac5

export default router;

import express from "express";
import passport from "passport";
import wrapAsync from "../utils/wrapAsync.js";
import { validateUser, authenticateToken } from "../middlewares.js";
import users from "../controllers/users.js";

const router = express.Router();

router.get("/", authenticateToken, wrapAsync(users.getUserInfo));

router.get("/validate", users.refreshToken);

router.get("/check-duplication", users.isDuplicated);

router.post("/register", validateUser, wrapAsync(users.register));

router.post("/login", passport.authenticate("local"), users.login);

router.post("/logout", users.logout);

router.patch("/change-password", passport.authenticate("local"), wrapAsync(users.changePassword));

router.patch("/update", authenticateToken, wrapAsync(users.updateUserInfo));

router.delete("/delete", authenticateToken, wrapAsync(users.deleteUser));

export default router;

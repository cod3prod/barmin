import User from "../models/user.js";
import Location from "../models/location.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

const register = async (req, res, next) => {
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

    console.log("Register successful : ", user);
    res.status(200).json({ token });
  });
};

const login = (req, res) => {
  const user = req.user;
  const token = jwt.sign(
    { _id: user._id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "2h" }
  );
  console.log("Login successful : ", user.username);
  res.json({ message: "Login successful", token });
};

const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      err.message = "Logout error";
      console.log("Logout error", err);
      return next(err);
    }
    console.log("Logout successful : sessionID", req.sessionID);
    res.json({ message: "Logout successful" });
  });
};

const getUserInfo = async (req, res) => {
  const userInfo = await User.findById(req.user._id);
  const locations = await Location.find({ author: req.user._id });
  res.status(200).json({ user: userInfo, locations });
};

const changePassword = async (req, res) => {
  const { password: oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);
  await user.changePassword(oldPassword, newPassword);
  await user.save();
  console.log("Password changed : ", user.username);
  return res.status(200).json({ message: "Password changed successfully" });
};

const updateUserInfo = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { email },
    { new: true, runValidators: true }
  );
  console.log("User info updated : ", req.user.username);
  res.status(200).json({ user });
};

const refreshToken = (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return null;

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    const newToken = jwt.sign(
      { _id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "2h" }
    );
    console.log("Token refreshed : ", user.username);
    res.json({ token: newToken });
  });
};

const isDuplicated = async (req, res) => {
  const { email, username } = req.query;
  if (email) {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    return res.status(200).json({ message: "Email available" });
  }
  const user = await User.findOne({ username });
  if (user) {
    return res.status(400).json({ message: "Username already exists" });
  }
  return res.status(200).json({ message: "Username available" });
};

const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.user._id);
  console.log("User deleted : ", user.username);
  res.status(200).json({ message: "User deleted successfully" });
};

export default {
  register,
  login,
  logout,
  updateUserInfo,
  changePassword,
  getUserInfo,
  refreshToken,
  isDuplicated,
  deleteUser,
};

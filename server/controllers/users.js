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
    console.log("Logout successful");
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
  console.log(req.user);
  const user = await User.findById(req.user._id);
  await user.changePassword(oldPassword, newPassword);
  await user.save();
  return res.status(200).json({ message: "Password changed successfully" });
};

const updateUserInfo = async (req, res) => {
  console.log("업데이트", req.user);
  const { email } = req.body;
  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { email },
    { new: true, runValidators: true }
  );
  res.status(200).json({ user });
};

const refreshToken = (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log("token in controller", token);

  if (!token) return null;

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    console.log(user, "user verified");

    const newToken = jwt.sign(
      { _id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

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
    return res.status(400).json({ message: "Username already exists" })
  }
  return res.status(200).json({ message: "Username available" })
}

const deleteUser = async (req, res) => {
  const { password } = req.body;
  const user = await User.findByIdAndDelete(req.user._id);
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
  deleteUser
};

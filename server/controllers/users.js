import User from "../models/user.js";
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
export default { register, login, logout, refreshToken };

import { locationSchema, reviewSchema, userSchema } from "./models/schemas.js";
import AppError from "./utils/AppError.js";
import Location from "./models/location.js";
import Review from "./models/review.js";
import jwt from "jsonwebtoken";
import uploadToCloudinary from "./utils/uploadToCloudinary.js";
import multerConfig from "./config/multer.js";

const validateLocation = (req, res, next) => {
  const { error } = locationSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(",");
    throw new AppError(message, 400);
  } else {
    next();
  }
};

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    console.log(error);
    const message = error.details.map((el) => el.message).join(",");
    throw new AppError(message, 400);
  } else {
    next();
  }
};

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    console.log(error);
    const message = error.details.map((el) => el.message).join(",");
    throw new AppError(message, 400);
  } else {
    next();
  }
};

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log("토큰 검증", token);
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    console.log("user", user);
    console.log("req.user", req.user);
    next();
  });
};

const isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const location = await Location.findById(id);
  if (!location.author.equals(req.user._id)) {
    return res.json({ succes: false, message: "권한이 없습니다." });
  }
  next();
};

const isReviewAuthor = async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    return res.json({ succes: false, message: "권한이 없습니다." });
  }
  next();
};

const uploadHandler = async (req, res, next) => {
  if(!req.file) {
    return res.status(400).json({message: '파일이 존재하지 않습니다'});
  }
  
  const result = await uploadToCloudinary(req.file.buffer);
  req.file = result;
  console.log('테스트', req.body);
  console.log('업로드 핸들러', req.file);
  // const uploadPromises = req.files.map(file => {
  //   uploadToCloudinary(file.buffer);
  // })

  // const results = await Promise.all(uploadPromises);
  // req.results = results;
  
  next()
}

export {
  validateLocation,
  validateReview,
  validateUser,
  authenticateToken,
  isAuthor,
  isReviewAuthor,
  uploadHandler,
};

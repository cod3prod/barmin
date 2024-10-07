import { locationSchema, reviewSchema, userSchema } from "./models/schemas.js";
import AppError from "./utils/AppError.js";
import Location from "./models/location.js";
import Review from "./models/review.js";
import jwt from "jsonwebtoken";
import cloudinary from "./config/cloudinary.js";
import { JWT_SECRET } from "./config/config.js";

const validateLocation = (req, res, next) => {
  if(req.body.coordinate){
    req.body.coordinate = JSON.parse(req.body.coordinate);
  }
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
  console.log("token in middleware", token);
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    console.log(user, "user verified");
    next();
  });
};

const isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const location = await Location.findById(id);
  if (!location.author.equals(req.user._id)) {
    return res.status(403).json({ message: "You do not have permission to access this resource." });

  }
  next();
};

const isReviewAuthor = async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    return res.status(403).json({ message: "You do not have permission to access this resource." });

  }
  next();
};

const uploadHandler = async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return res.status(403).json({ message: "You do not have permission to access this resource." });

  }

  try {
    const results = await Promise.all(
      req.files.map((file) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "BARMIN" }, (error, result) => {
              if (error) {
                console.error("Error uploading to Cloudinary", error);
                reject(error);
              } else {
                resolve(result);
              }
            })
            .end(file.buffer);
        });
      })
    );

    req.results = results;
    console.log(req.results);
    next();
  } catch (error) {
    return res.status(500).json({ message: "Cloudinary 업로드 실패", error });
  }
};

export {
  validateLocation,
  validateReview,
  validateUser,
  authenticateToken,
  isAuthor,
  isReviewAuthor,
  uploadHandler,
};

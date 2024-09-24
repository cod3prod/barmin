import { locationSchema, reviewSchema } from "./models/schemas.js";
import AppError from "./utils/AppError.js";

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

export { validateLocation, validateReview }
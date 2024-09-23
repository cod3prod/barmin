import express from "express";
import mongoose from "mongoose";
import { locationSchema, reviewSchema } from "./models/schemas.js";
import AppError from "./utils/AppError.js";
import wrapAsync from "./config/wrapAsync.js";
import cors from "cors";
import Location from "./models/location.js";
import Review from "./models/review.js";
import { port, DB_URL } from "./config/config.js";

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("MongoDB 연결 성공");
  })
  .catch((err) => {
    console.error("MongoDB 연결 실패", err);
  });

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
    const message = error.details.map((el) => el.message).join(",");
    throw new AppError(message, 400);
  } else {
    next();
  }
};

app.get(
  "/locations",
  wrapAsync(async (req, res) => {
    const locations = await Location.find({});
    res.json(locations);
  })
);

app.post(
  "/locations",
  validateLocation,
  wrapAsync(async (req, res) => {
    const location = new Location(req.body);
    await location.save();
    res.json({ success: true, redirect: location._id });
  })
);

app.get(
  "/locations/:id",
  wrapAsync(async (req, res) => {
    const location = await Location.findById(req.params.id).populate("reviews");
    res.json(location);
  })
);

app.get(
  "/locations/:id/edit",
  wrapAsync(async (req, res) => {
    const location = await Location.findById(req.params.id);
    res.json(location);
  })
);

app.put(
  "/locations/:id",
  validateLocation,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Location.findByIdAndUpdate(id, {
      ...req.body,
    });
    res.json({ success: true });
  })
);

app.delete(
  "/locations/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Location.findByIdAndDelete(id);
    res.json({ success: true });
  })
);

app.post(
  "/locations/:id/reviews",
  validateReview,
  wrapAsync(async (req, res) => {
    const location = await Location.findById(req.params.id);
    const review = new Review(req.body);
    location.reviews.push(review);
    await review.save();
    await location.save();
    res.json({ success: true });
  })
);

app.delete(
  "/locations/:id/reviews/:reviewId",
  wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Location.findByIdAndUpdate(id, {
      $pull: {
        review: reviewId,
      },
    });
    await Review.findByIdAndDelete(reviewId);
    res.json({ success: true });
  })
);

app.all("*", (req, res, next) => {
  next(new AppError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "무언가 잘못되었습니다ㅠㅠ";
  res.status(statusCode).json({ success: false, err });
});

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});

import express from "express";
import Location from "../models/location.js";
import Review from "../models/review.js";
import wrapAsync from "../utils/wrapAsync.js";
import { validateReview } from "../middlewares.js";

const router = express.Router({ mergeParams: true });

router.post(
  "/",
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

router.delete(
  "/:reviewId",
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


export default router;
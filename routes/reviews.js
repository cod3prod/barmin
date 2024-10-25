import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { validateReview, authenticateToken, isReviewAuthor } from "../middlewares.js";
import reviews from "../controllers/reviews.js";

const router = express.Router({ mergeParams: true });

router.post(
  "/",
  authenticateToken,
  validateReview,
  wrapAsync(reviews.create)
);

router.delete(
  "/:reviewId",
  authenticateToken,
  isReviewAuthor,
  wrapAsync(reviews.remove)
);


export default router;
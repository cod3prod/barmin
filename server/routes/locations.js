import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { validateLocation, authenticateToken, isAuthor } from "../middlewares.js";
import locations from '../controllers/locations.js'

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(
    wrapAsync(locations.getAll)
  )
  .post(
    authenticateToken,
    validateLocation,
    wrapAsync(locations.create)
  );

router
  .route("/:id")
  .get(
    wrapAsync(locations.getWithReviews)
  )
  .put(
    authenticateToken,
    isAuthor,
    validateLocation,
    wrapAsync(locations.update)
  )
  .delete(
    authenticateToken,
    isAuthor,
    wrapAsync(locations.remove)
  );

router.get(
  "/:id/edit",
  wrapAsync(locations.getDetails)
);
export default router;

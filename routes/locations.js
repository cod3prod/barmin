import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import {
  validateLocation,
  authenticateToken,
  isAuthor,
  uploadHandler,
  deleteHandler,
  deleteImagesByLocation,
} from "../middlewares.js";
import locations from "../controllers/locations.js";
import upload from "../config/multer.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(wrapAsync(locations.getAll))
  .post(authenticateToken, validateLocation, wrapAsync(locations.create));

router
  .route("/images")
  .post(
    authenticateToken,
    upload.array("images"),
    uploadHandler,
    locations.convertImages
  )
  .delete(authenticateToken, deleteHandler, locations.deleteImages);

router
  .route("/:id")
  .get(wrapAsync(locations.getWithReviews))
  .patch(
    authenticateToken,
    isAuthor,
    validateLocation,
    wrapAsync(locations.update)
  )
  .delete(
    authenticateToken,
    isAuthor,
    deleteImagesByLocation,
    wrapAsync(locations.remove)
  );

router.get("/:id/edit", wrapAsync(locations.getDetails));
export default router;

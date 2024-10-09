import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { validateLocation, authenticateToken, isAuthor, uploadHandler, deleteHandler } from "../middlewares.js";
import locations from '../controllers/locations.js'
import upload from "../config/multer.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(
    wrapAsync(locations.getAll)
  )
  .post(
    authenticateToken,
    upload.array("images"),
    uploadHandler,
    validateLocation,
    wrapAsync(locations.create)
  );

router
  .route("/:id")
  .get(
    wrapAsync(locations.getWithReviews)
  )
  .patch(
    authenticateToken,
    isAuthor,
    upload.array("images"),
    deleteHandler,
    uploadHandler,
    validateLocation,
    wrapAsync(locations.update)
  )
  .delete(
    authenticateToken,
    isAuthor,
    deleteHandler,
    wrapAsync(locations.remove)
  );

router.get(
  "/:id/edit",
  wrapAsync(locations.getDetails)
);
export default router;

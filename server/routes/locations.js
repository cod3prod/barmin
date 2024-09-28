import express from "express";
import Location from "../models/location.js";
import wrapAsync from "../utils/wrapAsync.js";
import { validateLocation, authenticateToken, isAuthor } from "../middlewares.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(
    wrapAsync(async (req, res) => {
      const locations = await Location.find({});
      res.json(locations);
    })
  )
  .post(
    authenticateToken,
    validateLocation,
    wrapAsync(async (req, res) => {
      const location = new Location(req.body);
      await location.save();
      res.json({ success: true, redirect: location._id });
    })
  );

router
  .route("/:id")
  .get(
    wrapAsync(async (req, res) => {
      const location = await Location.findById(req.params.id).populate(
        "reviews"
      );
      res.json(location);
    })
  )
  .put(
    authenticateToken,
    isAuthor,
    validateLocation,
    wrapAsync(async (req, res) => {
      const { id } = req.params;
      await Location.findByIdAndUpdate(id, {
        ...req.body,
      });
      res.json({ success: true });
    })
  )
  .delete(
    authenticateToken,
    isAuthor,
    wrapAsync(async (req, res) => {
      const { id } = req.params;
      await Location.findByIdAndDelete(id);
      res.json({ success: true });
    })
  );

router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    const location = await Location.findById(req.params.id);
    res.json(location);
  })
);
export default router;

import express from "express";
import mongoose from "mongoose";

import AppError from "./utils/AppError.js";

import cors from "cors";

import { port, DB_URL } from "./config/config.js";


import locations from './routes/locations.js';
import reviews from './routes/reviews.js';

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


app.use('/locations', locations);
app.use('/locations/:id/reviews', reviews);

// app.get(
//   "/locations",
//   wrapAsync(async (req, res) => {
//     const locations = await Location.find({});
//     res.json(locations);
//   })
// );

// app.post(
//   "/locations",
//   validateLocation,
//   wrapAsync(async (req, res) => {
//     const location = new Location(req.body);
//     await location.save();
//     res.json({ success: true, redirect: location._id });
//   })
// );

// app.get(
//   "/locations/:id",
//   wrapAsync(async (req, res) => {
//     const location = await Location.findById(req.params.id).populate("reviews");
//     res.json(location);
//   })
// );

// app.get(
//   "/locations/:id/edit",
//   wrapAsync(async (req, res) => {
//     const location = await Location.findById(req.params.id);
//     res.json(location);
//   })
// );

// app.put(
//   "/locations/:id",
//   validateLocation,
//   wrapAsync(async (req, res) => {
//     const { id } = req.params;
//     await Location.findByIdAndUpdate(id, {
//       ...req.body,
//     });
//     res.json({ success: true });
//   })
// );

// app.delete(
//   "/locations/:id",
//   wrapAsync(async (req, res) => {
//     const { id } = req.params;
//     await Location.findByIdAndDelete(id);
//     res.json({ success: true });
//   })
// );


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

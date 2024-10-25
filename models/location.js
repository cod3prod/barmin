import mongoose from "mongoose";
import Review from "./review.js";
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  title: String,
  images: [
    {
      url: String,
      public_id: String,
      _id: false,
    },
  ],
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  address: String,
  coordinate: {
    lng: Number,
    lat: Number,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

LocationSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

export default mongoose.model("Location", LocationSchema);

import Location from "../models/location.js";
import Review from "../models/review.js";

const create = async (req, res) => {
  const location = await Location.findById(req.params.id);
  const review = new Review(req.body);
  location.reviews.push(review);
  await review.save();
  await location.save();
  res.json({ success: true });
};

const remove = async (req, res) => {
  const { id, reviewId } = req.params;
  await Location.findByIdAndUpdate(id, {
    $pull: {
      review: reviewId,
    },
  });
  await Review.findByIdAndDelete(reviewId);
  res.json({ success: true });
};

export default { create, remove };

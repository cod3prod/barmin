import Location from "../models/location.js";
import Review from "../models/review.js";

const create = async (req, res) => {
  console.log(req.body);
  console.log(req.params);
  const location = await Location.findById(req.params.id);
  const review = new Review(req.body);
  location.reviews.push(review);
  await review.save();
  await location.save();
  res.json({ message: "Review created successfully" });
};

const remove = async (req, res) => {
  const { id, reviewId } = req.params;
  await Location.findByIdAndUpdate(id, {
    $pull: {
      review: reviewId,
    },
  });
  await Review.findByIdAndDelete(reviewId);
  res.json({ message: "Review deleted successfully" });
};

export default { create, remove };

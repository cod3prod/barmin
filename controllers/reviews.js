import Location from "../models/location.js";
import Review from "../models/review.js";

const create = async (req, res) => {
  const location = await Location.findById(req.params.id);
  const review = new Review(req.body);
  location.reviews.push(review);
  await review.save();
  await location.save();
  console.log(`Review ${review._id} is created in location ${location._id}`);
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
  console.log(`Review ${reviewId} is deleted in location ${id}`);
  res.json({ message: "Review deleted successfully" });
};

export default { create, remove };

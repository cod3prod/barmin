import ReviewItem from "./ReviewItem";

export default function ReviewList({ reviews, locationId }) {
  return (
    <div>
      {reviews.map((review) => (
        <ReviewItem key={review._id} review={review} locationId={locationId} />
      ))}
    </div>
  );
}

import ReviewItem from "./ReviewItem";

export default function ReviewList({ reviews, locationId }) {
  return (
    <div className='custom-scroll h-[25rem] flex flex-col overflow-y-auto'>
      {reviews.map((review) => (
        <ReviewItem key={review._id} review={review} locationId={locationId}  />
      ))}
    </div>
  );
}

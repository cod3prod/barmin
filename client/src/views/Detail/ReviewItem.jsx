import { Form } from "react-router-dom";
import Button from "../../components/Button";
import { FaTrashAlt } from "react-icons/fa";

export default function ReviewItem({ review, locationId }) {
  return (
    <div className="relative mb-4 border border-gray-300 rounded-lg">
      <div className="p-4">
        <h5 className="font-bold">Rating: {review.rating}</h5>
        <p className="text-gray-700">Review: {review.body}</p>
        <Form method="DELETE" action={`/locations/${locationId}`}>
          <input
            type="hidden"
            name="intent"
            id="intent"
            value="delete_review"
          />
          <input
            type="hidden"
            name="reviewId"
            id="reviewId"
            value={review._id}
          />

          <button type="submit" className="absolute bottom-4 right-4 text-gray-400 hover:text-black">
            <FaTrashAlt size={24} />
          </button>
        </Form>
      </div>
    </div>
  );
}

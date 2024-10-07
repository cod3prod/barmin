import { Form } from "react-router-dom";
import Button from "../../components/Button";

export default function ReviewItem({ review, locationId }) {

  return (
    <div className="card mb-4 border border-gray-300 rounded-lg">
      <div className="p-4">
        <h5 className="font-bold">Rating: {review.rating}</h5>
        <p className="text-gray-700">Review: {review.body}</p>
        <Form method="DELETE" action={`/locations/${locationId}`}>
          <input type="hidden" name="intent" id="intent" value="delete_review" />
          <input type="hidden" name="reviewId" id="reviewId" value={review._id} />
          <Button
            className="bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300"
          >
            삭제
          </Button>
        </Form>
      </div>
    </div>
  );
}

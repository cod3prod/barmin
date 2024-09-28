import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ReviewItem({ review, locationId }) {
  const navigate = useNavigate();

  async function handleClick() {
    const token = localStorage.getItem('token');

    await axios
      .delete(
        `http://localhost:3000/locations/${locationId}/reviews/${review._id}`,
        {
          headers : {
            Authorization:`Bearer ${token}`
          }
        }
      )
      .then((res) => {
        console.log("리뷰 삭제", res.data);
        navigate(`/locations/${locationId}`);
      })
      .catch((err) => {
        console.error("리뷰 삭제 실패", err);
      });
  }

  return (
    <div className="card mb-4 border border-gray-300 rounded-lg">
      <div className="p-4">
        <h5 className="font-bold">Rating: {review.rating}</h5>
        <p className="text-gray-700">Review: {review.body}</p>

        <button
          onClick={handleClick}
          className="bg-red-500 text-white py-1 px-3 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

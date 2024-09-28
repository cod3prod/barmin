import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button";

export default function ReviewItem({ review, locationId }) {
  const navigate = useNavigate();

  async function handleClick() {
    const token = localStorage.getItem("token");

    await axios
      .delete(
        `http://localhost:3000/locations/${locationId}/reviews/${review._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

        <Button
          onClick={handleClick}
          className="bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300"
        >
          삭제
        </Button>
      </div>
    </div>
  );
}

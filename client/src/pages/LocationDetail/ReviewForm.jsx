import { useState } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function ReviewForm({ locationId }) {
  const [star, setStar] = useState(0);
  const [prevStar, setPrevStar] = useState(0);
  const fetcher = useFetcher();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData);
    formValues.author = decoded._id;
    formValues.rating = parseInt(formValues.rating);

    await axios
      .post(
        `http://localhost:3000/locations/${locationId}/reviews`,
        formValues,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        event.target.reset();
        event.target.rating.value = 5;
        navigate(`/locations/${locationId}`);
      })
      .catch((err) => {
        console.error("리뷰 작성 실패", err);
      });
  }


  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">리뷰 작성</h2>
      <fetcher.Form onSubmit={handleSubmit} className="mb-3 space-y-4">
        <div>
          <label htmlFor="rating">평점</label>
          <div className='flex'>
            {new Array(5).fill(null).map((_, idx) => (
              <img
                onMouseEnter={()=>{setStar(idx+1)}}
                onMouseLeave={()=>{setStar(prevStar)}}
                onClick={()=>{setStar(idx+1); setPrevStar(idx+1); }}
                className="w-10 h-10 cursor-pointer"
                src={star >= idx + 1 ? "/star-filled.svg" : "/star-hollow.svg"}
                alt={star >= idx + 1 ? "star-filled" : "star-hollow"}
              />
            ))}
          </div>
          <input
            className="hidden"
            type="range"
            min="1"
            max="5"
            name="rating"
            id="rating"
            value={star}
          />
        </div>
        <div>
          <label htmlFor="body">리뷰</label>
          <textarea
            className="w-full border border-gray-300 p-2 rounded"
            name="body"
            id="body"
            cols="30"
            rows="3"
            required
          ></textarea>
          <div className="text-purple-500 mt-2">Looks good!</div>
        </div>
        <button className="bg-green-500 text-white py-2 px-4 rounded">
          완료
        </button>
      </fetcher.Form>
    </div>
  );
}
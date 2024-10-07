import { useState } from "react";
import { Form } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Textarea from "../../components/Textarea";
import Button from "../../components/Button";

export default function ReviewForm({locationId}) {
  const [star, setStar] = useState(0);
  const [prevStar, setPrevStar] = useState(0);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">리뷰 작성</h2>
      <Form method="POST" action={`/locations/${locationId}`} className="mb-3 space-y-4">
        <div>
          <input
            type="hidden"
            name="intent"
            id="intent"
            value="create_review"
          />
          <label htmlFor="rating">평점</label>
          <div className="flex">
            {new Array(5).fill(null).map((_, idx) => (
              <FaStar
                onMouseEnter={() => {
                  setStar(idx + 1);
                }}
                onMouseLeave={() => {
                  setStar(prevStar);
                }}
                onClick={() => {
                  setStar(idx + 1);
                  setPrevStar(idx + 1);
                }}
                key={idx}
                className={`w-10 h-10 cursor-pointer
                ${star >= idx + 1 ? "fill-yellow-500" : "fill-gray-300"}`}
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
          <Textarea id="body" rows="3" required>
            리뷰
          </Textarea>
        </div>
        <Button className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300">
          완료
        </Button>
      </Form>
    </div>
  );
}

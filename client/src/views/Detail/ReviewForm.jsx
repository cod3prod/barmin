import { useReducer } from "react";
import { Form } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Textarea from "../../components/Textarea";
import Button from "../../components/Button";
import { reviewReducer, initialState } from "../../reducer/reviewReducer";

export default function ReviewForm({ locationId }) {
  const [state, dispatch] = useReducer(reviewReducer, initialState);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">리뷰 작성</h2>
      <Form
        onSubmit={() => dispatch({ type: "RESET_FORM" })}
        method="POST"
        action={`/locations/${locationId}`}
        className="mb-3 space-y-4"
      >
        <div>
          <input
            type="hidden"
            name="intent"
            id="intent"
            value="create_review"
            onChange={() => {}}
          />
          <label htmlFor="rating">평점</label>
          <div className="flex">
            {new Array(5).fill(null).map((_, idx) => (
              <FaStar
                onMouseEnter={() => {
                  dispatch({ type: "SET_RATING", payload: idx + 1 });
                }}
                onMouseLeave={() => {
                  dispatch({ type: "SET_RATING", payload: state.prevRating });
                }}
                onClick={() => {
                  dispatch({ type: "SET_RATING", payload: idx + 1 });
                  dispatch({ type: "SET_PREV_RATING", payload: idx + 1 });
                }}
                key={idx}
                className={`w-10 h-10 cursor-pointer
                ${
                  state.rating >= idx + 1 ? "fill-yellow-500" : "fill-gray-300"
                }`}
              />
            ))}
          </div>
          <input
            className="hidden"
            type="range"
            min="1"
            max="5"
            id="rating"
            name="rating"
            onChange={(e) =>
              dispatch({ type: "SET_RATING", payload: e.target.value })
            }
            value={state.rating}
          />
        </div>
        <div>
          <Textarea
            id="body"
            rows="3"
            value={state.body}
            onChange={(e) =>
              dispatch({ type: "SET_BODY", payload: e.target.value })
            }
            required
          >
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

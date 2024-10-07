import { useLoaderData, redirect } from "react-router-dom";
import LocationCard from "./LocationCard";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import api from "../../config/api";
import { jwtDecode } from "jwt-decode";

// Loader: 위치 데이터를 불러옴
export async function loader({ params }) {
  try {
    const { id } = params;
    const response = await api.get(`/locations/${id}`);
    if (response.data) {
      return response.data;
    } else {
      throw new Error("Location not found");
    }
  } catch (error) {
    console.error("Failed to load location", error);
    return null;
  }
}

// Action: 리뷰 작성, 리뷰 삭제, 위치 삭제 기능 처리
export async function action({ request, params }) {
  const token = localStorage.getItem("token");
  
  if (!token) {
    // 토큰이 없을 경우 로그인 페이지로 리디렉션
    return redirect("/login");
  }

  const decoded = jwtDecode(token);
  const formData = await request.formData();
  const intent = formData.get("intent");
  const { id: locationId } = params;

  try {
    if (intent === "create_review") {
      const review = {
        author: decoded._id,
        rating: parseInt(formData.get("rating")),
        body: formData.get("body"),
      };
      await api.post(`/locations/${locationId}/reviews`, review, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Review created successfully");
      return redirect(`/locations/${locationId}`);
    } else if (intent === "delete_review") {
      const reviewId = formData.get("reviewId");
      await api.delete(`/locations/${locationId}/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Review deleted successfully");
      return redirect(`/locations/${locationId}`);
    } else if (intent === "delete_location") {
      await api.delete(`/locations/${locationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Location deleted successfully");
      return redirect("/locations");
    }
  } catch (err) {
    console.error("Action failed", err);
    return redirect(`/locations/${locationId}?error=${encodeURIComponent(err.message)}`);
  }
}

// Detail 컴포넌트: 위치 상세 정보와 리뷰 목록을 보여줌
export default function Detail() {
  const data = useLoaderData();

  // 조건부 렌더링: 데이터가 없을 경우 오류 메시지 표시
  if (!data) {
    return <p>Location not found or has been deleted.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
      <LocationCard data={data} />
      <div>
        <ReviewForm locationId={data._id} />
        <ReviewList reviews={data.reviews} locationId={data._id} />
      </div>
    </div>
  );
}

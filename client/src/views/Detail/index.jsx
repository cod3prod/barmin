import { useLoaderData, redirect } from "react-router-dom";
import LocationCard from "./LocationCard";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import api from "../../config/api";
import { jwtDecode } from "jwt-decode";

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

export default function Detail() {
  const data = useLoaderData();

  if (!data) {
    return <p>위치 정보를 찾을 수 없습니다.</p>;
  }

  return (
    <div className="mt-4 p-4 container lg:max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
      <LocationCard data={data} />
      <div>
        <ReviewForm locationId={data._id} />
        <ReviewList reviews={data.reviews} locationId={data._id} />
      </div>
    </div>
  );
}

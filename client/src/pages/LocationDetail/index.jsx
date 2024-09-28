import { useLoaderData } from "react-router-dom";
import LocationCard from "./LocationCard";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import axios from 'axios';

export async function loader({ params }) {
  const { id } = params;
  const response = await axios.get(`http://localhost:3000/locations/${id}`);
  const result = response.data;

  return result;
}

export default function LocationDetail() {
  const data = useLoaderData();

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
      <LocationCard data={data}/>
      <div>
        <ReviewForm locationId={data._id} />
        <ReviewList reviews={data.reviews} locationId={data._id} />
      </div>
    </div>
  );
}

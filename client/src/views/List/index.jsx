import { useLoaderData } from "react-router-dom";
import KakaoMap from "../../components/KakaoMap";
import NavButton from "../../components/NavButton";
import LocationsList from "./LocationsList";
import api from "../../config/api";

export async function loader() {
  try {
    const response = await api.get("/locations");
    const result = response.data;
    console.log(result);
    return result;
  } catch (error) {
    console.error("Fail to load locations", error);
  }
}

export default function List() {
  const data = useLoaderData();

  return (
    <div className="container mx-auto">
      {/* <KakaoMap className="my-4 rounded-lg"/> */}
      <NavButton
        className="mb-4 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300"
        to="/locations/new"
      >
        새로운 장소 추가
      </NavButton>
      <LocationsList data={data}/>
    </div>
  );
}

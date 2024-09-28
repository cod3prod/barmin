import { useLoaderData } from "react-router-dom";
import KakaoMap from "../components/KakaoMap";
import axios from "axios";
import NavButton from "../components/NavButton";

export async function loader() {
  const response = await axios.get("http://localhost:3000/locations");
  const result = response.data;

  return result;
}

export default function LocationsList() {
  const data = useLoaderData();

  return (
    <div className="container mx-auto">
      <KakaoMap className="my-4 rounded-lg"/>
      <NavButton
        className="mb-4 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300"
        to="/locations/new"
      >
        새로운 장소 추가
      </NavButton>
      
      {data.map((el) => {
        return (
          <div
            key={el._id}
            className="card mb-4 border border-gray-300 rounded-lg"
          >
            <div className="flex">
              <div className="w-1/3">
                <img className="w-full h-auto" alt="" src={el.image} />
              </div>
              <div className="w-2/3 p-4">
                <h5 className="text-lg font-bold">{el.title}</h5>
                <p>{el.description}</p>
                <p className="text-gray-500 mb-3">{el.location}</p>
                <NavButton to={`/locations/${el._id}`}>상세 정보</NavButton>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

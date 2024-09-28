import { useLoaderData } from "react-router-dom";
import KakaoMap from "../components/KakaoMap";
import axios from "axios";

export async function loader() {
  const response = await axios.get("http://localhost:3000/locations");
  const result = response.data;

  return result;
}

export default function LocationsList() {
  const data = useLoaderData();

  return (
    <div className="container mx-auto">
      <KakaoMap />
      <a
        className="bg-green-500 text-white py-2 px-4 rounded mb-4 inline-block"
        href="/locations/new"
      >
        새로운 장소 추가
      </a>
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
                <a
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                  href={`/locations/${el._id}`}
                >
                  상세 정보
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavButton from "../../components/NavButton";
import Button from "../../components/Button";

export default function LocationCard({ data }) {
  const navigate = useNavigate();

  async function handleClick() {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:3000/locations/${data._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate("/locations");
      })
      .catch((err) => {
        console.error("장소 삭제 실패", err);
      });
  }

  return (
    <div className="card mb-4 border border-gray-300 rounded-lg">
      <img src={data.image} className="w-full h-auto" alt={data.title} />
      <div className="p-4">
        <h5 className="text-lg font-bold">{data.title}</h5>
        <p>{data.description}</p>
      </div>
      <ul className="list-none p-0">
        <li className="border-t border-gray-200 p-4 text-gray-500">
          {data.location}
        </li>
      </ul>
      <div className="flex justify-between p-4">
        <NavButton to={`/locations/${data._id}/edit`}>수정</NavButton>
        <Button
          onClick={handleClick}
          className="bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300"
        >
          삭제
        </Button>
      </div>
      <div className="text-right p-4 text-gray-500">2 days ago</div>
    </div>
  );
}

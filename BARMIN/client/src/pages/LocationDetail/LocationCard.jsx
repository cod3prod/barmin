import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LocationCard({ data }) {
  const navigate = useNavigate();

  async function handleClick(){
    axios.delete(`http://localhost:3000/locations/${data._id}`)
      .then(res => {
        console.log(res.data);
        navigate('/locations');
      })
      .catch(err => {
        console.error('장소 삭제 실패', err);
      })
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
      <div className="p-4">
        <a
          className="inline-block h-10 bg-blue-500 text-white py-2 px-4 rounded mr-2"
          href={`/locations/${data._id}/edit`}
        >
          수정
        </a>
        <button
          onClick={handleClick}
          className="h-10 bg-red-500 text-white py-2 px-4 rounded"
        >
          삭제
        </button>
      </div>
      <div className="text-right p-4 text-gray-500">2 days ago</div>
    </div>
  );
}

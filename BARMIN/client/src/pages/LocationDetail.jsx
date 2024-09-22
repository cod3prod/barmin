import { useFetcher, useLoaderData, redirect } from "react-router-dom";
import axios from "axios";

export async function loader({ params }) {
  const { id } = params;
  const response = await axios.get(`http://localhost:3000/locations/${id}`);
  const result = response.data;

  return result;
}

export async function action({ params }) {
  const { id } = params;
  const response = await axios.delete(`http://localhost:3000/locations/${id}`);
  const result = response.data;
  if (result.success) {
    return redirect("/locations");
  }
}

export default function LocationDetail() {
  const data = useLoaderData();
  const fetcher = useFetcher();

  return (
    <div className="max-w-md mx-auto">
      <div className="card mb-4 border border-gray-300 rounded-lg">
        <img src={data.image} className="w-full h-auto" alt="..." />
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
          <fetcher.Form
            method='delete'
            className="inline"
            action={`/locations/${data._id}`}
          >
            <button className="h-10 bg-red-500 text-white py-2 px-4 rounded">
              삭제
            </button>
          </fetcher.Form>
        </div>
        <div className="text-right p-4 text-gray-500">2 days ago</div>
      </div>
    </div>
  );
}


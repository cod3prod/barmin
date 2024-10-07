import { Form } from "react-router-dom";
import NavButton from "../../components/NavButton";
import Button from "../../components/Button";

export default function LocationCard({ data }) {
  console.log('data', data);
  console.log(data._id);
  return (
    <div className="card mb-4 border border-gray-300 rounded-lg">
      <img src={data.images[0].url} className="w-full h-auto" alt={data.title} onLoad={()=>console.log("loaded")}/>
      <div className="p-4">
        <h5 className="text-lg font-bold">{data.title}</h5>
        <p>{data.description}</p>
      </div>
      <ul className="list-none p-0">
        <li className="border-t border-gray-200 p-4 text-gray-500">
          {data.address}
        </li>
      </ul>
      <div className="flex justify-between p-4">
        <NavButton to={`/locations/${data._id}/edit`}>수정</NavButton>
        <Form method="DELETE" action={`/locations/${data._id}`}>
          <input
            type="hidden"
            name="intent"
            id="intent"
            value="delete_location"
          />
          <Button
            className="bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300"
          >
            삭제
          </Button>
        </Form>
      </div>
      <div className="text-right p-4 text-gray-500">2 days ago</div>
    </div>
  );
}

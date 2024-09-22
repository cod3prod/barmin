import { useState } from "react";
import { useFetcher, redirect, useLoaderData } from "react-router-dom";
import axios from "axios";

export async function loader({ params }) {
  const { id } = params;
  const response = await axios.get(
    `http://localhost:3000/locations/${id}/edit`
  );
  const result = response.data;

  return result;
}

export async function action({ request, params }) {
  const { id } = params;
  const formData = await request.formData();
  const updateData = Object.fromEntries(formData);
  console.log(id, updateData);
  const response = await axios.put(
    `http://localhost:3000/locations/${id}`,
    updateData
  );
  const result = response.data;
  if (result.success) {
    return redirect(`/locations/${id}`);
  }
}

function InputField({ label, id, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700" htmlFor={id}>
        {label}
      </label>
      <input
        className="border border-gray-300 p-2 w-full"
        onChange={onChange}
        type="text"
        id={id}
        name={id}
        value={value}
      />
    </div>
  );
}

export default function EditLocation() {
  const data = useLoaderData();
  const fetcher = useFetcher();
  const [title, setTitle] = useState(data.title);
  const [location, setLocation] = useState(data.location);

  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-3xl text-center">장소 정보 편집</h1>
      </div>
      <div className="max-w-md mx-auto">
        <fetcher.Form method="put">
          <InputField
            label="Title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <InputField
            label="Location"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <div className="mb-4">
            <button className="bg-blue-500 text-white p-2 rounded">
              수정
            </button>
          </div>
        </fetcher.Form>
        <a href={`/locations/${data._id}`} className="text-blue-500">돌아가기</a>
      </div>
    </>
  );
}

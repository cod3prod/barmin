import { useState } from 'react' 
import { useFetcher, redirect, useLoaderData } from "react-router-dom";
import axios from 'axios';

export async function loader({ params }) {
  const { id } = params;
  const response = await axios.get(`http://localhost:3000/locations/${id}/edit`);
  const result = response.data;

  return result;
}

export async function action({ request, params }) {
  const { id } = params;
  const formData = await request.formData();
  const updateData = Object.fromEntries(formData);
  console.log(id, updateData);
  const response = await axios.put(`http://localhost:3000/locations/${id}`, updateData);
  const result = response.data;
  if(result.success){
    return redirect(`/locations/${id}`);
  }
}

function InputField({ label, id, value, onChange}) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input onChange={onChange} type="text" id={id} name={id} value={value} />
    </div>
  )
}

export default function EditLocation() {
  const data = useLoaderData();
  const fetcher = useFetcher();
  const [title, setTitle] = useState(data.title);
  const [location, setLocation] = useState(data.location);

  return (
    <>
      <h1>장소 정보 편집</h1>
      <fetcher.Form method='put'>
        <InputField 
          label="Title"
          id="title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
        <InputField 
          label="Location"
          id="location"
          value={location}
          onChange={(e)=>setLocation(e.target.value)}
        />
        <button>수정</button>
      </fetcher.Form>
    </>
  );
}

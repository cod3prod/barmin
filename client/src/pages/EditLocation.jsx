import { useState } from "react";
import { useFetcher, redirect, useLoaderData } from "react-router-dom";
import axios from "axios";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import Button from "../components/Button";
import NavButton from "../components/NavButton";

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

export default function EditLocation() {
  const data = useLoaderData();
  const fetcher = useFetcher();
  const [title, setTitle] = useState(data.title);
  const [location, setLocation] = useState(data.location);
  const [image, setImage] = useState(data.image);
  const [description, setDescription] = useState(data.description);

  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-3xl text-center">장소 정보 편집</h1>
      </div>
      <div className=" max-w-md mx-auto">
        <fetcher.Form method="put">
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          >
            제목
          </Input>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            장소
          </Input>
          <Input
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          >
            이미지
          </Input>
          <Textarea
            rows="10"
            id="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          >
            설명
          </Textarea>
          <div className="mt-4 flex justify-between mb-4">
            <Button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300">
              수정
            </Button>
            <NavButton to={`/locations/${data._id}`}>돌아가기</NavButton>
          </div>
        </fetcher.Form>
      </div>
    </>
  );
}

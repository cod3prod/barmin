import { useFetcher, redirect } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import KakaoMap from "../components/KakaoMap";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import Button from "../components/Button";
import NavButton from "../components/NavButton";
import { useState } from "react";

export async function action({ request }) {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const formData = await request.formData();
  const formValues = Object.fromEntries(formData);
  formValues.author = decoded._id;
  const response = await axios.post(
    "http://localhost:3000/locations",
    formValues,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = response.data;

  if (result.success) {
    return redirect(`/locations/${result.redirect}`);
  }
}

export default function NewLocation() {
  const fetcher = useFetcher();
  const [title, setTitle] = useState("")
  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-3xl text-center">New Location</h1>
      </div>
      <div className="max-w-md mx-auto">
        <KakaoMap title={title} />
        <fetcher.Form method="post">
          <div className="flex flex-col gap-3">
            <Input id="title" onChange={(e)=>setTitle(e.target.value)}>제목</Input>
            <Input id="location">장소</Input>
            <Input id="image">이미지</Input>
            <Textarea id="description" rows="5">
              설명
            </Textarea>
          </div>
          <div className="flex justify-between my-4">
            <Button className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300">생성</Button>
            <NavButton to="/locations">돌아가기</NavButton>
          </div>
        </fetcher.Form>
        

      </div>
    </>
  );
}

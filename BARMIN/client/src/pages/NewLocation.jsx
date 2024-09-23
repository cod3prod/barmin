import { useFetcher, redirect } from "react-router-dom";
import axios from "axios";
import InputField from "../components/InputField";

export async function action({ request }) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);
  console.log(formData);
  const response = await axios.post(
    "http://localhost:3000/locations",
    postData,
    {
      headers: {
        "Content-Type": "application/json",
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
  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-3xl text-center">New Location</h1>
      </div>
      <div className="max-w-md mx-auto">
        <fetcher.Form method="post">
          <InputField label="제목" id="title" />
          <InputField label="장소" id="location" />
          <InputField label="이미지" id="image" />
          <InputField label="설명" type="textarea" id="description" />
          <div className="mb-4">
            <button className="bg-green-500 text-white p-2 rounded">
              생성
            </button>
          </div>
        </fetcher.Form>
        <a href="/locations" className="text-blue-500">
          돌아가기
        </a>
      </div>
    </>
  );
}

// import { useFetcher, redirect } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import KakaoMap from "../components/KakaoMap";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import Button from "../components/Button";
import NavButton from "../components/NavButton";
import { useState } from "react";



export default function NewLocation() {
  // const fetcher = useFetcher();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const decoded = jwtDecode(localStorage.getItem('token'));
    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("author", decoded._id);
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }
    console.log(formData);
    const token = localStorage.getItem("token");
  
    try {
      const response = await axios.post(
        "http://localhost:3000/locations",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const result = response.data;
  
      if (result.success) {
        redirect(`/locations/${result.redirect}`);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };
  

  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-3xl text-center">New Location</h1>
      </div>
      <div className="max-w-md mx-auto">
        <KakaoMap title={title} />
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="flex flex-col gap-3">
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)}>제목</Input>
            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)}>장소</Input>
            <Textarea id="description" value={description} rows="5" onChange={(e) => setDescription(e.target.value)}>설명</Textarea>
            <input id="imageFile" type="file" onChange={handleFileChange} />
          </div>
          <div className="flex justify-between my-4">
            <Button className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300">생성</Button>
            <NavButton to="/locations">돌아가기</NavButton>
          </div>
        </form>
      </div>
    </>
  );
}

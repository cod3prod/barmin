import { redirect, useLoaderData } from "react-router-dom";
import api from "../../config/api";
import EditForm from "./EditForm";
import { useState } from "react";
import { imagesStore } from "../../zustand/ImagesStore";
import KakaoMap from "../../components/KakaoMap";
import { jwtDecode } from "jwt-decode";

export async function loader({ params }) {
  const { id } = params;
  try {
    const response = await api.get(`/locations/${id}/edit`);
    const result = response.data;
    console.log("Load locations Succefully", result);
    return result;
  } catch (error) {
    console.error("Fail to load location", error);
    return null;
  }
}

export async function action({ request, params }) {
  const { id } = params;
  console.log("테스트", id);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { images } = imagesStore.getState();

  const receivedformData = await request.formData();
  const sendFormData = new FormData();
  console.log(receivedformData.get("title"));
  sendFormData.append("title", receivedformData.get("title"));
  sendFormData.append("address", receivedformData.get("address"));
  sendFormData.append("coordinate", receivedformData.get("coordinate"));
  sendFormData.append("description", receivedformData.get("description"));
  console.log('test', receivedformData.get("description"));  
  sendFormData.append("author", decoded._id);
  images.map((image) => sendFormData.append("images", image));

  try {
    const response = await api.patch(`/locations/${id}`, sendFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.data;
    imagesStore.setState({ images: [] });
    console.log("Update locations Succefully", result);
    return redirect(`/locations/${id}`);
  } catch (error) {
    console.error("Fail to update location", error);
    return null;
  }
}

export default function Edit() {
  const data = useLoaderData();
  const [title, setTitle] = useState(data.title);
  const [address, setAddress] = useState(data.address);
  const [coordinate, setCoordinate] = useState(data.coordinate);
  const [description, setDescription] = useState(data.description);

  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-3xl text-center">장소 정보 편집</h1>
      </div>
      <div className=" max-w-md mx-auto">
        <KakaoMap
          title={title}
          coordinate={coordinate}
          setCoordinate={setCoordinate}
          setAddress={setAddress}
        />
        <EditForm
          title={title}
          address={address}
          description={description}
          coordinate={coordinate}
          setTitle={setTitle}
          setAddress={setAddress}
          setDescription={setDescription}
        />
      </div>
    </>
  );
}

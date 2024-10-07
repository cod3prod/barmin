import { redirect, useLoaderData } from "react-router-dom";
import api from "../../config/api";
import EditForm from "./EditForm";
import { useState } from "react";
import { imagesStore } from "../../zustand/ImagesStore";
import KakaoMap from "../../components/KakaoMap";


export async function loader({ params }) {
  const { id } = params;
  try {

    const response = await api.get(
      `/locations/${id}/edit`
    );
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
  try {

    const formData = await request.formData();
    const updateData = Object.fromEntries(formData);
    console.log(id, updateData);
   await api.put(
      updateData
    );
    console.log("Update locations Succefully");
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
  const { images, setImages } = imagesStore();


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
        <EditForm data={data}/>
      </div>
    </>
  );
}

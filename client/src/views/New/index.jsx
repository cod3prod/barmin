import { Form, redirect, useNavigation } from "react-router-dom";
import KakaoMap from "../../components/KakaoMap";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Button from "../../components/Button";
import NavButton from "../../components/NavButton";
import { useState } from "react";
import api from "../../config/api";
import { imagesStore } from "../../zustand/ImagesStore";
import { jwtDecode } from "jwt-decode";

export async function action({ request }) {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { images } = imagesStore.getState();

  const receivedformData = await request.formData();
  const sendFormData = new FormData();

  sendFormData.append("title", receivedformData.get("title"));
  sendFormData.append("address", receivedformData.get("address"));
  sendFormData.append("coordinate", receivedformData.get("coordinate"));
  sendFormData.append("description", receivedformData.get("description"));
  sendFormData.append("author", decoded._id);
  images.map((image) => sendFormData.append("images", image));

  try {
    const response = await api.post("/locations", sendFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.data;
    imagesStore.setState({ images: [] });
    console.log(result);
    return redirect(`/locations/${result.redirect}`);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default function New() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [coordinate, setCoordinate] = useState({});
  const [description, setDescription] = useState("");
  const { images, setImages } = imagesStore();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  if (isSubmitting) {
    return (
      <>
        <p>Wait</p>
        <p>Wait</p>
        <p>Wait</p>
        <p>Wait</p>
        <p>Wait</p>
        <p>Wait</p>
      </>
    );
  }

  const handleImages = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files);
    setImages([...images, ...filesArray]);
  };

  const deleteImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-3xl text-center">New Location</h1>
      </div>
      <div className="max-w-md mx-auto">
        <KakaoMap
          title={title}
          coordinate={coordinate}
          setCoordinate={setCoordinate}
          setAddress={setAddress}
        />
        <Form
          method="POST"
          action="/locations/new"
          encType="multipart/form-data"
        >
          <div className="flex flex-col gap-3">
            <Input id="title" onChange={(e) => setTitle(e.target.value)}>
              제목
            </Input>
            <Input id="address" value={address} readOnly>
              주소
            </Input>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
            >
              설명
            </Textarea>
            <input
              type="text"
              name="coordinate"
              value={JSON.stringify(coordinate)}
              readOnly
              hidden
            />
            <input
              id="images"
              name="images"
              type="file"
              accept="image/*"
              onChange={handleImages}
              multiple
            />
            <div className="grid grid-cols-2 gap-2">
              {images.map((image, index) => (
                <div key={index} className="flex flex-col">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index}`}
                    className="w-full h-32 object-cover rounded"
                  />
                  <button type="button" onClick={() => deleteImage(index)}>
                    삭제
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between my-4">
            <Button className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300">
              생성
            </Button>
            <NavButton to="/locations">돌아가기</NavButton>
          </div>
        </Form>
      </div>
    </>
  );
}

import { useState } from "react";
import { redirect, useNavigation, Navigate } from "react-router-dom";
import KakaoMap from "../../components/KakaoMap";
import Button from "../../components/Button";
import NavButton from "../../components/NavButton";
import { useReducer } from "react";
import api from "../../config/api";
import { jwtDecode } from "jwt-decode";
import Submitting from "../../components/Submitting";
import { formReducer, initialState } from "../../reducer/formReducer";
import LocationForm from "../../components/LocationForm";
import ImagesPreview from "../../components/ImagesPreview";
import { imagesStore } from "../../zustand/ImagesStore";
import { authStore } from "../../zustand/AuthStore";

export async function action({ request }) {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);

  const receivedFormData = await request.formData();

  const { images } = imagesStore.getState();
  const sendFormData = {
    title: receivedFormData.get("title"),
    address: receivedFormData.get("address"),
    coordinate: receivedFormData.get("coordinate"),
    description: receivedFormData.get("description"),
    author: decoded._id,
    images: images,
  };

  try {
    const response = await api.post("/locations", sendFormData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.data;
    imagesStore.setState({ images: [] });
    return redirect(`/locations/${result.redirect}`);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default function New() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [ isHandlingImg, setIsHandlingImg ] = useState(false);
  const { images, setImages } = imagesStore();
  const { isAuthenticated } = authStore();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  if(!isAuthenticated) return <Navigate to="/login" replace />;

  const handleImages = async (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files);

    const formData = new FormData();
    filesArray.forEach((file) => formData.append("images", file));
    setIsHandlingImg(true);
    try {
      setIsHandlingImg(true);
      const response = await api.post("/locations/images", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const result = response.data;
      setImages([...images, ...result]);
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setIsHandlingImg(false);
    }
  };

  const handleDeleteImage = async (index) => {
    setIsHandlingImg(true);
    try {
      const imageToDelete = images[index];
      await api.delete("/locations/images", {
        data: { imagesToDelete: [imageToDelete] },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setImages(images.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting image:", error);
    } finally {
      setIsHandlingImg(false);
    }
  };

  return (
    <>
      { (isHandlingImg||isSubmitting) && <Submitting />}
      <section className="mt-4 flex flex-col container lg:max-w-7xl mx-auto">
        <div className="px-4 pt-4 flex justify-center">
          <h1 className="text-2xl font-bold">새로운 장소 등록</h1>
        </div>

        <div className="flex flex-col gap-4 p-4 lg:flex-row">
          <div className="w-full h-[20rem] lg:h-[35rem] lg:w-3/5">
            <KakaoMap
              state={state}
              dispatch={dispatch}
              centerChangeLimit={1}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>

          <LocationForm
            className="w-full lg:w-2/5"
            state={state}
            dispatch={dispatch}
            handleImages={handleImages}
            method="POST"
            action="/locations/new"
          >
            <div className="flex justify-between my-4">
              <Button className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300">
                생성
              </Button>
              <NavButton to="/locations" className="w-26">
                돌아가기
              </NavButton>
            </div>
          </LocationForm>
        </div>

        <ImagesPreview
          className="p-4 flex flex-wrap gap-4"
          images={images}
          handleDeleteImage={handleDeleteImage}
        />
      </section>
    </>
  );
}

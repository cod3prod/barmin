import { useState, useEffect, useReducer } from "react";
import {
  redirect,
  useLoaderData,
  useNavigation,
  Navigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../../config/api";
import { imagesStore } from "../../zustand/ImagesStore";
import { authStore } from "../../zustand/AuthStore";
import KakaoMap from "../../components/KakaoMap";
import Submitting from "../../components/Submitting";
import { formReducer, initialState } from "../../reducer/formReducer";
import LocationForm from "../../components/LocationForm";
import Button from "../../components/Button";
import NavButton from "../../components/NavButton";
import ImagesPreview from "../../components/ImagesPreview";

export async function loader({ params }) {
  const { id } = params;
  try {
    const response = await api.get(`/locations/${id}/edit`);
    const result = response.data;
    console.log("Load locations Successfully", result);
    return result;
  } catch (error) {
    console.error("Failed to load location", error);
    return null;
  }
}

export async function action({ request, params }) {
  const { id } = params;
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { images } = imagesStore.getState();

  const receivedFormData = await request.formData();
  const sendFormData = {
    title: receivedFormData.get("title"),
    address: receivedFormData.get("address"),
    coordinate: receivedFormData.get("coordinate"),
    description: receivedFormData.get("description"),
    author: decoded._id,
    images: images,
  };

  try {
    const response = await api.patch(`/locations/${id}`, sendFormData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.data;
    imagesStore.setState({ images: [] });
    console.log("Updated location successfully", result);
    return redirect(`/locations/${id}`);
  } catch (error) {
    console.error("Failed to update location", error);
    return null;
  }
}

export default function Edit() {
  const data = useLoaderData();
  const { images, setImages } = imagesStore();
  const { isAuthenticated } = authStore();
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [isHandlingImg, setIsHandlingImg] = useState(false);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    const newInitialState = {
      title: data.title,
      address: data.address,
      coordinate: data.coordinate,
      description: data.description,
    };
    setImages(data.images);
    dispatch({ type: "SET_NEW_INITIAL", payload: newInitialState });
  }, [data]);

  const handleImages = async (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files);

    const formData = new FormData();
    filesArray.forEach((file) => formData.append("images", file));
    
    setIsHandlingImg(true);
    try {
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
      {(isHandlingImg || isSubmitting) && <Submitting />}
      <section className="mt-6 container mx-auto lg:max-w-7xl ">
        <div className="flex justify-center mb-6">
          <h1 className="text-2xl font-bold text-center">장소 정보 편집</h1>
        </div>
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          <div className="w-full h-[20rem] lg:h-[35rem] lg:w-3/5">
            <KakaoMap
              state={state}
              dispatch={dispatch}
              centerChangeLimit={3}
              style={{
                // 지도의 크기
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
            method="PATCH"
            action={`/locations/${data._id}/edit`}
          >
            <div className="mt-4 flex justify-between mb-4">
              <Button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300">
                수정
              </Button>
              <NavButton className="w-26" to={`/locations/${data._id}`}>
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

import { redirect, useNavigate, useNavigation } from "react-router-dom";
import KakaoMap from "../../components/KakaoMap";
import Button from "../../components/Button";
import NavButton from "../../components/NavButton";
import { useLayoutEffect, useReducer } from "react";
import api from "../../config/api";
import { imagesStore } from "../../zustand/ImagesStore";
import { authStore } from "../../zustand/AuthStore";
import { jwtDecode } from "jwt-decode";
import Submitting from "../../components/Submitting";
import { formReducer, initialState } from "../../reducer/formReducer";
import LocationForm from "../../components/LocationForm";
import ImagesPreview from "../../components/ImagesPreview";

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
  const { images, setImages } = imagesStore();
  const { username } = authStore();
  const [state, dispatch] = useReducer(formReducer, initialState);
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";

  useLayoutEffect(() => {
    setImages([]);
    if (!username) {
      navigate("/login");
    }
  }, [username]);

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
      {isSubmitting && <Submitting />}
      <section className="mt-4 flex flex-col container lg:max-w-7xl mx-auto ">
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
          deleteImage={deleteImage}
        />
      </section>
    </>
  );
}

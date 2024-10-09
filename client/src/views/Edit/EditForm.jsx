import { Form, useParams, useNavigation } from "react-router-dom";
import { imagesStore } from "../../zustand/ImagesStore";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Button from "../../components/Button";
import NavButton from "../../components/NavButton";

export default function EditForm(props) {
  const {
    setTitle,
    title,
    address,
    setAddress,
    description,
    setDescription,
    coordinate,
  } = props;
  const { id } = useParams();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const {images, setImages} = imagesStore();

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
    <Form method="put" action={`/locations/${id}/edit`}>
      <Input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      >
        제목
      </Input>
      <Input
        id="address"
        value={address}
        readOnly
        onChange={(e) => setAddress(e.target.value)}
      >
        장소
      </Input>
      <Textarea
        rows="10"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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

      <div className="mt-4 flex justify-between mb-4">
        <Button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300">
          수정
        </Button>
        <NavButton to={`/locations/${id}`}>돌아가기</NavButton>
      </div>
    </Form>
  );
}

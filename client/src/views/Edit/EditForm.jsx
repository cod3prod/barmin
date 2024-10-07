import { useState } from "react";
import { Form } from "react-router-dom";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Button from "../../components/Button";
import NavButton from "../../components/NavButton";

export default function EditForm({ data }) {
  const [title, setTitle] = useState(data.title);
  const [address, setLocation] = useState(data.address);
  const [description, setDescription] = useState(data.description);

  return (
    <Form method="put">
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
        onChange={(e) => setLocation(e.target.value)}
      >
        장소
      </Input>
      <Textarea
        rows="10"
        id="textarea"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      >
        설명
      </Textarea>
      <div className="mt-4 flex justify-between mb-4">
        <Button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300">
          수정
        </Button>
        <NavButton to={`/locations/${data._id}`}>돌아가기</NavButton>
      </div>
    </Form>
  );
}

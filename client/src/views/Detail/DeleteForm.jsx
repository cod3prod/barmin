import { Form } from "react-router-dom";
import NavButton from "../../components/NavButton";
import Button from "../../components/Button";

export default function DeleteForm({data}) {
  return (
    <div className="flex justify-between p-4">
      <NavButton to={`/locations/${data._id}/edit`}>수정</NavButton>
      <Form method="DELETE" action={`/locations/${data._id}`}>
        <input
          type="hidden"
          name="intent"
          id="intent"
          value="delete_location"
        />
        <Button className="bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300">
          삭제
        </Button>
      </Form>
    </div>
  );
}

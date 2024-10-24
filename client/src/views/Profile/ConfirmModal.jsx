import { Form } from "react-router-dom";
import Button from "../../components/Button";

export default function ConfirmModal({setIsOpen}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <Form
        action="/profile"
        method="DELETE"
        className="w-full max-w-sm h-32 bg-white p-4 rounded-lg flex flex-col justify-between "
      >
        <p className="text-xl font-bold mt-4">정말 탈퇴하시겠습니까?</p>
        <div className="flex justify-between">
          <Button
            type="submit"
            className="w-20 bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300"
          >
            네
          </Button>
          <Button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-20 bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300"
          >
            아니요
          </Button>
        </div>
      </Form>
    </div>
  );
}

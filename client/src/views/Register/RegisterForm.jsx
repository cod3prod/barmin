import { Form } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function RegisterForm({ setOnFocus }) {
  return (
    <Form
      method="POST"
      action="/register"
      className="flex flex-col justify-between gap-4"
      noValidate
    >
      <p className="text-2xl font-bold mt-6 mb-6">Register</p>
      <div className="flex flex-col gap-4">
        <Input
          type="text"
          id="username"
          required
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
        >
          Username
        </Input>
        <Input
          type="email"
          id="email"
          required
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
        >
          Email
        </Input>
        <Input
          type="password"
          id="password"
          required
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
        >
          Password
        </Input>
      </div>
      <div className="mt-9 flex flex-col gap-4 items-center">
        <Button className="text-sm lg:text-lg h-18 w-full bg-green-500 text-white rounded-md hover:bg-green-600">
          등록
        </Button>
      </div>
    </Form>
  );
}

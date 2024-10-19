import { useState } from "react";
import { Form } from "react-router-dom";
import Input from "../../components/Input";
import NavButton from "../../components/NavButton";
import Button from "../../components/Button";

export default function LoginForm({setOnFocus}) {
  const [buttonContent, setButtonContent] = useState(false);
  return (
    <Form
      method="POST"
      action="/login"
      className="flex flex-col justify-between gap-4"
      noValidate
    >
      <p className="text-2xl font-bold mt-6 mb-6">Login</p>
      <div className="flex flex-col gap-4">
        <Input type="text" id="username" required onFocus={() => setOnFocus(true)} onBlur={() => setOnFocus(false)}>
          Username
        </Input>
        <Input type="password" id="password" required onFocus={() => setOnFocus(true)} onBlur={() => setOnFocus(false)}>
          Password
        </Input>
      </div>
      <div className="mt-9 flex flex-col gap-4 items-center">
        <Button className="text-sm lg:text-lg h-18 w-full bg-green-500 text-white rounded-md hover:bg-green-600">
          로그인
        </Button>
        <NavButton
          to="/register"
          className="text-sm lg:text-lg h-18 w-full text-white rounded-md "
          onMouseOver={() => setButtonContent(true)}
          onMouseOut={() => setButtonContent(false)}
        >
          {buttonContent ? "함께하기" : "아이디가 없으신가요...?"}
        </NavButton>
      </div>
    </Form>
  );
}

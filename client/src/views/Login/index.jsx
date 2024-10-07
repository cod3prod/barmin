import { Form, redirect } from "react-router-dom";
import { authStore } from "../../zustand/AuthStore";
import Input from "../../components/Input";
import Button from "../../components/Button";
import api from "../../config/api";

export async function action({ request }) {
  const formData = await request.formData();
  const formValues = Object.fromEntries(formData);
  try {
    const response = await api.post("/login", formValues, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = response.data;

    localStorage.setItem("token", result.token);
    authStore.setState({ username: formValues.username });
    // 로그인 성공 플래시 메시지 만들기
    console.log("Login successful", result);
    return redirect("/locations");

  } catch (error) {
    // 로그인 실패 플래시 메시지 만들기
    console.error("Fail to login", error);
    return redirect("/login");
  }
}

export default function Login() {
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <Form method="POST" action="/login" className="space-y-4" noValidate>
        <Input type="text" id="username" required>
          Username
        </Input>
        <Input type="password" id="password" required>
          Password
        </Input>
        <Button className="text-lg w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
          Login
        </Button>
      </Form>
    </div>
  );
}

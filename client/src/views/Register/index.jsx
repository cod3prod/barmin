import { redirect, Form } from "react-router-dom";
import { authStore } from "../../zustand/AuthStore";
import Input from "../../components/Input";
import Button from "../../components/Button";
import api from "../../config/api";

export async function action({ request }) {
  const formData = await request.formData();
  const formValues = Object.fromEntries(formData);

  try {
    const response = await api.post(
      "users/register",
      formValues,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = response.data;
    // result = { token: "xxxxxx" }
    // 여기에 flash 메시지 만들자
    console.log(result);
    localStorage.setItem("token", result.token);
    authStore.setState({ username: formValues.username });
    return redirect(`/locations`);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default function Register() {
  return (
    <div className="mt-4 max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <Form method="POST" className="space-y-4" noValidate>
        <Input type="text" id="username" required>
          Username
        </Input>
        <Input type="email" id="email" required>
          Email
        </Input>
        <Input type="password" id="password" required>
          Password
        </Input>
        <Button className="text-lg w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
          Register
        </Button>
      </Form>
    </div>
  );
}

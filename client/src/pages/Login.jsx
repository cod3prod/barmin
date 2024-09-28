import { useFetcher, redirect } from "react-router-dom";
import { authStore } from "../zustand/AuthStore";
import axios from "axios";
import Input from "../components/Input";
import Button from "../components/Button";

export async function action({ request }) {
  const formData = await request.formData();
  const formValues = Object.fromEntries(formData);

  const response = await axios.post(
    "http://localhost:3000/login/",
    formValues,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = response.data;

  if (result.success) {
    localStorage.setItem("token", result.token);
    authStore.setState({ username: formValues.username });
    return redirect("/locations");
  }
  return redirect("/login");
}

export default function Login() {
  const fetcher = useFetcher();

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <fetcher.Form method="POST" className="space-y-4" noValidate>
        <Input type="text" id="username" required>
          Username
        </Input>
        <Input type="password" id="password" required>
          Password
        </Input>
        <Button className="text-lg w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
          Login
        </Button>
      </fetcher.Form>
    </div>
  );
}

import { useFetcher, redirect } from "react-router-dom";
import { authStore } from "../zustand/AuthStore";
import axios from "axios";
import Input from "../components/Input";
import Button from "../components/Button";

export async function action({ request }) {
  const formData = await request.formData();
  const formValues = Object.fromEntries(formData);

  const response = await axios.post(
    "http://localhost:3000/register",
    formValues,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = response.data;
  console.log(result);
  if (result.success) {
    localStorage.setItem("token", result.token);
    authStore.setState({ username: formValues.username });
    return redirect(`/locations`);
  }
  return redirect("/register");
}

export default function Register() {
  const fetcher = useFetcher();

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <fetcher.Form method="POST" className="space-y-4" noValidate>
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
      </fetcher.Form>
    </div>
  );
}

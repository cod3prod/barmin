import { useFetcher, redirect } from "react-router-dom";
import axios from "axios";

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
    return redirect(`/locations`);
  }
  return redirect('/register');
}

export default function Register() {
  const fetcher = useFetcher();

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <fetcher.Form method="POST" className="space-y-4" noValidate>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
            type="text"
            id="username"
            name="username"
            required
          />
          <div className="text-green-600 mt-1 hidden" id="username-feedback">
            Looks good!
          </div>
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
            type="email"
            id="email"
            name="email"
            required
          />
          <div className="text-green-600 mt-1 hidden" id="email-feedback">
            Looks good!
          </div>
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
            type="password"
            id="password"
            name="password"
            required
          />
          <div className="text-green-600 mt-1 hidden" id="password-feedback">
            Looks good!
          </div>
        </div>
        <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
          Register
        </button>
      </fetcher.Form>
    </div>
  );
}

import { useFetcher, redirect } from "react-router-dom";
import axios from "axios";

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
    // localStorage.setItem('token', result.token);
    console.log(result);
    return redirect(`/locations`);
  }
  return redirect('/login');
}

export default function Login() {
  const fetcher = useFetcher();

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
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
          Login
        </button>
      </fetcher.Form>
    </div>
  );
}

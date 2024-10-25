import { useState } from "react";
import { useNavigation } from "react-router-dom";
import { redirect } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";
import { authStore } from "../../zustand/AuthStore";
import { flashStore } from "../../zustand/FlashStore";
import api from "../../config/api";
import LoginForm from "./LoginForm";
import LoginBackground from "./LoginBackground";
import LoginTypo from "./LoginTypo";
import Submitting from "../../components/Submitting";

export async function action({ request }) {
  const formData = await request.formData();
  const formValues = Object.fromEntries(formData);
  try {
    const response = await api.post("users/login", formValues, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = response.data;
    localStorage.setItem("token", result.token);
    const decoded = jwtDecode(result.token);
    authStore.setState({
      isAuthenticated: true,
      username: decoded.username,
    });
    console.log("Login successful", result);
    return redirect("/locations");
  } catch (error) {
    flashStore.setState({
      type: "error",
      message: "로그인을 실패하셨습니다.",
      isOpen: true,
    });
    console.error("Fail to login", error);
    return redirect("/login");
  }
}

export default function Login() {
  const [onFocus, setOnFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      {isSubmitting && <Submitting />}
      <section>
        <div className="flex p-4 absolute w-full max-w-7xl h-2/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-auto">
          <LoginBackground isLoading={isLoading} setIsLoading={setIsLoading} />
          <LoginTypo isLoading={isLoading} />
          <div
            className={twMerge(
              "relative z-10 w-full max-w-md mx-auto h-full md:w-1/2 p-4 shadow-md rounded-lg transition-colors duration-300",
              onFocus ? "bg-white" : "bg-[rgba(255,255,255,0.8)]"
            )}
          >
            <LoginForm setOnFocus={setOnFocus} />
          </div>
        </div>
      </section>
    </>
  );
}

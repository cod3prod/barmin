import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { authStore } from "../zustand/AuthStore";
import { flashStore } from "../zustand/FlashStore";
import api from "../config/api";
import Flash from "../components/Flash";

export async function action() {
  await api
    .post("users/logout")
    .then((res) => {
      localStorage.removeItem("token");
      authStore.setState({ isAuthenticated: false, username: "" });
      console.log("Logout successful", res.data);
      return null;
    })
    .catch((err) => {
      flashStore.setState({
        type: "error",
        message: "로그아웃을 실패하셨습니다.",
        isOpen: true,
      });
      console.error("Logout error", err);
      return null;
    });
  return null;
}

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
      <Flash />
    </div>
  );
}

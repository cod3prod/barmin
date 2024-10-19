import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { authStore } from "../zustand/AuthStore";
import api from "../config/api";
import Flash from "../components/Flash";

export async function action() {
  const { setName } = authStore.getState();

  await api
    .post("users/logout")
    .then((res) => {
      // 로그아웃 성공 플래시 메시지 만들기
      localStorage.removeItem("token");
      setName("");
      console.log("Logout successful", res.data);
      return null;
    })
    .catch((err) => {
      // 로그아웃 실패 플래시 메시지 만들기
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

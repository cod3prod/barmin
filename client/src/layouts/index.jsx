import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { authStore } from "../zustand/AuthStore";
import api from "../config/api";

export async function action() {
  const { setName } = authStore.getState();

  await api
    .post("/logout")
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
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

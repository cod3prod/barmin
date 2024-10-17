import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { jwtDecode } from "jwt-decode"; // 잘못된 import 수정
import { useLayoutEffect } from "react";
import { authStore } from "./zustand/AuthStore";
import api from "./config/api";

export default function App() {
  const { username, setName } = authStore();

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token, user is not logged in.");
      return; // 토큰이 없으면 종료
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp > currentTime) {
        console.log("token is not expired");
        setName(decoded.username);

        // 토큰이 유효할 때만 주기적으로 갱신 요청
        const interval = setInterval(async () => {
          try {
            const response = await api.get("/users/validate", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const newToken = response.data.token;
            localStorage.setItem("token", newToken); // 새 토큰 저장
            setName(jwtDecode(newToken).username); // 새 토큰에서 username 가져오기
          } catch (error) {
            console.error("Failed to validate token:", error);
            localStorage.removeItem("token");
            setName(null);
          }
        }, 15 * 60 * 1000); // 15분마다 토큰 갱신

        return () => clearInterval(interval);
      } else {
        console.log("token is expired");
        localStorage.removeItem("token");
        setName(null);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      localStorage.removeItem("token");
      setName(null);
    }
  }, []);

  return <RouterProvider router={router} />;
}

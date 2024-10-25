import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { authStore } from "./zustand/AuthStore";
import api from "./config/api";

export default function App() {
  const { login, logout, setName } = authStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token, user is not logged in.");
      logout();
      setName("");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp > currentTime) {
        console.log("token is not expired");
        login();
        setName(decoded.username);

        const interval = setInterval(async () => {
          try {
            const response = await api.get("/users/validate", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const newToken = response.data.token;
            localStorage.setItem("token", newToken); 
            login();
            setName(jwtDecode(newToken).username);
          } catch (error) {
            console.error("Failed to validate token:", error);
            localStorage.removeItem("token");
            logout();
            setName("");
          }
        }, 15 * 60 * 1000); // 15분마다 토큰 갱신

        return () => clearInterval(interval);
      } else {
        console.log("token is expired");
        localStorage.removeItem("token");
        logout();
        setName("");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      localStorage.removeItem("token");
      logout();
      setName("");
    }
  }, []);

  return <RouterProvider router={router} />;
}

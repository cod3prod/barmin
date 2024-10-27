import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { authStore } from "./zustand/AuthStore";
import api from "./config/api";

export default function App() {
  const { login, logout, setName } = authStore();
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const validateAndRefreshToken = async () => {
      if (!token) {
        logout();
        setName("");
        setAuthLoaded(true);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp > currentTime) {
          login();
          setName(decoded.username);

          const response = await api.get("/users/validate", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const newToken = response.data.token;
          localStorage.setItem("token", newToken);
          login();
          setName(jwtDecode(newToken).username);
        } else {
          localStorage.removeItem("token");
          logout();
          setName("");
        }
      } catch (error) {
        localStorage.removeItem("token");
        logout();
        setName("");
      } finally {
        setAuthLoaded(true);
      }
    };

    validateAndRefreshToken();

    const interval = setInterval(validateAndRefreshToken, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (!authLoaded) return null;

  return <RouterProvider router={router} />;
}

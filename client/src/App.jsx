import { RouterProvider } from 'react-router-dom';
import router from './routes'
import { jwtDecode } from "jwt-decode";
import { useLayoutEffect } from "react";
import { authStore } from "./zustand/AuthStore";


export default function App() {
  const { username, setName } = authStore();
  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
      return;
    }
    const decoded = jwtDecode(token);
    setName(decoded.username);
  }, [username]);

  return <RouterProvider router={router} />;
}

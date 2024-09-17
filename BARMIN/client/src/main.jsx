import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Locations from "./pages/Locations";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./index.css";

const router = createBrowserRouter([
  {
    path:"/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path:"/locations",
    element: <Locations />,
  },
  {
    path:"/register",
    element: <Register />
  },
  {
    path:"/login",
    element: <Login />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>  
    <RouterProvider router={router} />
  </React.StrictMode>
);
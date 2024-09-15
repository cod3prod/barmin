import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Root, { loader as rootLoader, action as rootAction } from "./routes/root";
import Contact from "./routes/contact"
import ErrorPage from "./error-page"

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader : rootLoader,
    action : rootAction,
    children : [
      {
        path: "contacts/:contactId",
        element : <Contact />,
      },
    ],
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
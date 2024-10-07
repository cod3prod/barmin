import { createBrowserRouter } from "react-router-dom";
import Layout, {action as layoutAction} from "../layouts";
import Home from "../views/Home";
import Register, {action as registerAction} from "../views/Register";
import Login, { action as loginAction } from "../views/Login";
import List, { loader as listLoader } from "../views/List";
import Detail, { loader as detailLoader, action as detailAction } from "../views/Detail";
import Edit, {
  loader as editLoader,
  action as editAction,
} from "../views/Edit";
import New, { action as newAction} from "../views/New";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    action: layoutAction,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "/login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "/locations",
        element: <List />,
        loader: listLoader,
      },
      {
        path: "/locations/:id",
        element: <Detail />,
        loader: detailLoader,
        action: detailAction,
      },
      {
        path: "/locations/:id/edit",
        element: <Edit />,
        loader: editLoader,
        action: editAction,
      },
      {
        path: "/locations/new",
        element: <New />,
        action: newAction,
      },
    ],
  },
]);

export default router;

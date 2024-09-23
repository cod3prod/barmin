import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import LocationsList, { loader as locationsListLoader } from "./pages/LocationsList";
import LocationDetail, { loader as locationLoader } from "./pages/LocationDetail/index";
import NewLocation, { action as locationAction } from "./pages/NewLocation";
import EditLocation, { loader as editLocationLoader, action as editLocationAction } from "./pages/EditLocation";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/locations',
        element: <LocationsList />,
        loader: locationsListLoader,
      },
      {
        path: '/locations/:id',
        element: <LocationDetail />,
        loader: locationLoader,
      },
      {
        path: '/locations/:id/edit',
        element: <EditLocation />,
        loader: editLocationLoader,
        action: editLocationAction,
      },
      {
        path: '/locations/new',
        element: <NewLocation />,
        action: locationAction,
      }
    ]
  }
]);


export default function App(){
  return(
      <RouterProvider router={router} />
  );
}
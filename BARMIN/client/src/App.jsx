import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import LocationsList, { loader as locationsListLoader } from "./pages/LocationsList";
import LocationDetail, { loader as locationLoader, action as deleteLocationAction } from "./pages/LocationDetail";
import NewLocation, { action as locationAction } from "./pages/NewLocation";
import EditLocation, { loader as editLocationLoader, action as editLocationAction } from "./pages/EditLocation";

const router = createBrowserRouter([
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
    action: deleteLocationAction,
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
]);


export default function App(){
  return(
    <>
      <RouterProvider router={router} />
    </>
  )
}
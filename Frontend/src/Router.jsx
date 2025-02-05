import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Media from "./pages/Media";
import SingleItemDetails from "./pages/SingleItemDetails";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/media",
        element: <Media />,
      },
      {
        path: "/single-item-details",
        element: <SingleItemDetails />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;

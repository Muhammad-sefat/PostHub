import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Media from "./pages/Media";
import SingleItemDetails from "./pages/SingleItemDetails";
import About from "./pages/About";
import ProtectedRoute from "./components/ProtectedRoute";
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
        element: (
          <ProtectedRoute>
            <Media />
          </ProtectedRoute>
        ),
      },
      {
        path: "/single-item-details",
        element: <SingleItemDetails />,
      },
      {
        path: "/about",
        element: (
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        ),
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

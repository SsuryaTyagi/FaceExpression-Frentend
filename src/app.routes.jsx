import { createBrowserRouter } from "react-router-dom";
import Register from "./features/auth/pages/RegisterPage";
import LoginPage from "./features/auth/pages/LoginPage";
import Protected from "./features/auth/component/Protected";
import Home from "./features/home/pages/Home";
import SongUpload from "./features/songUpload/pages/SongUpload";
import VerifyEmailPage from "./features/auth/component/VerifyEmailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/upload",
    element: (
      <Protected>
        <SongUpload />
      </Protected>
    ),
  },
  { path: "/verify-email/:token", element: <VerifyEmailPage /> },
]);

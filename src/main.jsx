import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./features/auth/auth.context.jsx";
import HomeProvider from "./features/home/home.context.jsx";
import SongProvider from "./features/songUpload/song.context.jsx";
// import { SongProvider } from "./features/songUpload/song.context.jsx";

createRoot(document.getElementById("root")).render(
  <SongProvider>
    <HomeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HomeProvider>
  </SongProvider>,
);

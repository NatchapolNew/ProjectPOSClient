import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { StoreContextProvider } from "./context/StoreContext.jsx";
import "./index.css"
import { StrictMode } from "react";

createRoot(document.getElementById("root")).render(
    <StrictMode>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
    </StrictMode>

);

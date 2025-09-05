import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { LoadingContextProvider } from "./context/LoadingContext.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Toaster />
        {/* Toaster doesn't have to any thing with the context providers */}
        <LoadingContextProvider>
            {/* Loading is important for alll */}
            <AuthContextProvider>
                {/* and then auth details */}
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </AuthContextProvider>
        </LoadingContextProvider>
    </StrictMode>
);

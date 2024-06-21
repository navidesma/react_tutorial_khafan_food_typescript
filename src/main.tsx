import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "leaflet/dist/leaflet.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "@/appContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AppContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AppContextProvider>
    </React.StrictMode>,
);

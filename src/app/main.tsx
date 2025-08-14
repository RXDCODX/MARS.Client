import "bootstrap/dist/css/bootstrap.min.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ToastModalProvider } from "@/shared/Utils/index.ts";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastModalProvider>
      <App />
    </ToastModalProvider>
  </StrictMode>
);

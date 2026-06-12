import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ThemeProvider } from "@/shared/components/ui";
import { ToastModalProvider } from "@/shared/Utils/index.ts";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ToastModalProvider>
        <App />
      </ToastModalProvider>
    </ThemeProvider>
  </StrictMode>
);

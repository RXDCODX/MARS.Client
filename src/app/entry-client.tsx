import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import PrivateRoutes from "../routes/Routes";

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <StrictMode>
    <BrowserRouter>
      <PrivateRoutes />
    </BrowserRouter>
  </StrictMode>,
);

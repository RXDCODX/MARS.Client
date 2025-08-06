import "bootstrap/dist/css/bootstrap.min.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { logger } from "@/shared/logger.ts";

import App from "./App.tsx";
import { SignalRContext } from "./index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SignalRContext.Provider
      automaticReconnect={true}
      onError={error => new Promise(resolve => resolve(console.log(error)))}
      onClosed={event => console.log(event)}
      onOpen={event => console.log(event)}
      logger={logger}
      withCredentials={false}
      url={import.meta.env.VITE_BASE_PATH + "telegramus"}
      logMessageContent
    >
      <App />
    </SignalRContext.Provider>
  </StrictMode>
);

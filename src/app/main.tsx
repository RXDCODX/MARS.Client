// import { StrictMode } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { SignalRContext } from "./index.ts";

createRoot(document.getElementById("root")!).render(
  <>
    <StrictMode>
      <SignalRContext.Provider
        automaticReconnect={true}
        onError={(error) =>
          new Promise((resolve) => resolve(console.log(error)))
        }
        onClosed={(event) => console.log(event)}
        logger={console}
        withCredentials={false}
        url={import.meta.env.VITE_BASE_PATH + "telegramus"}
        logMessageContent
      >
        <App />
      </SignalRContext.Provider>
    </StrictMode>
  </>,
);

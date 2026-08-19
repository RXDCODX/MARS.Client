import * as signalR from "react-signalr";

import { logger } from "@/shared/logger";

export const AdhdHubSignalRContext = signalR.createSignalRContext({});

interface AdhdHubProperties {
  children: React.ReactNode;
}

export function AdhdHubSignalRHubWrapper({ children }: AdhdHubProperties) {
  return (
    <AdhdHubSignalRContext.Provider
      automaticReconnect={true}
      onError={error => Promise.try(() => console.log(error))}
      onClosed={event => console.log(event)}
      onOpen={event => console.log(event)}
      logger={logger}
      withCredentials={false}
      url={import.meta.env.VITE_BASE_PATH + "hubs/adhd"}
      logMessageContent
    >
      {children}
    </AdhdHubSignalRContext.Provider>
  );
}

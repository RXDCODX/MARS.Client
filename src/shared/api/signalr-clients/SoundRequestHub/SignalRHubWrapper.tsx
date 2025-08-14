import * as signalR from "react-signalr";

import { logger } from "@/shared/logger";

export const SoundRequestHubSignalRContext = signalR.createSignalRContext({});

interface SoundRequestHubProps {
  children: React.ReactNode;
}

export function SoundRequestHubSignalRHubWrapper({
  children,
}: SoundRequestHubProps) {
  return (
    <SoundRequestHubSignalRContext.Provider
      automaticReconnect={true}
      onError={error => new Promise(resolve => resolve(console.log(error)))}
      onClosed={event => console.log(event)}
      onOpen={event => console.log(event)}
      logger={logger}
      withCredentials={false}
      url={import.meta.env.VITE_BASE_PATH + "/hubs/soundrequest"}
      logMessageContent
    >
      {children}
    </SoundRequestHubSignalRContext.Provider>
  );
}

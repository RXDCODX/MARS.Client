import * as signalR from "react-signalr";

import { logger } from "@/shared/logger";

const SignalRContext = signalR.createSignalRContext({});

interface ScoreboardHubProps {
  children: React.ReactNode;
}

export default function ScoreboardHubSignalRHubWrapper({
  children,
}: ScoreboardHubProps) {
  return (
    <SignalRContext.Provider
      automaticReconnect={true}
      onError={error => new Promise(resolve => resolve(console.log(error)))}
      onClosed={event => console.log(event)}
      onOpen={event => console.log(event)}
      logger={logger}
      withCredentials={false}
      url={import.meta.env.VITE_BASE_PATH + "/scoreboard"}
      logMessageContent
    >
      {children}
    </SignalRContext.Provider>
  );
}

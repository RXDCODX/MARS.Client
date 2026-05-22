import * as signalR from "react-signalr";

import { logger } from "@/shared/logger";

export const VoiceRecognitionHubSignalRContext = signalR.createSignalRContext(
  {}
);

interface VoiceRecognitionHubProps {
  children: React.ReactNode;
}

export function VoiceRecognitionHubSignalRHubWrapper({
  children,
}: VoiceRecognitionHubProps) {
  return (
    <VoiceRecognitionHubSignalRContext.Provider
      automaticReconnect={true}
      onError={error => new Promise(resolve => resolve(console.log(error)))}
      onClosed={event => console.log(event)}
      onOpen={event => console.log(event)}
      logger={logger}
      withCredentials={false}
      url={import.meta.env.VITE_BASE_PATH + "hubs/tts"}
      logMessageContent
    >
      {children}
    </VoiceRecognitionHubSignalRContext.Provider>
  );
}

import { logger } from "../../../app/main";
import { SignalRContext } from ".";
import CurrentTrackManager from "./CurrentTrackManager";

export default function CurrentTrackSignalRHubWrapper() {
  return (
    <SignalRContext.Provider
      automaticReconnect={true}
      onError={(error) => new Promise((resolve) => resolve(console.log(error)))}
      onClosed={(event) => console.log(event)}
      onOpen={(event) => console.log(event)}
      logger={logger}
      withCredentials={false}
      url={import.meta.env.VITE_BASE_PATH + "tuna"}
      logMessageContent
    >
      <CurrentTrackManager />
    </SignalRContext.Provider>
  );
}

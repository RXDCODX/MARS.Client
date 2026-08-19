import { HubConnection, HubConnectionState } from "@microsoft/signalr";
import { create } from "zustand";

import {
  AdhdHubSignalRConnectionBuilder,
  AdhdLayoutConfigDto,
} from "@/shared/api";

type PendingServerCommand = {
  config: AdhdLayoutConfigDto;
};

const pendingServerCommands: PendingServerCommand[] = [];
const MAX_PENDING_SERVER_COMMANDS = 40;

export type AdhdComponentKey = keyof AdhdLayoutConfigDto;

const defaultConfig: AdhdLayoutConfigDto = {
  showRainEffect: true,
  showDVDLogos: true,
  showBreakingNews: true,
  showStreamerVideo: true,
  showFitnessVideo: true,
  showGTAVideo: true,
  showHydraulicMobileVideo: true,
  showSlimeVideo: true,
  showMukbangVideo: true,
  showQuiz: true,
  showSurfer: true,
  showLOFIGirl: true,
  showCatisa: true,
  showNotifications: true,
};

interface AdhdLayoutState {
  _connection: HubConnection;
  config: AdhdLayoutConfigDto;
}

interface AdhdLayoutActions {
  setConfig: (config: AdhdLayoutConfigDto) => void;
  toggleComponent: (key: AdhdComponentKey) => void;
  setAllComponents: (isEnabled: boolean) => void;
  resetToDefaults: () => void;
  handleReceiveConfig: (config: AdhdLayoutConfigDto) => void;
  handleConfigUpdated: (config: AdhdLayoutConfigDto) => void;
  _sendToServer: (config: AdhdLayoutConfigDto) => Promise<boolean>;
}

export type AdhdLayoutStore = AdhdLayoutState & AdhdLayoutActions;

const queueServerCommand = (config: AdhdLayoutConfigDto) => {
  const nextCommand: PendingServerCommand = { config };
  pendingServerCommands.push(nextCommand);
  if (pendingServerCommands.length > MAX_PENDING_SERVER_COMMANDS) {
    pendingServerCommands.shift();
  }
};

const initialState: AdhdLayoutState = {
  _connection: AdhdHubSignalRConnectionBuilder.build(),
  config: { ...defaultConfig },
};

export const useAdhdLayoutStore = create<AdhdLayoutStore>((set, get) => {
  const connection = initialState._connection;

  const flushPendingServerCommands = async () => {
    if (connection.state === HubConnectionState.Connected) {
      while (pendingServerCommands.length > 0) {
        const pendingCommand = pendingServerCommands.shift();
        if (pendingCommand) {
          const sendResult = await get()._sendToServer(pendingCommand.config);
          if (!sendResult) {
            break;
          }
        }
      }
    }
  };

  connection.on("ReceiveConfig", config => {
    get().handleReceiveConfig(config);
  });
  connection.on("ConfigUpdated", config => {
    get().handleConfigUpdated(config);
  });

  connection.onreconnected(() => {
    console.log("ADHD SignalR reconnected. Flushing queued updates...");
    void flushPendingServerCommands();
  });

  const startConnection = async () => {
    try {
      await connection.start();
      await flushPendingServerCommands();
    } catch (error) {
      console.error("Error starting ADHD SignalR connection:", error);
    }
  };
  void startConnection();

  return {
    ...initialState,
    setConfig: config => {
      set({ config });
    },
    toggleComponent: key => {
      const currentConfig = get().config;
      const currentValue = currentConfig[key];
      const updatedConfig = {
        ...currentConfig,
        [key]: !currentValue,
      };

      set({ config: updatedConfig });
      void get()._sendToServer(updatedConfig);
    },
    setAllComponents: isEnabled => {
      const updatedConfig = { ...defaultConfig };

      for (const key of Object.keys(defaultConfig) as AdhdComponentKey[]) {
        updatedConfig[key] = isEnabled;
      }

      set({ config: updatedConfig });
      void get()._sendToServer(updatedConfig);
    },
    resetToDefaults: () => {
      const updatedConfig = { ...defaultConfig };
      set({ config: updatedConfig });
      void get()._sendToServer(updatedConfig);
    },
    handleReceiveConfig: config => {
      set({ config: { ...defaultConfig, ...config } });
    },
    handleConfigUpdated: config => {
      set({ config: { ...defaultConfig, ...config } });
    },
    _sendToServer: async config => {
      let isResult = false;

      if (connection.state === HubConnectionState.Connected) {
        try {
          console.log("Sending UpdateConfig:", config);
          await connection.invoke("UpdateConfig", config);
          isResult = true;
        } catch (error) {
          queueServerCommand(config);
          console.error(
            "Error sending UpdateConfig. Command queued for retry.",
            error
          );
        }
      } else {
        queueServerCommand(config);
        console.log(
          `SignalR connection state is '${connection.state}'. Queued UpdateConfig.`
        );
      }

      return isResult;
    },
  };
});

export const useAdhdConfig = () => useAdhdLayoutStore(state => state.config);

export const useAdhdConfigActions = () => {
  const toggleComponent = useAdhdLayoutStore(state => state.toggleComponent);
  const setAllComponents = useAdhdLayoutStore(state => state.setAllComponents);
  const resetToDefaults = useAdhdLayoutStore(state => state.resetToDefaults);

  return { toggleComponent, setAllComponents, resetToDefaults };
};

export { defaultConfig };

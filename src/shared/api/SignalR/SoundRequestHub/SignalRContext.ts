import { HubConnectionBuilder, IRetryPolicy } from "@microsoft/signalr";

import { logger } from "@/shared/logger";

const policy: IRetryPolicy = { nextRetryDelayInMilliseconds: () => 5000 };

const baseUrl = import.meta.env.VITE_BASE_PATH;

export const SoundRequestHubSignalRContext = new HubConnectionBuilder()
  .withUrl(baseUrl + "/hubs/SoundRequestHub")
  .withAutomaticReconnect(policy)
  .configureLogging(logger);

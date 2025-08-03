import { HubConnectionBuilder, IRetryPolicy } from "@microsoft/signalr";

import { logger } from "../../../../../shared/logger";

const policy: IRetryPolicy = { nextRetryDelayInMilliseconds: () => 5000 };

export const ScoreboardSignalRContext = new HubConnectionBuilder()
  .withUrl(
    import.meta.env.PROD
      ? "http://localhost:9155/scoreboardhub"
      : "http://localhost:9255/scoreboardhub",
  )
  .withAutomaticReconnect(policy)
  .configureLogging(logger);

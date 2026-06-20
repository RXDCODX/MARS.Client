import { useEffect, useState } from "react";

import {
  Commands,
  CommandsUserPlatformInfoListParamsEnum,
  getApiBaseUrl,
} from "@/shared/api";

interface SoundRequestCommandInfo {
  command: string;
  description: string;
}

const SOUND_REQUEST_COMMAND_NAMES = new Set(["sr", "srwrong", "song", "queue"]);

export function useSoundRequestCommands(): SoundRequestCommandInfo[] {
  const [commands, setCommands] = useState<SoundRequestCommandInfo[]>([]);

  useEffect(() => {
    let cancelled = false;
    const api = new Commands({ baseURL: getApiBaseUrl() });

    api
      .commandsUserPlatformInfoList(CommandsUserPlatformInfoListParamsEnum.Api)
      .then(response => {
        if (cancelled) {
          return;
        }

        const allCommands = response.data?.data ?? [];
        const filtered = allCommands
          .filter(cmd => SOUND_REQUEST_COMMAND_NAMES.has(cmd.commandName))
          .map(cmd => ({
            command: `!${cmd.commandName}`,
            description: cmd.description,
          }));

        setCommands(filtered);
      })
      .catch(() => {
        if (!cancelled) {
          setCommands([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return commands;
}

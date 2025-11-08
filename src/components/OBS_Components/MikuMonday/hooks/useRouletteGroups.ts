import { useMemo } from "react";

import type { RouletteGroup } from "../types";
import type { QueuedMikuMondayAlert } from "../types";
import { divideTracksIntoGroups } from "../utils/rouletteGroups";

export function useRouletteGroups(
  currentAlert: QueuedMikuMondayAlert | undefined
): RouletteGroup[] {
  return useMemo(
    () =>
      currentAlert
        ? divideTracksIntoGroups(
            currentAlert.availableTracks,
            currentAlert.selectedTrack
          )
        : [],
    [currentAlert]
  );
}

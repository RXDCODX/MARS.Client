import { useMemo } from "react";

import type { MikuMondayDto } from "@/shared/api";

import type { RouletteGroup } from "../types";
import { divideTracksIntoGroups } from "../utils/rouletteGroups";

export function useRouletteGroups(
  currentAlert: MikuMondayDto | undefined
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

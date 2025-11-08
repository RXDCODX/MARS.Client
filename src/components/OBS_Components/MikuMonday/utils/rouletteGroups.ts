import { MikuTrackDto } from "@/shared/api";

import type { RouletteGroup, RoulettePrize } from "../types";

function createPlaceholderPrize(index: number, groupId: number): RoulettePrize {
  const idSuffix = index >= 0 ? `${groupId}-${index}` : `${groupId}-fallback`;
  return {
    id: `placeholder-${idSuffix}`,
    image: "",
    text: "Свободный слот",
    isPlaceholder: true,
  };
}

function fillPrizesToTwenty(
  prizes: RoulettePrize[],
  groupId: number
): RoulettePrize[] {
  if (prizes.length >= 20) {
    return prizes;
  }

  const extendedPrizes = [...prizes];
  while (extendedPrizes.length < 20) {
    extendedPrizes.push(createPlaceholderPrize(extendedPrizes.length, groupId));
  }

  return extendedPrizes;
}

export function divideTracksIntoGroups(
  availableTracks: MikuTrackDto[],
  selectedTrack: MikuTrackDto
): RouletteGroup[] {
  const tracksCount = availableTracks.length;
  const allTracks = [...availableTracks, selectedTrack];
  const selectedTrackId = selectedTrack.number.toString();

  const allPrizes: RoulettePrize[] = allTracks.map(track => ({
    id: track.number.toString(),
    image: track.thumbnailUrl || "",
    text: `#${track.number}: ${track.artist} - ${track.title}`,
    isPlaceholder: false,
  }));

  let roulettesCount = 1;
  if (tracksCount >= 6) {
    roulettesCount = 3;
  } else if (tracksCount >= 4) {
    roulettesCount = 2;
  }

  if (roulettesCount === 1) {
    return [
      {
        prizes: allPrizes,
        prizeIndex: allPrizes.length - 1,
        hasWinner: true,
        isReversed: false,
      },
    ];
  }

  const groups: RouletteGroup[] = [];
  const prizesPerGroup = Math.ceil(allPrizes.length / roulettesCount);

  const selectedIndex = allPrizes.findIndex(p => p.id === selectedTrackId);
  const winnerGroupIndex = Math.floor(selectedIndex / prizesPerGroup);

  for (let i = 0; i < roulettesCount; i++) {
    const startIdx = i * prizesPerGroup;
    const endIdx = Math.min(startIdx + prizesPerGroup, allPrizes.length);
    const groupPrizes = allPrizes.slice(startIdx, endIdx);

    const hasWinner = i === winnerGroupIndex;
    const localPrizeIndex = hasWinner
      ? selectedIndex - startIdx
      : groupPrizes.length > 0
        ? groupPrizes.length - 1
        : 0;

    const isReversed = i % 2 !== 0;
    const filledPrizes = fillPrizesToTwenty(groupPrizes, i);

    groups.push({
      prizes: filledPrizes,
      prizeIndex: localPrizeIndex,
      hasWinner,
      isReversed,
    });
  }

  return groups;
}

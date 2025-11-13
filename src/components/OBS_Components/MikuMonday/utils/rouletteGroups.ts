import { MikuTrackDto } from "@/shared/api";

import type { RouletteGroup, RoulettePrize } from "../types";

function fillPrizesToTwenty(
  prizes: RoulettePrize[],
  groupId: number
): RoulettePrize[] {
  if (prizes.length >= 20) {
    return prizes;
  }

  const extendedPrizes = [...prizes];
  if (extendedPrizes.length === 0) {
    return extendedPrizes;
  }

  const nonPlaceholderPrizes = extendedPrizes.filter(
    prize => prize.isPlaceholder !== true
  );

  const sourcePrizes =
    nonPlaceholderPrizes.length > 0 ? nonPlaceholderPrizes : extendedPrizes;

  while (extendedPrizes.length < 20) {
    const randomIndex = Math.floor(Math.random() * sourcePrizes.length);
    const prize = sourcePrizes[randomIndex];
    if (prize) {
      extendedPrizes.push({
        ...prize,
        id: `${prize.id}-duplicate-${groupId}-${extendedPrizes.length}`,
        isPlaceholder: false,
      });
    }
  }

  return extendedPrizes;
}

export function divideTracksIntoGroups(
  availableTracks: MikuTrackDto[],
  selectedTrack: MikuTrackDto
): RouletteGroup[] {
  const tracksCount = availableTracks.length;
  const allTracks = [...availableTracks];

  const selectedTrackIndex = allTracks.findIndex(
    track => track.id === selectedTrack.id
  );
  if (selectedTrackIndex >= 0) {
    allTracks[selectedTrackIndex] = selectedTrack;
  } else {
    allTracks.push(selectedTrack);
  }

  const sortedTracks = [...allTracks].sort(
    (first, second) => first.number - second.number
  );

  const selectedTrackId = selectedTrack.id;

  const allPrizes: RoulettePrize[] = sortedTracks.map(track => ({
    id: track.id,
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

  const selectedIndex = allPrizes.findIndex(
    prize => prize.id === selectedTrackId
  );
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

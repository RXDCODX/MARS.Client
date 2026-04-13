import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import type { PlayerState, QueueItem } from "@/shared/api";
import { PlayerStateVideoStateEnum } from "@/shared/api";

import { useVideoScreenStore } from "../store/useVideoScreenStore";

interface UseUnifiedPlayerViewModelResult {
  currentTrack: NonNullable<QueueItem["track"]>;
  queueItemId?: string;
  playerState: PlayerState;
  isMainPlayer: boolean;
  hasUserInteracted: boolean;
  userName: string;
  userAvatar?: string;
  userColor?: string;
  localVolume: number;
  videoState: PlayerStateVideoStateEnum;
}

export function useUnifiedPlayerViewModel(): UseUnifiedPlayerViewModelResult {
  const playerStateFromStore = useVideoScreenStore(
    useShallow(state => state.playerState)
  );
  const hasUserInteracted = useVideoScreenStore(
    useShallow(state => state.hasUserInteracted)
  );
  const localVolume = useVideoScreenStore(
    useShallow(state => state.localVolume)
  );
  const isMainPlayer = useVideoScreenStore(
    useShallow(state => state.isMainPlayerContext)
  );

  const queueItemId = playerStateFromStore?.currentQueueItem?.id;
  const currentTrack = playerStateFromStore?.currentQueueItem
    ?.track as NonNullable<QueueItem["track"]>;

  const userName = useMemo(() => {
    const user = playerStateFromStore?.currentQueueItem?.requestedByTwitchUser;

    if (user?.displayName) {
      return user.displayName;
    }

    if (user?.userLogin) {
      return user.userLogin;
    }

    return "Неизвестный пользователь";
  }, [playerStateFromStore?.currentQueueItem?.requestedByTwitchUser]);

  const userAvatar =
    playerStateFromStore?.currentQueueItem?.requestedByTwitchUser
      ?.profileImageUrl;
  const userColor =
    playerStateFromStore?.currentQueueItem?.requestedByTwitchUser?.chatColor;

  const playerState = useMemo(
    () =>
      playerStateFromStore ??
      ({
        state: "Paused",
        volume: 100,
        isMuted: false,
        videoState: PlayerStateVideoStateEnum.Video,
      } as PlayerState),
    [playerStateFromStore]
  );

  const videoState =
    playerStateFromStore?.videoState ?? PlayerStateVideoStateEnum.Video;

  return {
    currentTrack,
    queueItemId,
    playerState,
    isMainPlayer,
    hasUserInteracted,
    userName,
    userAvatar,
    userColor,
    localVolume,
    videoState,
  };
}

import { useCallback, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import type { PlayerState, QueueItem } from "@/shared/api";
import { PlayerStateVideoStateEnum } from "@/shared/api";

import { UnifiedPlayerView } from "../components";
import { useVideoScreenStore } from "../store/useVideoScreenStore";

interface UseVideoStateRendererProps {
  isMainPlayer: boolean;
}

interface VideoStateRendererResult {
  component: React.ReactElement | null;
  videoState: PlayerStateVideoStateEnum;
}

/**
 * Хук для управления рендерингом компонентов в зависимости от videoState
 * @returns объект с компонентом для рендеринга и текущим videoState
 */
export function useVideoStateRenderer({
  isMainPlayer,
}: UseVideoStateRendererProps): VideoStateRendererResult {
  const playerState = useVideoScreenStore(
    useShallow(state => state.playerState)
  );
  const hasUserInteracted = useVideoScreenStore(
    useShallow(state => state.hasUserInteracted)
  );
  const localVolume = useVideoScreenStore(
    useShallow(state => state.localVolume)
  );

  // НЕ берём методы через селекторы - будем использовать getState() для вызовов

  const queueItemId = playerState?.currentQueueItem?.id;
  const currentTrack = playerState?.currentQueueItem?.track ?? null;

  const userName = useMemo(() => {
    if (playerState?.currentQueueItem?.requestedByTwitchUser) {
      const user = playerState.currentQueueItem.requestedByTwitchUser;
      if (user.displayName) {
        return user.displayName;
      }
      if (user.userLogin) {
        return user.userLogin;
      }
    }

    return "Неизвестный пользователь";
  }, [playerState?.currentQueueItem?.requestedByTwitchUser]);

  const userAvatar =
    playerState?.currentQueueItem?.requestedByTwitchUser?.profileImageUrl;
  const userColor =
    playerState?.currentQueueItem?.requestedByTwitchUser?.chatColor;

  const videoState = playerState?.videoState ?? PlayerStateVideoStateEnum.Video;

  // Мемоизируем callback функции для предотвращения ререндера
  const onEnded = useCallback(() => {
    if (isMainPlayer && currentTrack) {
      void useVideoScreenStore.getState().notifyEnded(currentTrack);
    }
  }, [isMainPlayer, currentTrack]);

  const onStart = useCallback(() => {
    if (isMainPlayer && currentTrack) {
      void useVideoScreenStore.getState().notifyStarted(currentTrack);
    }
  }, [isMainPlayer, currentTrack]);

  const onError = useCallback(() => {
    if (isMainPlayer && currentTrack) {
      void useVideoScreenStore.getState().notifyError(currentTrack);
    }
  }, [isMainPlayer, currentTrack]);

  const onProgress = useCallback(
    (progress: {
      played: number;
      playedSeconds: number;
      loaded: number;
      loadedSeconds: number;
    }) => {
      if (isMainPlayer) {
        void useVideoScreenStore
          .getState()
          .reportProgress(progress.playedSeconds);
      }
    },
    [isMainPlayer]
  );

  const onVolumeChange = useCallback((volume: number) => {
    useVideoScreenStore.getState().setLocalVolume(volume * 100);
  }, []);

  // Создаем стабильный playerState объект
  const stablePlayerState = useMemo(
    () =>
      playerState ??
      ({
        state: "Paused",
        volume: 100,
        isMuted: false,
        videoState: PlayerStateVideoStateEnum.Video,
      } as PlayerState),
    [playerState]
  );

  // Мемоизируем компонент - теперь используем единый UnifiedPlayerView
  // Используем стабильные callback'и чтобы избежать ререндера при смене videoState
  const component = useMemo(() => {
    // Если нет playerState или трека, не рендерим компонент
    if (!playerState || !currentTrack) {
      return null;
    }

    const track = currentTrack as NonNullable<QueueItem["track"]>;

    return (
      <UnifiedPlayerView
        currentTrack={track}
        queueItemId={queueItemId}
        playerState={stablePlayerState}
        isMainPlayer={isMainPlayer}
        hasUserInteracted={hasUserInteracted}
        userName={userName}
        userAvatar={userAvatar}
        userColor={userColor}
        localVolume={localVolume}
        videoState={videoState}
        onEnded={onEnded}
        onStart={onStart}
        onError={onError}
        onProgress={onProgress}
        onVolumeChange={onVolumeChange}
      />
    );
  }, [
    playerState,
    currentTrack,
    queueItemId,
    stablePlayerState,
    isMainPlayer,
    hasUserInteracted,
    userName,
    userAvatar,
    userColor,
    localVolume,
    videoState,
    onEnded,
    onStart,
    onError,
    onProgress,
    onVolumeChange,
  ]);

  return {
    component,
    videoState,
  };
}

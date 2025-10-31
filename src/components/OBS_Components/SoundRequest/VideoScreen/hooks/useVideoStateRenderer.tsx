import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import type { PlayerState, QueueItem } from "@/shared/api";
import { PlayerStateVideoStateEnum } from "@/shared/api";

import { AudioOnlyView, NoVideoView, VideoPlayerView } from "../components";
import { useVideoScreenStore } from "../store/useVideoScreenStore";

interface UseVideoStateRendererProps {
  isMainPlayer: boolean;
}

interface VideoStateRendererResult {
  component: React.ReactElement | null;
  videoState: PlayerStateVideoStateEnum;
  showSections: boolean;
}

/**
 * Хук для управления рендерингом компонентов в зависимости от videoState
 * @returns объект с компонентом для рендеринга, текущим videoState и флагом отображения секций
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

  // Определяем нужно ли показывать секции (только для Video и mainPlayer)
  const showSections = useMemo(
    () =>
      !!playerState &&
      isMainPlayer &&
      videoState === PlayerStateVideoStateEnum.Video,
    [isMainPlayer, videoState, playerState]
  );

  // Мемоизируем общие props для всех компонентов
  const commonProps = useMemo(() => {
    // Если playerState null, создаем заглушку
    const state =
      playerState ??
      ({
        state: "Paused",
        volume: 100,
        isMuted: false,
        videoState: PlayerStateVideoStateEnum.Video,
      } as PlayerState);

    const track = currentTrack
      ? (currentTrack as NonNullable<QueueItem["track"]>)
      : null;

    return {
      queueItemId,
      playerState: state,
      isMainPlayer,
      hasUserInteracted,
      onEnded: () => {
        if (isMainPlayer && track) {
          void useVideoScreenStore.getState().notifyEnded(track);
        }
      },
      onStart: () => {
        if (isMainPlayer && track) {
          void useVideoScreenStore.getState().notifyStarted(track);
        }
      },
      onError: () => {
        if (isMainPlayer && track) {
          void useVideoScreenStore.getState().notifyError(track);
        }
      },
      onProgress: (progress: {
        played: number;
        playedSeconds: number;
        loaded: number;
        loadedSeconds: number;
      }) => {
        if (isMainPlayer) {
          void useVideoScreenStore.getState().reportProgress(progress.playedSeconds);
        }
      },
    };
  }, [currentTrack, hasUserInteracted, isMainPlayer, playerState, queueItemId]);

  // Мемоизируем компонент в зависимости от videoState
  const component = useMemo(() => {
    // Если нет playerState или трека, не рендерим компонент
    if (!playerState || !currentTrack) {
      return null;
    }

    const track = currentTrack as NonNullable<QueueItem["track"]>;
    const propsWithTrack = {
      ...commonProps,
      currentTrack: track,
    };

    switch (videoState) {
      case PlayerStateVideoStateEnum.Video:
        return <VideoPlayerView {...propsWithTrack} />;

      case PlayerStateVideoStateEnum.NoVideo:
        return (
          <NoVideoView
            {...propsWithTrack}
            userName={userName}
            userAvatar={userAvatar}
            userColor={userColor}
          />
        );

      case PlayerStateVideoStateEnum.AudioOnly:
        return <AudioOnlyView {...propsWithTrack} />;

      default:
        // Fallback на обычный плеер
        console.warn(
          `[useVideoStateRenderer] Неизвестный videoState: ${videoState}, используем Video`
        );
        return <VideoPlayerView {...propsWithTrack} />;
    }
  }, [
    videoState,
    commonProps,
    userName,
    userAvatar,
    userColor,
    currentTrack,
    playerState,
  ]);

  return {
    component,
    videoState,
    showSections,
  };
}

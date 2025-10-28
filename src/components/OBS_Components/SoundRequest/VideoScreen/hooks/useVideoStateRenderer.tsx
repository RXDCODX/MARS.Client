import { useMemo } from "react";

import type { PlayerState, QueueItem } from "@/shared/api";
import { PlayerStateVideoStateEnum } from "@/shared/api";

import { AudioOnlyView, NoVideoView, VideoPlayerView } from "../components";

interface UseVideoStateRendererProps {
  playerState: PlayerState | null;
  currentTrack: QueueItem["track"];
  queueItemId?: string;
  isMainPlayer: boolean;
  hasUserInteracted: boolean;
  userName: string;
  userAvatar?: string;
  userColor?: string;
  onEnded: () => void;
  onStart: () => void;
  onError: () => void;
  onProgress: (state: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) => void;
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
  playerState,
  currentTrack,
  queueItemId,
  isMainPlayer,
  userName,
  userAvatar,
  userColor,
  onEnded,
  onStart,
  onError,
  onProgress,
  hasUserInteracted,
}: UseVideoStateRendererProps): VideoStateRendererResult {
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

    return {
      currentTrack,
      queueItemId,
      playerState: state,
      isMainPlayer,
      hasUserInteracted,
      onEnded,
      onStart,
      onError,
      onProgress,
    };
  }, [
    currentTrack,
    queueItemId,
    playerState,
    isMainPlayer,
    hasUserInteracted,
    onEnded,
    onStart,
    onError,
    onProgress,
  ]);

  // Мемоизируем компонент в зависимости от videoState
  const component = useMemo(() => {
    // Если нет playerState или трека, не рендерим компонент
    if (!playerState || !currentTrack) {
      return null;
    }

    // currentTrack точно существует, приводим тип
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

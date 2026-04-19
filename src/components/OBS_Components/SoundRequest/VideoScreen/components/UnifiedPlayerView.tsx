import { memo, useMemo } from "react";

import { PlayerStateVideoStateEnum } from "@/shared/api";
import { useInjectStyles } from "@/shared/hooks/useInjectStyles";

import { InfoBar } from "./InfoBar";
import styles from "./UnifiedPlayerView.module.scss";
import { useReactCustomPlayer } from "./useReactCustomPlayer";
import { useUnifiedPlayerViewModel } from "./useUnifiedPlayerViewModel";

/**
 * Единый компонент плеера для всех режимов (Video, NoVideo, AudioOnly)
 * Использует один экземпляр ReactPlayer, меняя только UI обёртку
 * Это предотвращает ререндер плеера при переключении режимов
 */
function UnifiedPlayerViewComponent() {
  const {
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
  } = useUnifiedPlayerViewModel();

  const { playerContainerRef, playerElement, playbackInfo } =
    useReactCustomPlayer({
      track: currentTrack,
      queueItemId,
      playerState,
      isMainPlayer,
      hasUserInteracted,
      localVolume,
      pauseSuppressionMs: 900,
      playerView: {
        width: "100%",
        height: "100%",
        controls: true,
      },
    });

  const authors = currentTrack.authors?.join(", ") || "Неизвестный автор";
  const trackName = currentTrack.trackName ?? "";

  // Инжектим стили для прозрачного фона в режимах NoVideo и AudioOnly
  const transparentBackgroundStyles = useMemo(() => {
    const needsTransparentBackground =
      videoState === PlayerStateVideoStateEnum.NoVideo ||
      videoState === PlayerStateVideoStateEnum.AudioOnly;

    if (!needsTransparentBackground) {
      return "";
    }

    return `
      body {
        background-color: transparent !important;
        background: transparent !important;
      }
      
      #root {
        background-color: transparent !important;
        background: transparent !important;
      }
      
      html {
        background-color: transparent !important;
        background: transparent !important;
      }
    `;
  }, [videoState]);

  useInjectStyles(transparentBackgroundStyles, "video-screen-transparent-bg");

  // Определяем класс плеера и контейнера для видимости
  const isVideoVisible = videoState === PlayerStateVideoStateEnum.Video;
  const playerClassName = useMemo(
    () => (isVideoVisible ? styles.videoPlayer : styles.hiddenPlayer),
    [isVideoVisible]
  );

  // Определяем контейнер в зависимости от режима
  const containerClassName = useMemo(() => {
    switch (videoState) {
      case PlayerStateVideoStateEnum.Video:
        return styles.videoContainer;

      case PlayerStateVideoStateEnum.NoVideo:
        return styles.noVideoContainer;

      case PlayerStateVideoStateEnum.AudioOnly:
        return styles.audioOnlyContainer;

      default:
        return styles.videoContainer;
    }
  }, [videoState]);

  // Определяем нужно ли показывать InfoBar и его позиционирование
  const showInfoBar =
    isMainPlayer &&
    (videoState === PlayerStateVideoStateEnum.Video ||
      videoState === PlayerStateVideoStateEnum.NoVideo);

  const isNoVideoMode = videoState === PlayerStateVideoStateEnum.NoVideo;

  return (
    <div className={containerClassName}>
      {/* Единый ReactPlayer для всех режимов - пропсы НЕИЗМЕННЫ для предотвращения ререндера */}
      <div className={playerClassName} ref={playerContainerRef}>
        {playerElement}
      </div>

      {/* Информационная полоска с прогрессом */}
      {showInfoBar && (
        <div className={isNoVideoMode ? styles.infoBarBottom : undefined}>
          <InfoBar
            userName={userName}
            userAvatar={userAvatar}
            userColor={userColor}
            trackName={trackName}
            artistName={authors}
            currentTrackProgress={playbackInfo.currentSecondProgress}
            trackDuration={currentTrack.duration}
          />
        </div>
      )}
    </div>
  );
}

// Экспортируем мемоизированную версию для оптимизации
export const UnifiedPlayerView = memo(UnifiedPlayerViewComponent);

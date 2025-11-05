import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import ReactPlayer from "react-player";

import type { PlayerState, QueueItem } from "@/shared/api";
import { PlayerStateVideoStateEnum } from "@/shared/api";
import { useInjectStyles } from "@/shared/hooks/useInjectStyles";

import { useTrackProgress } from "../../Player/Desktop/useTrackProgress";
import { parseDurationToSeconds } from "../utils/parseDuration";
import { InfoBar } from "./InfoBar";
import styles from "./UnifiedPlayerView.module.scss";

interface Props {
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
  onEnded: () => void;
  onStart: () => void;
  onError: () => void;
  onProgress: (state: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) => void;
  onVolumeChange?: (volume: number) => void;
}

/**
 * Единый компонент плеера для всех режимов (Video, NoVideo, AudioOnly)
 * Использует один экземпляр ReactPlayer, меняя только UI обёртку
 * Это предотвращает ререндер плеера при переключении режимов
 */
function UnifiedPlayerViewComponent({
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
  onEnded,
  onStart,
  onError,
  onProgress,
  onVolumeChange,
}: Props) {
  const isPlaying = playerState.state === "Playing";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const progressAppliedRef = useRef<boolean>(false);

  // Используем queueItemId если доступен, иначе fallback на URL
  // queueItemId гарантирует пересоздание плеера при новом заказе
  const playerKey = queueItemId || currentTrack.url;

  // Определяем нужно ли мьютить: мьютим если не было взаимодействия ИЛИ если в стейте указан мьют
  const shouldMute = !hasUserInteracted || playerState.isMuted;

  // Подготовка данных для прогресс-бара
  const durationSeconds = useMemo(
    () => parseDurationToSeconds(currentTrack.duration),
    [currentTrack.duration]
  );

  const trackKey = useMemo(() => {
    if (queueItemId) {
      return queueItemId;
    }
    if (currentTrack.id) {
      return currentTrack.id;
    }
    return currentTrack.url;
  }, [currentTrack.id, currentTrack.url, queueItemId]);

  const animatedProgress = useTrackProgress({
    durationSec: durationSeconds,
    isPlaying,
    trackId: trackKey,
    initialProgress: playerState.currentTrackProgress,
  });

  const progressPercent = useMemo(() => {
    if (!Number.isFinite(animatedProgress)) {
      return 0;
    }
    return Math.min(animatedProgress * 100, 100);
  }, [animatedProgress]);

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

  // Сбрасываем флаг восстановления прогресса при смене трека
  useEffect(() => {
    progressAppliedRef.current = false;
  }, [queueItemId]);

  // Отслеживание изменений громкости через внутренний плеер
  const volumeTrackingCleanupRef = useRef<(() => void) | null>(null);

  // Очистка обработчика при размонтировании или смене трека
  useEffect(
    () => () => {
      if (volumeTrackingCleanupRef.current) {
        volumeTrackingCleanupRef.current();
        volumeTrackingCleanupRef.current = null;
      }
    },
    [playerKey]
  );

  // Функция для установки обработчика на готовый плеер
  const setupVolumeTracking = useCallback(() => {
    if (!playerRef.current || !onVolumeChange) {
      return;
    }

    // Очищаем предыдущий обработчик
    if (volumeTrackingCleanupRef.current) {
      volumeTrackingCleanupRef.current();
      volumeTrackingCleanupRef.current = null;
    }

    // Проверяем, что getInternalPlayer существует
    if (typeof playerRef.current.getInternalPlayer !== "function") {
      console.warn(
        "[UnifiedPlayerView] getInternalPlayer не доступен на playerRef"
      );
      return;
    }

    const internalPlayer = playerRef.current.getInternalPlayer();
    if (
      !internalPlayer ||
      !("volume" in internalPlayer) ||
      !("addEventListener" in internalPlayer)
    ) {
      console.warn(
        "[UnifiedPlayerView] Внутренний плеер не поддерживает отслеживание громкости"
      );
      return;
    }

    const handleVolumeChange = () => {
      const mediaElement = internalPlayer as HTMLMediaElement;
      const newVolume = mediaElement.volume;
      if (typeof newVolume === "number" && newVolume >= 0 && newVolume <= 1) {
        onVolumeChange(newVolume);
      }
    };

    (internalPlayer as HTMLMediaElement).addEventListener(
      "volumechange",
      handleVolumeChange
    );

    volumeTrackingCleanupRef.current = () => {
      (internalPlayer as HTMLMediaElement).removeEventListener(
        "volumechange",
        handleVolumeChange
      );
    };

    console.log("[UnifiedPlayerView] Отслеживание громкости установлено");
  }, [onVolumeChange]);

  // Обработчик onReady для восстановления прогресса
  const handleReady = useCallback(() => {
    const savedProgressSeconds = parseDurationToSeconds(
      playerState.currentTrackProgress
    );

    if (
      savedProgressSeconds > 0 &&
      !progressAppliedRef.current &&
      playerRef.current
    ) {
      const internalPlayer = playerRef.current.getInternalPlayer();

      if (internalPlayer && "currentTime" in internalPlayer) {
        (internalPlayer as HTMLVideoElement).currentTime = savedProgressSeconds;
        progressAppliedRef.current = true;

        console.log(
          `[UnifiedPlayerView] Восстановлен прогресс: ${savedProgressSeconds}s для трека ${currentTrack.trackName}`
        );
      }
    }

    // Устанавливаем отслеживание изменения громкости
    setupVolumeTracking();
  }, [
    playerState.currentTrackProgress,
    currentTrack.trackName,
    setupVolumeTracking,
  ]);

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

  // Мемоизируем обработчики для ReactPlayer чтобы избежать ререндера
  const handleEnded = useCallback(() => {
    if (isMainPlayer) onEnded();
  }, [isMainPlayer, onEnded]);

  const handleStart = useCallback(() => {
    if (isMainPlayer) onStart();
  }, [isMainPlayer, onStart]);

  const handleError = useCallback(() => {
    if (isMainPlayer) onError();
  }, [isMainPlayer, onError]);

  const handleProgress = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => {
      if (isMainPlayer) onProgress(state);
    },
    [isMainPlayer, onProgress]
  );

  return (
    <div className={containerClassName}>
      {/* Единый ReactPlayer для всех режимов - пропсы НЕИЗМЕННЫ для предотвращения ререндера */}
      <div className={playerClassName}>
        <ReactPlayer
          ref={playerRef}
          key={playerKey}
          src={currentTrack.url}
          playing={isPlaying}
          volume={localVolume / 100}
          muted={!isMainPlayer || shouldMute}
          onEnded={handleEnded}
          onStart={handleStart}
          onError={handleError}
          onProgress={handleProgress}
          width="100%"
          height="100%"
          controls={true}
          onReady={handleReady}
        />
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
            progressPercent={progressPercent}
          />
        </div>
      )}
    </div>
  );
}

// Экспортируем мемоизированную версию для оптимизации
export const UnifiedPlayerView = memo(UnifiedPlayerViewComponent);

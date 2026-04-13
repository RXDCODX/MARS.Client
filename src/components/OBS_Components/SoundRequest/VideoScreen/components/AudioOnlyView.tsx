import { memo } from "react";

import type { PlayerState, QueueItem } from "@/shared/api";
import { useInjectStyles } from "@/shared/hooks/useInjectStyles";

import styles from "./AudioOnlyView.module.scss";
import { useReactCustomPlayer } from "./useReactCustomPlayer";

interface Props {
  currentTrack: NonNullable<QueueItem["track"]>;
  queueItemId?: string;
  playerState: PlayerState;
  isMainPlayer: boolean;
  hasUserInteracted: boolean;
  localVolume: number;
}

/**
 * Компонент для отображения только аудио
 * Используется когда videoState === PlayerStateVideoStateEnum.AudioOnly
 * Ничего не показывает на экране, только воспроизводит звук
 */
function AudioOnlyViewComponent({
  currentTrack,
  queueItemId,
  playerState,
  isMainPlayer,
  hasUserInteracted,
  localVolume,
}: Props) {
  const { playerContainerRef, playerElement } = useReactCustomPlayer({
    track: currentTrack,
    queueItemId,
    playerState,
    isMainPlayer,
    hasUserInteracted,
    localVolume,
    playerView: {
      width: "0",
      height: "0",
      controls: false,
      style: { display: "none" },
    },
  });

  // Инжектим стили для прозрачного фона
  useInjectStyles(
    `
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
    `,
    "audio-only-view-transparent-bg"
  );

  return (
    <div className={styles.container} ref={playerContainerRef}>
      {/* Полностью скрытый аудио плеер - ничего не показываем */}
      {playerElement}
    </div>
  );
}

// Экспортируем мемоизированную версию для оптимизации
export const AudioOnlyView = memo(AudioOnlyViewComponent);

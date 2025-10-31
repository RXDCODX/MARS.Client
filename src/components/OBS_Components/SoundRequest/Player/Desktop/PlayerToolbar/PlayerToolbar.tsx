import { CSSProperties, memo } from "react";
import { useShallow } from "zustand/react/shallow";

import { PlayerStateStateEnum } from "@/shared/api";

import { usePlayerStore } from "../../stores/usePlayerStore";
import { parseDurationToSeconds } from "../../utils";
import styles from "../SoundRequestPlayerDesktop.module.scss";
import { useTrackProgress } from "../useTrackProgress";
import { VolumeSlider } from "../VolumeSlider";
import {
  AddTrackButton,
  MuteButton,
  PlayPauseButton,
  PreviousButton,
  SkipButton,
  StopButton,
  VideoStateButton,
} from "./Buttons";
import { ViewModeToggle } from "./ViewModeToggle";

function PlayerToolbarComponent() {
  // Берём только необходимые данные из стора для прогресс-бара и режима отображения
  const { playerState, viewMode } = usePlayerStore(
    useShallow(state => ({
      playerState: state.playerState,
      viewMode: state.viewMode,
    }))
  );

  // Вычисляем прогресс трека для визуального отображения
  const isPlaying = playerState?.state === PlayerStateStateEnum.Playing;
  const currentTrack = playerState?.currentQueueItem?.track;
  const durationSec = parseDurationToSeconds(currentTrack?.duration || "PT0S");
  const progress = useTrackProgress({
    durationSec,
    isPlaying,
    trackId: currentTrack?.id,
    initialProgress: playerState?.currentTrackProgress,
  });

  const progressStyle = {
    "--track-progress": `${Math.round(progress * 100)}%`,
  } as CSSProperties;

  // Обработчик переключения режима отображения
  const handleToggleViewMode = () => {
    usePlayerStore.getState().cycleViewMode();
  };

  return (
    <div className={styles.toolbar} style={progressStyle}>
      <div className={styles.toolbarInner}>
        <div className={styles.leftSection}>
          <ViewModeToggle viewMode={viewMode} onToggle={handleToggleViewMode} />
          <AddTrackButton />
        </div>

        <div className={styles.controlButtons}>
          <PreviousButton />
          <PlayPauseButton />
          <StopButton />
          <SkipButton />
          <MuteButton />

          <div className={styles.extraButtons}>
            <VideoStateButton />
          </div>
        </div>

        <div className={styles.volumeWrap}>
          <VolumeSlider />
        </div>
      </div>
    </div>
  );
}

// Экспортируем мемоизированную версию для оптимизации
export const PlayerToolbar = memo(PlayerToolbarComponent);

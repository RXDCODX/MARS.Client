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

/**
 * Тулбар плеера
 * Подписывается ТОЛЬКО на данные для прогресс-бара (не на volume, isMuted и т.д.)
 */
function PlayerToolbarComponent() {
  // Селективная подписка - ТОЛЬКО поля для прогресс-бара
  const { state, currentTrack, currentTrackProgress } = usePlayerStore(
    useShallow(storeState => ({
      state: storeState.playerState?.state,
      currentTrack: storeState.playerState?.currentQueueItem?.track,
      currentTrackProgress: storeState.playerState?.currentTrackProgress,
    }))
  );

  // Вычисляем прогресс трека
  const isPlaying = state === PlayerStateStateEnum.Playing;
  const durationSec = parseDurationToSeconds(currentTrack?.duration || "PT0S");
  const progress = useTrackProgress({
    durationSec,
    isPlaying,
    trackId: currentTrack?.id,
    initialProgress: currentTrackProgress,
  });

  const progressStyle = {
    "--track-progress": `${Math.round(progress * 100)}%`,
  } as CSSProperties;

  return (
    <div className={styles.toolbar} style={progressStyle}>
      <div className={styles.toolbarInner}>
        <div className={styles.leftSection}>
          <ViewModeToggle />
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

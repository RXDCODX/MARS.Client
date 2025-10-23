import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Square,
  Video,
  Volume2,
  VolumeX,
} from "lucide-react";
import { CSSProperties } from "react";
import { Button } from "react-bootstrap";

import { ElasticSlider } from "../ElasticSlider";
import styles from "../SoundRequestPlayerDesktop.module.scss";

interface PlayerToolbarProps {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  loading: boolean;
  hasPrevious: boolean;
  progress: number;
  onPrev: () => void;
  onTogglePlayPause: () => void;
  onStop: () => void;
  onSkip: () => void;
  onMute: () => void;
  onVolumeChange: (value: number) => void;
}

export function PlayerToolbar({
  isPlaying,
  isMuted,
  volume,
  loading,
  hasPrevious,
  progress,
  onPrev,
  onTogglePlayPause,
  onStop,
  onSkip,
  onMute,
  onVolumeChange,
}: PlayerToolbarProps) {
  const progressStyle = {
    "--track-progress": `${Math.round(progress * 100)}%`,
  } as CSSProperties;

  return (
    <div className={styles.toolbar} style={progressStyle}>
      <div className={styles.toolbarInner}>
        <div className={styles.controlButtons}>
          <Button
            variant="dark"
            className={styles.tbBtn}
            onClick={onPrev}
            disabled={loading || !hasPrevious}
            title="Предыдущий"
          >
            <SkipBack />
          </Button>

          <Button
            variant={isPlaying ? "warning" : "primary"}
            className={styles.tbBtn}
            onClick={onTogglePlayPause}
            disabled={loading}
            title={isPlaying ? "Пауза" : "Воспроизвести"}
          >
            {isPlaying ? <Pause /> : <Play />}
          </Button>

          <Button
            variant="danger"
            className={styles.tbBtn}
            onClick={onStop}
            disabled={loading}
            title="Стоп"
          >
            <Square />
          </Button>

          <Button
            variant="secondary"
            className={styles.tbBtn}
            onClick={onSkip}
            disabled={loading}
            title="Следующий"
          >
            <SkipForward />
          </Button>

          <Button
            variant={isMuted ? "secondary" : "primary"}
            className={styles.tbBtn}
            onClick={onMute}
            disabled={loading}
            title={isMuted ? "Звук выкл." : "Звук вкл."}
          >
            {isMuted ? <VolumeX /> : <Volume2 />}
          </Button>

          <div className={styles.extraButtons}>
            <Button
              variant="outline-secondary"
              className={styles.tbBtn}
              disabled
              title="Видео в главном плеере (скоро)"
            >
              <Video />
            </Button>
          </div>
        </div>

        <div className={styles.volumeWrap}>
          <ElasticSlider
            value={volume}
            onChange={onVolumeChange}
            min={0}
            max={100}
            step={1}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
}

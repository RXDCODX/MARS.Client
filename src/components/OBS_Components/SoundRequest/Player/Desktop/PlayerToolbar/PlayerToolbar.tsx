import {
  Music,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Square,
  Video,
  VideoOff,
  Volume2,
  VolumeX,
} from "lucide-react";
import { CSSProperties } from "react";
import { Button } from "react-bootstrap";

import { PlayerStateVideoStateEnum } from "@/shared/api";

import { ElasticSlider } from "../ElasticSlider";
import styles from "../SoundRequestPlayerDesktop.module.scss";

interface PlayerToolbarProps {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  loading: boolean;
  hasPrevious: boolean;
  progress: number;
  videoState?: PlayerStateVideoStateEnum;
  onPrev: () => void;
  onTogglePlayPause: () => void;
  onStop: () => void;
  onSkip: () => void;
  onMute: () => void;
  onVolumeChange: (value: number) => void;
  onToggleVideoState: () => void;
}

export function PlayerToolbar({
  isPlaying,
  isMuted,
  volume,
  loading,
  hasPrevious,
  progress,
  videoState = PlayerStateVideoStateEnum.Video,
  onPrev,
  onTogglePlayPause,
  onStop,
  onSkip,
  onMute,
  onVolumeChange,
  onToggleVideoState,
}: PlayerToolbarProps) {
  const progressStyle = {
    "--track-progress": `${Math.round(progress * 100)}%`,
  } as CSSProperties;

  // Определяем иконку и подсказку в зависимости от videoState
  const getVideoIcon = () => {
    switch (videoState) {
      case PlayerStateVideoStateEnum.Video:
        return <Video />;
      case PlayerStateVideoStateEnum.NoVideo:
        return <VideoOff />;
      case PlayerStateVideoStateEnum.AudioOnly:
        return <Music />;
      default:
        return <Video />;
    }
  };

  const getVideoTitle = () => {
    switch (videoState) {
      case PlayerStateVideoStateEnum.Video:
        return "Режим: Видео (переключить на Без видео)";
      case PlayerStateVideoStateEnum.NoVideo:
        return "Режим: Без видео (переключить на Только аудио)";
      case PlayerStateVideoStateEnum.AudioOnly:
        return "Режим: Только аудио (переключить на Видео)";
      default:
        return "Переключить режим отображения";
    }
  };

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
              variant={
                videoState === PlayerStateVideoStateEnum.Video
                  ? "primary"
                  : videoState === PlayerStateVideoStateEnum.NoVideo
                    ? "warning"
                    : "info"
              }
              className={styles.tbBtn}
              onClick={onToggleVideoState}
              disabled={loading}
              title={getVideoTitle()}
            >
              {getVideoIcon()}
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

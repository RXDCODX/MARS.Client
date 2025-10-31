import { Music, Video, VideoOff } from "lucide-react";
import { memo, useMemo } from "react";
import { Button } from "react-bootstrap";
import { useShallow } from "zustand/react/shallow";

import { PlayerStateVideoStateEnum } from "@/shared/api";

import { usePlayerActions } from "../../../contexts/PlayerActionsContext";
import { usePlayerStore } from "../../../stores/usePlayerStore";
import styles from "../../SoundRequestPlayerDesktop.module.scss";

function VideoStateButtonComponent() {
  const { handleToggleVideoState } = usePlayerActions();
  const { playerState, loading } = usePlayerStore(
    useShallow(state => ({
      playerState: state.playerState,
      loading: state.loading,
    }))
  );

  const videoState = playerState?.videoState ?? PlayerStateVideoStateEnum.Video;

  // Мемоизируем иконку в зависимости от videoState
  const videoIcon = useMemo(() => {
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
  }, [videoState]);

  // Мемоизируем подсказку в зависимости от videoState
  const videoTitle = useMemo(() => {
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
  }, [videoState]);

  return (
    <Button
      variant="secondary"
      className={`${styles.tbBtn} ${
        videoState === PlayerStateVideoStateEnum.Video
          ? styles.videoMode
          : videoState === PlayerStateVideoStateEnum.NoVideo
            ? styles.noVideoMode
            : styles.audioOnlyMode
      }`}
      onClick={handleToggleVideoState}
      disabled={loading}
      title={videoTitle}
    >
      {videoIcon}
    </Button>
  );
}

export const VideoStateButton = memo(VideoStateButtonComponent);


import { Pause, Play } from "lucide-react";
import { memo } from "react";
import { Button } from "react-bootstrap";
import { useShallow } from "zustand/react/shallow";

import { PlayerStateStateEnum } from "@/shared/api";

import { usePlayerActions } from "../../../contexts/PlayerActionsContext";
import { usePlayerStore } from "../../../stores/usePlayerStore";
import styles from "../../SoundRequestPlayerDesktop.module.scss";

function PlayPauseButtonComponent() {
  const { handleTogglePlayPause } = usePlayerActions();
  const { playerState, loading } = usePlayerStore(
    useShallow(state => ({
      playerState: state.playerState,
      loading: state.loading,
    }))
  );

  const isPlaying = playerState?.state === PlayerStateStateEnum.Playing;

  return (
    <Button
      variant={isPlaying ? "warning" : "primary"}
      className={styles.tbBtn}
      onClick={handleTogglePlayPause}
      disabled={loading}
      title={isPlaying ? "Пауза" : "Воспроизвести"}
    >
      {isPlaying ? <Pause /> : <Play />}
    </Button>
  );
}

export const PlayPauseButton = memo(PlayPauseButtonComponent);


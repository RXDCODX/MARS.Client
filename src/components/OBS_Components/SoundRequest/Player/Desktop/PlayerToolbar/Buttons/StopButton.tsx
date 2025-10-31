import { Square } from "lucide-react";
import { memo } from "react";
import { Button } from "react-bootstrap";
import { useShallow } from "zustand/react/shallow";

import { PlayerStateStateEnum } from "@/shared/api";

import { usePlayerActions } from "../../../contexts/PlayerActionsContext";
import { usePlayerStore } from "../../../stores/usePlayerStore";
import styles from "../../SoundRequestPlayerDesktop.module.scss";

function StopButtonComponent() {
  const { handleStop } = usePlayerActions();
  const { playerState, loading } = usePlayerStore(
    useShallow(state => ({
      playerState: state.playerState,
      loading: state.loading,
    }))
  );

  const isStopped = playerState?.state === PlayerStateStateEnum.Stopped;

  return (
    <Button
      variant="secondary"
      className={`${styles.tbBtn} ${isStopped ? styles.stopped : ""}`}
      onClick={handleStop}
      disabled={loading}
      title="Стоп"
    >
      <Square />
    </Button>
  );
}

export const StopButton = memo(StopButtonComponent);


import { Square } from "lucide-react";
import { memo, useCallback } from "react";
import { Button } from "react-bootstrap";
import { useShallow } from "zustand/react/shallow";

import { PlayerStateStateEnum } from "@/shared/api";

import { usePlayerStore } from "../../../stores/usePlayerStore";
import styles from "../../SoundRequestPlayerDesktop.module.scss";

function StopButtonComponent() {
  const { isStopped, loading, actions } = usePlayerStore(
    useShallow(state => ({
      isStopped: state.playerState?.state === PlayerStateStateEnum.Stopped,
      loading: state.loading,
      actions: state.actions,
    }))
  );

  const handleClick = useCallback(() => {
    if (actions?.handleStop) {
      actions.handleStop();
    }
  }, [actions]);

  return (
    <Button
      variant="secondary"
      className={`${styles.tbBtn} ${isStopped ? styles.stopped : ""}`}
      onClick={handleClick}
      disabled={loading || !actions}
      title="Стоп"
    >
      <Square />
    </Button>
  );
}

export const StopButton = memo(StopButtonComponent);

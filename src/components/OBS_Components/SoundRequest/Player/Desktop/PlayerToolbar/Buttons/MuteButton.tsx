import { Volume2, VolumeX } from "lucide-react";
import { memo, useCallback } from "react";
import { Button } from "react-bootstrap";
import { useShallow } from "zustand/react/shallow";

import { usePlayerStore } from "../../../stores/usePlayerStore";
import styles from "../../SoundRequestPlayerDesktop.module.scss";

function MuteButtonComponent() {
  const { isMuted, loading, actions } = usePlayerStore(
    useShallow(state => ({
      isMuted: state.playerState?.isMuted ?? false,
      loading: state.loading,
      actions: state.actions,
    }))
  );

  const handleClick = useCallback(() => {
    if (actions?.handleMute) {
      actions.handleMute();
    }
  }, [actions]);

  return (
    <Button
      variant={isMuted ? "secondary" : "primary"}
      className={styles.tbBtn}
      onClick={handleClick}
      disabled={loading || !actions}
      title={isMuted ? "Звук выкл." : "Звук вкл."}
    >
      {isMuted ? <VolumeX /> : <Volume2 />}
    </Button>
  );
}

export const MuteButton = memo(MuteButtonComponent);

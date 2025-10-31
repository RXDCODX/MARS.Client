import { Volume2, VolumeX } from "lucide-react";
import { memo } from "react";
import { Button } from "react-bootstrap";
import { useShallow } from "zustand/react/shallow";

import { usePlayerActions } from "../../../contexts/PlayerActionsContext";
import { usePlayerStore } from "../../../stores/usePlayerStore";
import styles from "../../SoundRequestPlayerDesktop.module.scss";

function MuteButtonComponent() {
  const { handleMute } = usePlayerActions();
  const { playerState, loading } = usePlayerStore(
    useShallow(state => ({
      playerState: state.playerState,
      loading: state.loading,
    }))
  );

  const isMuted = playerState?.isMuted ?? false;

  return (
    <Button
      variant={isMuted ? "secondary" : "primary"}
      className={styles.tbBtn}
      onClick={handleMute}
      disabled={loading}
      title={isMuted ? "Звук выкл." : "Звук вкл."}
    >
      {isMuted ? <VolumeX /> : <Volume2 />}
    </Button>
  );
}

export const MuteButton = memo(MuteButtonComponent);


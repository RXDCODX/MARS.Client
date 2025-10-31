import { SkipBack } from "lucide-react";
import { memo } from "react";
import { Button } from "react-bootstrap";
import { useShallow } from "zustand/react/shallow";

import { usePlayerActions } from "../../../contexts/PlayerActionsContext";
import { usePlayerStore } from "../../../stores/usePlayerStore";
import styles from "../../SoundRequestPlayerDesktop.module.scss";

function PreviousButtonComponent() {
  const { handlePlayPrevious } = usePlayerActions();
  const { loading, history } = usePlayerStore(
    useShallow(state => ({
      loading: state.loading,
      history: state.history,
    }))
  );

  const hasPrevious = (history?.length ?? 0) > 0;

  return (
    <Button
      variant="dark"
      className={styles.tbBtn}
      onClick={handlePlayPrevious}
      disabled={loading || !hasPrevious}
      title="Предыдущий"
    >
      <SkipBack />
    </Button>
  );
}

export const PreviousButton = memo(PreviousButtonComponent);


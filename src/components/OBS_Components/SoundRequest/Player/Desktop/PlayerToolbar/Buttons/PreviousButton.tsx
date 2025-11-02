import { SkipBack } from "lucide-react";
import { memo, useCallback } from "react";
import { Button } from "react-bootstrap";
import { useShallow } from "zustand/react/shallow";

import { usePlayerStore } from "../../../stores/usePlayerStore";
import styles from "../../SoundRequestPlayerDesktop.module.scss";

function PreviousButtonComponent() {
  const { loading, actions } = usePlayerStore(
    useShallow(state => ({
      loading: state.loading,
      actions: state.actions,
    }))
  );

  const handleClick = useCallback(() => {
    if (actions?.handlePlayPrevious) {
      actions.handlePlayPrevious();
    }
  }, [actions]);

  return (
    <Button
      variant="dark"
      className={styles.tbBtn}
      onClick={handleClick}
      disabled={loading || !actions}
      title="Предыдущий трек"
    >
      <SkipBack />
    </Button>
  );
}

export const PreviousButton = memo(PreviousButtonComponent);

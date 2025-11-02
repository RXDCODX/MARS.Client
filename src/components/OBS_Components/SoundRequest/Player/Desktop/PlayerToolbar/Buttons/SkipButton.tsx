import { SkipForward } from "lucide-react";
import { memo, useCallback } from "react";
import { Button } from "react-bootstrap";
import { useShallow } from "zustand/react/shallow";

import { usePlayerStore } from "../../../stores/usePlayerStore";
import styles from "../../SoundRequestPlayerDesktop.module.scss";

function SkipButtonComponent() {
  const { loading, actions } = usePlayerStore(
    useShallow(state => ({
      loading: state.loading,
      actions: state.actions,
    }))
  );

  const handleClick = useCallback(() => {
    if (actions?.handleSkip) {
      actions.handleSkip();
    }
  }, [actions]);

  return (
    <Button
      variant="secondary"
      className={styles.tbBtn}
      onClick={handleClick}
      disabled={loading || !actions}
      title="Следующий"
    >
      <SkipForward />
    </Button>
  );
}

export const SkipButton = memo(SkipButtonComponent);

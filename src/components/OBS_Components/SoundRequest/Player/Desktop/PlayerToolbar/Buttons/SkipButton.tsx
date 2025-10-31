import { SkipForward } from "lucide-react";
import { memo } from "react";
import { Button } from "react-bootstrap";
import { useShallow } from "zustand/react/shallow";

import { usePlayerActions } from "../../../contexts/PlayerActionsContext";
import { usePlayerStore } from "../../../stores/usePlayerStore";
import styles from "../../SoundRequestPlayerDesktop.module.scss";

function SkipButtonComponent() {
  const { handleSkip } = usePlayerActions();
  const loading = usePlayerStore(useShallow(state => state.loading));

  return (
    <Button
      variant="secondary"
      className={styles.tbBtn}
      onClick={handleSkip}
      disabled={loading}
      title="Следующий"
    >
      <SkipForward />
    </Button>
  );
}

export const SkipButton = memo(SkipButtonComponent);


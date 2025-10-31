import { Plus } from "lucide-react";
import { memo } from "react";
import { Button } from "react-bootstrap";
import { useShallow } from "zustand/react/shallow";

import { usePlayerActions } from "../../../contexts/PlayerActionsContext";
import { usePlayerStore } from "../../../stores/usePlayerStore";
import styles from "../../SoundRequestPlayerDesktop.module.scss";

function AddTrackButtonComponent() {
  const { handleOpenAddTrackModal } = usePlayerActions();
  const loading = usePlayerStore(useShallow(state => state.loading));

  return (
    <Button
      variant="success"
      className={styles.tbBtn}
      onClick={handleOpenAddTrackModal}
      disabled={loading}
      title="Добавить трек"
      style={{ marginLeft: "2rem" }}
    >
      <Plus />
    </Button>
  );
}

export const AddTrackButton = memo(AddTrackButtonComponent);


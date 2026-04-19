import { useCallback, useEffect } from "react";

import { UnifiedPlayerView } from "./components/UnifiedPlayerView";
import { useVideoScreenStore } from "./store/useVideoScreenStore";
import styles from "./VideoScreen.module.scss";

interface Props {
  groupName?: string;
  className?: string;
}

export function VideoScreen({ className, groupName = "mainplayer" }: Props) {
  const isMainPlayer = groupName === "mainplayer";

  const currentTrack = useVideoScreenStore(
    state => state.playerState?.currentQueueItem?.track ?? null
  );
  const hasUserInteracted = useVideoScreenStore(
    state => state.hasUserInteracted
  );

  useEffect(() => {
    void useVideoScreenStore.getState().init(import.meta.env.PROD);

    return () => {
      void useVideoScreenStore.getState().dispose();
    };
  }, []);

  useEffect(() => {
    useVideoScreenStore.getState().setIsMainPlayerContext(isMainPlayer);
  }, [isMainPlayer]);

  const handleUserInteraction = useCallback(() => {
    useVideoScreenStore.getState().markUserInteraction();
  }, []);

  useEffect(() => {
    if (import.meta.env.PROD) {
      return;
    }

    if (hasUserInteracted) {
      return;
    }

    document.addEventListener("click", handleUserInteraction, { once: true });
    document.addEventListener("touchstart", handleUserInteraction, {
      once: true,
      passive: true,
    });

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };
  }, [handleUserInteraction, hasUserInteracted]);

  if (!currentTrack) {
    return null;
  }

  const videoSectionClassName = [
    styles.videoSection,
    styles.fullScreen,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.container} style={{ padding: 0 }}>
      <div className={videoSectionClassName}>
        <UnifiedPlayerView />
      </div>
    </div>
  );
}

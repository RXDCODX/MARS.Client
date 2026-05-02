import { memo, type UIEvent, useCallback, useRef } from "react";

import { AddTrackModal, PlayerToolbar } from "./PlayerToolbar";
import styles from "./SoundRequestPlayerDesktop.module.scss";
import { TrackColumn } from "./TrackColumn";
import { UserColumn } from "./UserColumn";

/**
 * Desktop версия Sound Request плеера
 * Чистый UI компонент - инициализация и фон управляются на уровне выше
 */
function SoundRequestPlayerDesktopComponent() {
  const trackScrollListRef = useRef<HTMLDivElement>(null);
  const userScrollListRef = useRef<HTMLDivElement>(null);
  const scrollSyncSourceRef = useRef<"track" | "user" | null>(null);

  const handleTrackScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
    if (scrollSyncSourceRef.current === "user") {
      scrollSyncSourceRef.current = null;
    } else {
      const nextScrollTop = event.currentTarget.scrollTop;
      const userScrollList = userScrollListRef.current;

      if (userScrollList && userScrollList.scrollTop !== nextScrollTop) {
        scrollSyncSourceRef.current = "track";
        userScrollList.scrollTop = nextScrollTop;
      }
    }
  }, []);

  const handleUserScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
    if (scrollSyncSourceRef.current === "track") {
      scrollSyncSourceRef.current = null;
    } else {
      const nextScrollTop = event.currentTarget.scrollTop;
      const trackScrollList = trackScrollListRef.current;

      if (trackScrollList && trackScrollList.scrollTop !== nextScrollTop) {
        scrollSyncSourceRef.current = "user";
        trackScrollList.scrollTop = nextScrollTop;
      }
    }
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.container1}>
        {/* Верхний блок 9 частей высоты: 7:3 по ширине */}
        <div className={styles.topSplit}>
          <TrackColumn
            scrollListRef={trackScrollListRef}
            onScroll={handleTrackScroll}
          />
          <UserColumn
            scrollListRef={userScrollListRef}
            onScroll={handleUserScroll}
          />
        </div>
      </div>

      {/* Нижний блок 1 часть высоты — тулбар с прогресс-заливкой */}
      <div className={styles.container3}>
        <PlayerToolbar />
      </div>

      {/* Модальное окно добавления трека - управляет своим состоянием */}
      <AddTrackModal />
    </div>
  );
}

// Экспортируем мемоизированную версию для оптимизации производительности
export const SoundRequestPlayerDesktop = memo(
  SoundRequestPlayerDesktopComponent
);

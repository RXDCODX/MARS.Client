import { memo } from "react";

import { AddTrackModal, PlayerToolbar } from "./PlayerToolbar";
import styles from "./SoundRequestPlayerDesktop.module.scss";
import { TrackColumn } from "./TrackColumn";
import { UserColumn } from "./UserColumn";

/**
 * Desktop версия Sound Request плеера
 * Чистый UI компонент - инициализация и фон управляются на уровне выше
 */
function SoundRequestPlayerDesktopComponent() {
  return (
    <div className={styles.root}>
      <div className={styles.container1}>
        {/* Верхний блок 9 частей высоты: 7:3 по ширине */}
        <div className={styles.topSplit}>
          <TrackColumn />
          <UserColumn />
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

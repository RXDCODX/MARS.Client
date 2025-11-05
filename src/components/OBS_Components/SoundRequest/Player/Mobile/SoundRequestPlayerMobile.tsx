import { memo } from "react";
import { Card } from "react-bootstrap";

import { CurrentTrack } from "./CurrentTrack";
import { PlayerControls } from "./PlayerControls";
import { QueueList } from "./QueueList";
import styles from "./SoundRequestPlayerMobile.module.scss";
import { VolumeControls } from "./VolumeControls";

/**
 * Мобильная версия Sound Request плеера
 * Чистый UI компонент - инициализация и фон управляются на уровне выше
 */
function SoundRequestPlayerMobileComponent() {
  return (
    <div className={styles.root}>
      {/* Текущий трек */}
      <Card className={styles.card}>
        <Card.Body>
          <CurrentTrack />
        </Card.Body>
      </Card>

      {/* Элементы управления */}
      <Card className={styles.card}>
        <Card.Body>
          <h5 className={styles.sectionTitle}>Управление</h5>
          <div className={styles.controlsSection}>
            <PlayerControls />
            <VolumeControls />
          </div>
        </Card.Body>
      </Card>

      {/* Полная очередь */}
      <Card className={styles.card}>
        <Card.Body>
          <QueueList
            title="Очередь"
            showPlayButton
            showDeleteButton
            collapsible
            defaultExpanded={false}
          />
        </Card.Body>
      </Card>

      {/* Ближайшие 5 заказов */}
      <Card className={styles.card}>
        <Card.Body>
          <QueueList
            title="Ближайшие 5 заказов"
            limit={5}
            showPlayButton
            collapsible={false}
          />
        </Card.Body>
      </Card>
    </div>
  );
}

// Экспортируем мемоизированную версию для оптимизации производительности
export const SoundRequestPlayerMobile = memo(SoundRequestPlayerMobileComponent);

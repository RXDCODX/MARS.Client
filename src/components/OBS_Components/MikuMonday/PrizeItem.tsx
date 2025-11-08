import { memo } from "react";

import styles from "./MikuMonday.module.scss";
import type { RoulettePrize } from "./MikuMonday";

interface PrizeItemProps {
  prize: RoulettePrize;
}

function PrizeItemComponent({ prize }: PrizeItemProps) {
  const isPlaceholder = prize.isPlaceholder === true;
  const hasCover = !isPlaceholder && Boolean(prize.image);
  const containerClass = `${styles["custom-prize"]} ${isPlaceholder ? styles["custom-prize-placeholder"] : ""}`;

  return (
    <article className={containerClass}>
      <div className={styles["custom-prize-media"]}>
        {hasCover ? (
          <img
            src={prize.image}
            alt={prize.text}
            className={styles["custom-prize-image"]}
          />
        ) : (
          <div className={styles["custom-prize-empty-image"]}>Нет обложки</div>
        )}
      </div>
      <div className={styles["custom-prize-body"]}>
        <span className={styles["custom-prize-title"]}>{prize.text}</span>
        {!isPlaceholder ? (
          <span className={styles["custom-prize-subtitle"]}>
            Мику улыбается этому треку
          </span>
        ) : (
          <span className={styles["custom-prize-subtitle"]}>
            Место ждёт следующего героя
          </span>
        )}
      </div>
    </article>
  );
}

export default memo(PrizeItemComponent);


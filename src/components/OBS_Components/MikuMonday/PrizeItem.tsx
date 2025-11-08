import { memo } from "react";
import { Textfit } from "react-textfit";

import type { RoulettePrize } from "./MikuMonday";
import styles from "./MikuMonday.module.scss";

interface PrizeItemProps {
  prize: RoulettePrize;
}

function PrizeItemComponent({ prize }: PrizeItemProps) {
  const isPlaceholder = prize.isPlaceholder === true;
  const hasCover = !isPlaceholder && Boolean(prize.image);
  const containerClass = `${styles["custom-prize"]} ${isPlaceholder ? styles["custom-prize-placeholder"] : ""}`;
  const overlayClass = `${styles["custom-prize-overlay"]} ${isPlaceholder ? styles["custom-prize-overlay-placeholder"] : ""}`;
  const mediaClass = `${styles["custom-prize-media"]} ${isPlaceholder ? styles["custom-prize-media-placeholder"] : ""}`;
  const subtitle = isPlaceholder
    ? "Место ждёт следующего героя"
    : "Мику улыбается этому треку";

  return (
    <article className={containerClass}>
      <div className={mediaClass}>
        {hasCover && (
          <img
            src={prize.image}
            alt={prize.text}
            className={styles["custom-prize-image"]}
          />
        )}
        {!hasCover && (
          <div className={styles["custom-prize-empty-image"]}>Нет обложки</div>
        )}
        <div className={overlayClass}>
          <Textfit
            mode="multi"
            max={48}
            min={8}
            forceSingleModeWidth={false}
            className={styles["custom-prize-title"]}
          >
            {prize.text}
          </Textfit>
          <Textfit
            mode="single"
            max={28}
            min={10}
            className={styles["custom-prize-subtitle"]}
          >
            {subtitle}
          </Textfit>
        </div>
      </div>
    </article>
  );
}

export default memo(PrizeItemComponent);

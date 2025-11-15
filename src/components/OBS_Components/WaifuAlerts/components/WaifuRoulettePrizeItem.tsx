import styles from "./WaifuRoulettePrizeItem.module.scss";

interface WaifuRoulettePrizeItemProps {
  image: string;
  text?: string;
}

const PRIZE_ITEM_WIDTH = 205;
const PRIZE_ITEM_HEIGHT = 234;

export default function WaifuRoulettePrizeItem({
  image,
  text,
}: WaifuRoulettePrizeItemProps) {
  if (image) {
    const normalizedText = text?.trim();

    return (
      <figure
        className={styles.figure}
        style={{
          width: `${PRIZE_ITEM_WIDTH}px`,
          height: `${PRIZE_ITEM_HEIGHT}px`,
        }}
      >
        <div className={styles.inner}>
          <img
            src={image}
            alt={normalizedText || ""}
            className={styles.image}
            loading="lazy"
          />
        </div>
        {normalizedText ? (
          <figcaption className={styles.caption}>
            <span>{normalizedText}</span>
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return null;
}

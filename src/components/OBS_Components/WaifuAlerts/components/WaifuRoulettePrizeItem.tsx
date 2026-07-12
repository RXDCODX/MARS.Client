import styles from "./WaifuRoulettePrizeItem.module.scss";

interface WaifuRoulettePrizeItemProperties {
  image: string;
  text?: string;
  wide?: boolean;
}

const PRIZE_ITEM_WIDTH = 205;
const PRIZE_ITEM_HEIGHT = 234;
const PRIZE_ITEM_WIDE_WIDTH = 260;

export default function WaifuRoulettePrizeItem({
  image,
  text,
  wide,
}: WaifuRoulettePrizeItemProperties) {
  if (image) {
    const normalizedText = text?.trim();
    const width = wide ? PRIZE_ITEM_WIDE_WIDTH : PRIZE_ITEM_WIDTH;

    return (
      <figure
        className={styles.figure}
        style={{
          width: `${width}px`,
          height: `${PRIZE_ITEM_HEIGHT}px`,
          flexShrink: 0,
        }}
        data-testid="waifu-prize-item"
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

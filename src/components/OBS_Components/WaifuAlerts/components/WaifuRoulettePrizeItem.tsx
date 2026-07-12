import { ROULETTE_SIZE_PRESETS, RouletteSize } from "./rouletteSizes";

import styles from "./WaifuRoulettePrizeItem.module.scss";

interface WaifuRoulettePrizeItemProperties {
  image: string;
  text?: string;
  size?: RouletteSize;
}

export default function WaifuRoulettePrizeItem({
  image,
  text,
  size = "l",
}: WaifuRoulettePrizeItemProperties) {
  if (image) {
    const normalizedText = text?.trim();
    const preset = ROULETTE_SIZE_PRESETS[size];

    return (
      <figure
        className={styles.figure}
        style={{
          width: `${preset.width}px`,
          height: `${preset.height}px`,
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

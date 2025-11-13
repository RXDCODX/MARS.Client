import styles from "./WaifuRoulettePrizeItem.module.scss";

interface WaifuRoulettePrizeItemProps {
  image: string;
  text?: string;
}

export default function WaifuRoulettePrizeItem({
  image,
  text,
}: WaifuRoulettePrizeItemProps) {
  if (image) {
    return (
      <figure className={styles.figure}>
        <div className={styles.inner}>
          <img
            src={image}
            alt={text || ""}
            className={styles.image}
            loading="lazy"
          />
        </div>
        {text && text.trim().length > 0 ? (
          <figcaption className={styles.caption}>
            <span>{text}</span>
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return null;
}

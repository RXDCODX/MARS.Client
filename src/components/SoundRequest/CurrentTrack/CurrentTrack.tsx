import { TunaMusicData } from "../../../shared/api/generated/baza";
import styles from "./CurrentTrack.module.scss";
import { Textfit } from "react-textfit";

interface Props {
  track: TunaMusicData;
}

export default function CurrentTrack({ track }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.slide}></div>
        <div className={styles.main}>
          <div className={styles.cover}>
            {track.cover && <img src={track.cover} alt="Album cover" />}
          </div>
          <div className={styles.trackinfo}>
            <div className={styles.info}>
              <Textfit mode="multi" max={300} className={styles.textContainer}>
                {track.artists.join(", ")}
              </Textfit>
              <Textfit mode="multi" max={300} className={styles.textContainer}>
                {track.title}
              </Textfit>
            </div>
          </div>
        </div>
        <div className={styles.slide}></div>
      </div>
    </div>
  );
}

import { Textfit } from "react-textfit";

import { TunaMusicData } from "../../../shared/api/generated/baza";
import AnimationControl from "./AnimationControl";
import styles from "./CurrentTrack.module.scss";

interface Props {
  track: TunaMusicData;
  shouldAnimate?: boolean;
}

export default function CurrentTrack({ track, shouldAnimate = true }: Props) {
  return (
    <AnimationControl AnimationStart={shouldAnimate}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.main}>
            <div className={styles.cover}>
              {track.cover && <img src={track.cover} alt="Album cover" />}
            </div>
            <div className={styles.trackinfo}>
              <div className={styles.info}>
                <div className={styles.textContainer}>
                  <Textfit mode="single" max={300} min={20}>
                    {track.artists.join(", ")}
                  </Textfit>
                </div>
                <div className={styles.textContainer}>
                  <Textfit mode="single" max={200} min={30}>
                    {track.title}
                  </Textfit>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimationControl>
  );
}

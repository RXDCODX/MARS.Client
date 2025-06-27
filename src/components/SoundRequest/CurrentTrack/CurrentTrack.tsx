import { TunaMusicData } from "../../../shared/api/generated/baza";
import AnimationControl from "./Animations/AnimationControl";
import styles from "./CurrentTrack.module.scss";
import { Textfit } from "react-textfit";

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
                  <Textfit
                    mode="single"
                    max={200}
                    min={20}
                    style={{ width: '100%', height: '100%' }}
                  >
                    {track.artists.join(", ")}
                  </Textfit>
                </div>
                <div className={styles.textContainer}>
                  <Textfit
                    mode="single"
                    max={300}
                    min={30}
                    style={{ width: '100%', height: '100%' }}
                  >
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
import { Textfit } from "react-textfit";

import { TunaMusicData } from "../../../../shared/api/generated/Api";
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
                <Textfit
                  mode="multi"
                  className={styles.textContainer}
                  max={9999}
                  min={20}
                  style={{
                    width: "100%",
                    textAlign: "end",
                  }}
                >
                  {track.artists.join(", ")}
                </Textfit>
                <Textfit
                  mode="multi"
                  className={styles.textContainer}
                  max={9999}
                  min={30}
                  style={{
                    width: "100%",
                  }}
                >
                  {track.title}
                </Textfit>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimationControl>
  );
}

import { useState } from "react";
import { Textfit } from "react-textfit";

import RainbowText from "../../shared/components/RainbowText/RainbowText";
import { Message } from "./FumoFridayController";
import styles from "./Styles.module.scss";
import { getVideoPath } from "./videoAssets";

interface Props {
  displayName: Message;
  callback: () => void;
}

export function Cirno({ callback, displayName }: Props) {
  const [show, setShow] = useState<boolean>(true);

  return (
    <div className={styles["box-container"]}>
      <div
        style={{ visibility: show ? "visible" : "hidden" }}
        className={styles.container}
      >
        <Textfit className={styles.text} mode="single">
          <div>
            Поздравляю{" "}
            <span style={{ color: displayName.color }}>
              {displayName.message}!
            </span>
          </div>
          <div style={{ display: "inline-flex" }}>
            <RainbowText text="HAPPY FUMO FRIDAY!" />
          </div>
        </Textfit>
        <div>
          <video
            src={getVideoPath("cirno")}
            autoPlay
            controls={false}
            style={{ maxWidth: "100%" }}
            onEnded={() => {
              setShow(false);
              setTimeout(() => {
                callback();
              }, 1500);
            }}
          />
        </div>
      </div>
    </div>
  );
}

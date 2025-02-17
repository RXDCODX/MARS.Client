import { useState } from "react";
import { Textfit } from "react-textfit";

import RainbowText from "../../shared/components/RainbowText/RainbowText";
import { Message } from "./FumoFridayController";
import styles from "./Styles.module.scss";

interface Props {
  displayName: Message;
  callback: () => void;
}

export function Reimu({ callback, displayName }: Props) {
  const [show, setShow] = useState<boolean>(true);

  return (
    <div
      className={styles.container}
      style={{ visibility: show ? "visible" : "hidden" }}
    >
      <div>
        <video
          src={import.meta.env.VITE_BASE_PATH + "Alerts/Reimu.webm"}
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
      <div className={styles.text}>
        <Textfit mode="single">
          <div>
            Поздравляю{" "}
            <span style={{ color: displayName.color }}>
              {displayName.message}
            </span>
            !
          </div>
          <div>
            <RainbowText text="HAPPY FUMO FRIDAY!" />
          </div>
        </Textfit>
      </div>
    </div>
  );
}

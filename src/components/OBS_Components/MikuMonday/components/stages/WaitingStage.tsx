import animate from "@/shared/styles/animate.module.scss";

import styles from "../../MikuMonday.module.scss";

export default function WaitingStage() {
  return (
    <div
      className={`${styles["waiting-stage"]} ${animate.animated} ${animate.fadeIn}`}
    />
  );
}

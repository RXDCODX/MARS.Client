import { useEffect } from "react";

import type { MikuTrackDto, TwitchUser } from "@/shared/api";
import animate from "@/shared/styles/animate.module.scss";

import commonStyles from "../../../OBSCommon.module.scss";
import styles from "../../MikuMonday.module.scss";

interface ResultStageProps {
  track: MikuTrackDto;
  twitchUser: TwitchUser;
  durationMs?: number;
  onComplete: () => void;
}

const DEFAULT_RESULT_DURATION = 7000;

export default function ResultStage({
  track,
  twitchUser,
  durationMs = DEFAULT_RESULT_DURATION,
  onComplete,
}: ResultStageProps) {
  useEffect(() => {
    const timerId = window.setTimeout(onComplete, durationMs);
    return () => {
      window.clearTimeout(timerId);
    };
  }, [durationMs, onComplete]);

  const hasCover = Boolean(track.thumbnailUrl);
  const accentColor = twitchUser.chatColor ?? "var(--bs-primary)";

  return (
    <article
      className={`${styles["result-stage"]} ${animate.animated} ${animate.fadeIn}`}
    >
      <div className={styles["result-visual"]}>
        {hasCover ? (
          <img
            src={track.thumbnailUrl}
            alt={`${track.artist} - ${track.title}`}
            className={styles["result-cover"]}
          />
        ) : (
          <div className={styles["result-cover-placeholder"]}>
            <span className={styles["result-cover-placeholder-text"]}>
              Нет обложки
            </span>
          </div>
        )}
      </div>
      <div className={styles["result-content"]}>
        <span
          className={`${styles["result-heading"]} ${commonStyles.textStrokeShadow}`}
        >
          Мику решила сегодня благословить тебя
        </span>
        <span
          className={`${styles["result-user"]} ${commonStyles.textStrokeShadow}`}
          style={{ color: accentColor }}
        >
          {twitchUser.displayName}
        </span>
        <span className={styles["result-user-login"]}>
          @{twitchUser.userLogin}
        </span>
        <div className={styles["result-track-info"]}>
          <span
            className={`${styles["result-track-title"]} ${commonStyles.textStrokeShadow}`}
          >
            {track.artist} - {track.title}
          </span>
          <span className={styles["result-track-meta"]}>
            Трек #{track.number}
          </span>
        </div>
        <span className={styles["result-message"]}>
          Пусть этот трек наполнит эфир чистой магией.
        </span>
      </div>
    </article>
  );
}

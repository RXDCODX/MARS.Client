import { useEffect, useMemo } from "react";

import type { TwitchUser } from "@/shared/api";
import animate from "@/shared/styles/animate.module.scss";

import commonStyles from "../../../OBSCommon.module.scss";
import styles from "../../MikuMonday.module.scss";

interface IntroStageProps {
  twitchUser: TwitchUser;
  fallbackAvatar?: string;
  durationMs?: number;
  onComplete: () => void;
}

const DEFAULT_INTRO_DURATION = 3200;

export default function IntroStage({
  twitchUser,
  fallbackAvatar,
  durationMs = DEFAULT_INTRO_DURATION,
  onComplete,
}: IntroStageProps) {
  useEffect(() => {
    const timerId = window.setTimeout(onComplete, durationMs);
    return () => {
      window.clearTimeout(timerId);
    };
  }, [durationMs, onComplete]);

  const displayName = twitchUser.displayName ?? twitchUser.userLogin;
  const loginTag = `@${twitchUser.userLogin}`;
  const avatarUrl = twitchUser.profileImageUrl ?? fallbackAvatar ?? "";

  const fallbackSymbol = useMemo(() => {
    if (displayName && displayName.length > 0) {
      return displayName.charAt(0).toUpperCase();
    }
    return "M";
  }, [displayName]);

  const hasAvatar = avatarUrl.length > 0;

  return (
    <article
      className={`${styles["intro-stage"]} ${animate.animated} ${animate.fadeIn}`}
    >
      <div className={styles["intro-avatar-wrapper"]}>
        {hasAvatar ? (
          <img
            src={avatarUrl}
            alt={displayName}
            className={styles["intro-avatar"]}
          />
        ) : (
          <div className={styles["intro-avatar-placeholder"]}>
            {fallbackSymbol}
          </div>
        )}
      </div>
      <div className={styles["intro-text-block"]}>
        <span
          className={`${styles["intro-heading"]} ${commonStyles.textStrokeShadow}`}
        >
          Мику обратила свой взор на
        </span>
        <span
          className={`${styles["intro-name"]} ${commonStyles.textStrokeShadow}`}
        >
          {displayName}
        </span>
        <span className={styles["intro-login"]}>{loginTag}</span>
        <span className={styles["intro-subtitle"]}>
          Приготовься к волшебству — твой трек уже на подходе!
        </span>
      </div>
    </article>
  );
}

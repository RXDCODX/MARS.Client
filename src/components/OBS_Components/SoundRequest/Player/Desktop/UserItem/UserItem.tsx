import { TwitchUser } from "@/shared/api";

import styles from "../SoundRequestPlayerDesktop.module.scss";

interface UserItemProps {
  user?: TwitchUser;
  lastTimePlays?: string;
  trackId?: string;
  isCurrent?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function UserItem({
  user,
  lastTimePlays: requestedAt,
  trackId,
  isCurrent = false,
  onMouseEnter,
  onMouseLeave,
}: UserItemProps) {
  const displayName = user?.displayName ?? user?.userLogin ?? "Неизвестно";
  const formattedDate = requestedAt
    ? new Date(requestedAt).toLocaleString()
    : "";

  return (
    <div
      className={`${styles.userRow} ${isCurrent ? `${styles.sticky} ${styles.current}` : ""}`}
      data-track-id={trackId}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      key={`${user?.twitchId}+${trackId}`}
    >
      <div className={styles.avatar}>
        {user?.profileImageUrl ? (
          <img src={user.profileImageUrl} alt="avatar" />
        ) : (
          <div className={styles.avatarPlaceholder} />
        )}
      </div>
      <div className={styles.userBody}>
        <div className={styles.userName}>{displayName}</div>
        <div className={styles.userMeta}>{formattedDate}</div>
      </div>
    </div>
  );
}

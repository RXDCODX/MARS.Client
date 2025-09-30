import "./body.css";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  FollowerInfo,
  RxdcodxViewers,
  TelegramusHubSignalRContext,
} from "@/shared/api";

import styles from "./Credits.module.scss";

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className={styles.sectionTitle}>{children}</div>;

const NameRow: React.FC<{ follower: FollowerInfo }> = ({ follower }) => {
  const textColor = follower.chatColor || "#FFFFFF";
  const textShadow = follower.chatColor
    ? "1px 1px 2px rgba(0, 0, 0, 0.8)"
    : "1px 1px 2px rgba(0, 0, 0, 1), -1px -1px 2px rgba(0, 0, 0, 1), 1px -1px 2px rgba(0, 0, 0, 1), -1px 1px 2px rgba(0, 0, 0, 1)";

  return (
    <div className={styles.nameRow}>
      {follower.profileImageUrl && (
        <img
          src={follower.profileImageUrl}
          alt={follower.userName || follower.userLogin}
          className={styles.profileImage}
        />
      )}
      <div
        className={styles.nameText}
        style={{
          color: textColor,
          textShadow: textShadow,
        }}
      >
        {follower.displayName ?? follower.userName ?? follower.userLogin}
      </div>
    </div>
  );
};

const Credits: React.FC = () => {
  const api = useMemo(() => new RxdcodxViewers(), []);

  const [moderators, setModerators] = useState<FollowerInfo[]>([]);
  const [vips, setVips] = useState<FollowerInfo[]>([]);
  const [followers, setFollowers] = useState<FollowerInfo[]>([]);
  const [contentReady, setContentReady] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Функция для перезапуска анимации титров с начала
  const resetCreditsAnimation = useCallback(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;
    // Убираем класс анимации
    el.classList.remove(styles.play);
    // Принудительно сбрасываем позицию
    el.style.transform = "translateY(100%)";

    // В следующем кадре запускаем анимацию заново
    requestAnimationFrame(() => {
      el.classList.add(styles.play);
    });
  }, []);

  // Обработчик SignalR события Credits — показать экран и запустить титры после затемнения
  TelegramusHubSignalRContext.useSignalREffect(
    "Credits",
    () => {
      setIsActive(true);
      setIsPlaying(false);

      // Запустить прокрутку спустя 2 секунды (время затемнения фона)
      const startId = window.setTimeout(() => {
        resetCreditsAnimation();
        setIsPlaying(true);
      }, 2000);

      return () => window.clearTimeout(startId);
    },
    [resetCreditsAnimation]
  );

  useEffect(() => {
    const load = async () => {
      try {
        const allRes = await api.rxdcodxViewersAllList({ forceUseCash: true });
        const allData = (allRes.data as unknown as FollowerInfo[]) ?? [];

        // Фильтруем данные по типам
        const moderatorsData = allData.filter(user => user.isModerator);
        const vipsData = allData.filter(user => user.isVip);
        const followersData = allData.filter(
          user => !user.isModerator && !user.isVip
        );

        setModerators(moderatorsData);
        setVips(vipsData);
        setFollowers(followersData);
        setContentReady(true);
      } catch (e) {
        console.error("Ошибка загрузки данных титров:", e);
      }
    };

    load();
  }, [api]);

  useEffect(() => {
    if (!containerRef.current || !contentReady || !isPlaying) return;
    // Перезапустить анимацию при обновлении данных только после готовности контента и команды на проигрывание
    const el = containerRef.current;
    void el.offsetHeight;
    el.classList.remove(styles.play);
    const id = requestAnimationFrame(() => el.classList.add(styles.play));
    return () => cancelAnimationFrame(id);
  }, [
    contentReady,
    isPlaying,
    moderators.length,
    vips.length,
    followers.length,
  ]);

  const renderNames = (list: FollowerInfo[]) => {
    if (!list || list.length === 0)
      return <div className={styles.empty}>—</div>;
    return list
      .slice()
      .sort((a, b) =>
        (a.userName || a.userLogin).localeCompare(
          b.userName || b.userLogin,
          "ru"
        )
      )
      .map(u => <NameRow key={u.userId} follower={u} />);
  };

  return (
    <div className={`${styles.root} ${isActive ? styles.active : ""}`}>
      {isActive && (
        <>
          <div className={styles.maskTop} />
          <div className={styles.maskBottom} />
          <div
            ref={containerRef}
            className={`${styles.scroll} ${contentReady && isPlaying ? styles.play : ""}`}
          >
            <div className={styles.block}>
              <SectionTitle>TWITCH.TV/RXDCODX</SectionTitle>
            </div>

            <div className={styles.block}>
              <SectionTitle>СПАСИБО МОДЕРАТОРАМ</SectionTitle>
              <div className={styles.list}>{renderNames(moderators)}</div>
            </div>

            <div className={styles.block}>
              <SectionTitle>СПАСИБО VIP</SectionTitle>
              <div className={styles.list}>{renderNames(vips)}</div>
            </div>

            <div className={styles.block}>
              <SectionTitle>СПАСИБО ФОЛОВЕРАМ</SectionTitle>
              <div className={styles.list}>{renderNames(followers)}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Credits;

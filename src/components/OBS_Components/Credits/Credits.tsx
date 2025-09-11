import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { RxdcodxViewers, TelegramusHubSignalRContext } from "@/shared/api";
import { useToastModal } from "@/shared/Utils/ToastModal";

import styles from "./Credits.module.scss";

type FollowerInfo = {
  userId: string;
  userName: string;
  userLogin: string;
  isModerator: boolean;
  isVip: boolean;
  followedAt: string | Date;
  lastUpdated: string | Date;
};

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className={styles.sectionTitle}>{children}</div>;

const NameRow: React.FC<{ name: string }> = ({ name }) => (
  <div className={styles.nameRow}>{name}</div>
);

const Credits: React.FC = () => {
  const api = useMemo(() => new RxdcodxViewers(), []);
  const { showToast } = useToastModal();

  const [moderators, setModerators] = useState<FollowerInfo[]>([]);
  const [vips, setVips] = useState<FollowerInfo[]>([]);
  const [followers, setFollowers] = useState<FollowerInfo[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Обработчик SignalR события CreditsReset
  TelegramusHubSignalRContext.useSignalREffect(
    "CreditsReset",
    () => {
      resetCreditsAnimation();
      showToast({
        type: "info",
        title: "Титры сброшены",
        message: "Анимация титров перезапущена с начала",
      });
    },
    [resetCreditsAnimation, showToast]
  );

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [modsRes, vipsRes, followersRes] = await Promise.all([
          api.rxdcodxViewersModeratorsList(),
          api.rxdcodxViewersVipsList(),
          api.rxdcodxViewersFollowersList(),
        ]);

        setModerators((modsRes.data as unknown as FollowerInfo[]) ?? []);
        setVips((vipsRes.data as unknown as FollowerInfo[]) ?? []);
        setFollowers((followersRes.data as unknown as FollowerInfo[]) ?? []);

        showToast({
          type: "success",
          title: "Загружено",
          message: "Списки модераторов, VIP и фолловеров обновлены",
          data: {
            moderators:
              (modsRes.data as unknown as FollowerInfo[])?.length ?? 0,
            vips: (vipsRes.data as unknown as FollowerInfo[])?.length ?? 0,
            followers:
              (followersRes.data as unknown as FollowerInfo[])?.length ?? 0,
          },
        });
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Неизвестная ошибка";
        showToast({ type: "error", title: "Ошибка загрузки", message: msg });
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [api, showToast]);

  useEffect(() => {
    if (!containerRef.current) return;
    // Перезапустить анимацию при обновлении данных
    const el = containerRef.current;
    // force reflow to restart animation
    void el.offsetHeight;
    el.classList.remove(styles.play);
    // next frame
    const id = requestAnimationFrame(() => el.classList.add(styles.play));
    return () => cancelAnimationFrame(id);
  }, [moderators.length, vips.length, followers.length]);

  const renderNames = (list: FollowerInfo[]) => {
    if (!list || list.length === 0)
      return <div className={styles.empty}>—</div>;
    return list
      .slice()
      .sort((a, b) => a.userName.localeCompare(b.userName, "ru"))
      .map(u => <NameRow key={u.userId} name={u.userName || u.userLogin} />);
  };

  return (
    <div className={styles.root}>
      <div className={styles.maskTop} />
      <div className={styles.maskBottom} />
      <div ref={containerRef} className={`${styles.scroll} ${styles.play}`}>
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

      {loading && <div className={styles.loading}>Загрузка…</div>}
    </div>
  );
};

export default Credits;

import "./body.css";

import { motion, useMotionValue } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  FollowerInfo,
  RxdcodxViewers,
  TelegramusHubSignalRContext,
} from "@/shared/api";
import Announce from "@/shared/Utils/Announce/Announce";

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
  const y = useMotionValue(0);

  const [moderators, setModerators] = useState<FollowerInfo[]>([]);
  const [vips, setVips] = useState<FollowerInfo[]>([]);
  const [followers, setFollowers] = useState<FollowerInfo[]>([]);
  const [contentReady, setContentReady] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [announced, setAnnounced] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Функция для запуска анимации титров с framer-motion
  const startCreditsAnimation = useCallback(async () => {
    if (!containerRef.current || !contentReady) return;

    // Ждем несколько кадров, чтобы контент полностью отрендерился
    await new Promise(resolve => requestAnimationFrame(resolve));
    await new Promise(resolve => requestAnimationFrame(resolve));
    await new Promise(resolve => requestAnimationFrame(resolve));

    // Принудительно пересчитываем layout
    if (containerRef.current) {
      void containerRef.current.offsetHeight;
    }

    // Дополнительная задержка для полного рендера всех элементов
    await new Promise(resolve => setTimeout(resolve, 50));

    // Проверяем, что все изображения загружены
    const images = containerRef.current.querySelectorAll("img");
    const imagePromises = Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    });
    await Promise.all(imagePromises);

    // Используем scrollHeight для полной высоты контента и текущую геометрию для смещения
    const containerHeight = containerRef.current.scrollHeight;
    const viewportHeight = window.innerHeight;
    const rect = containerRef.current.getBoundingClientRect();

    console.log(
      "Container scrollHeight:",
      containerHeight,
      "Viewport height:",
      viewportHeight,
      "Container rect:",
      rect.top,
      rect.height
    );

    // Цели по позициям относительно текущего top (rect.top):
    // хотим начать строго под экраном и закончить строго выше экрана
    const padding = 40; // небольшой отступ
    const startY = viewportHeight + padding - rect.top;
    const endY = -containerHeight - padding - rect.top;

    console.log("Start Y:", startY, "End Y:", endY);

    // Длительность анимации: 45 секунд
    const duration = 45;

    // Устанавливаем стартовую позицию перед показом
    y.set(startY);
    console.log("Set initial Y to:", startY);

    // Делаем видимым контент и сразу запускаем анимацию
    setIsPlaying(true);

    // Ждем один кадр, чтобы убедиться, что позиция установлена
    await new Promise(resolve => requestAnimationFrame(resolve));
    console.log("Current Y after set:", y.get());

    // Используем animate для плавной анимации
    await new Promise(resolve => {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        const currentY = startY + (endY - startY) * progress;
        y.set(currentY);

        // Принудительно обновляем стиль
        if (containerRef.current) {
          containerRef.current.style.transform = `translateY(${currentY}px)`;
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          resolve(undefined);
        }
      };
      requestAnimationFrame(animate);
    });

    // После завершения анимации скрываем фон
    setIsPlaying(false);
    setIsActive(false);
  }, [contentReady, y]);

  // Обработчик SignalR события Credits — показать экран и запустить титры после затемнения
  TelegramusHubSignalRContext.useSignalREffect(
    "Credits",
    () => {
      setIsActive(true);
      setIsPlaying(false);

      // Запустить прокрутку спустя 2 секунды (время затемнения фона)
      const startId = window.setTimeout(() => {
        // Анимация запустится только если контент готов
        if (contentReady) {
          startCreditsAnimation();
        }
      }, 2000);

      return () => {
        window.clearTimeout(startId);
      };
    },
    [startCreditsAnimation, contentReady]
  );

  // Запуск анимации когда контент готов и нужно играть
  useEffect(() => {
    if (contentReady && isPlaying) {
      // Дополнительная задержка для полного рендера контента
      const timer = setTimeout(() => {
        startCreditsAnimation();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [contentReady, isPlaying, startCreditsAnimation]);

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

  const renderNames = useCallback((list: FollowerInfo[]) => {
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
  }, []);

  return (
    <>
      {!announced && (
        <Announce title={"Credits"} callback={() => setAnnounced(true)} />
      )}
      <div className={`${styles.root} ${isActive ? styles.active : ""}`}>
        {isActive && (
          <>
            <div className={styles.maskTop} />
            <div className={styles.maskBottom} />
            <motion.div
              ref={containerRef}
              className={styles.scroll}
              style={{
                transform: `translateY(${y.get()}px)`,
                visibility: isPlaying ? "visible" : "hidden",
              }}
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
            </motion.div>
          </>
        )}
      </div>
    </>
  );
};

export default Credits;

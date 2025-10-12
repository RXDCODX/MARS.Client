import "./body.css";

import { motion, useAnimationControls } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ElectricBorder from "react-bits/src/content/Animations/ElectricBorder/ElectricBorder";
// Импортируем фоны из react-bits, которые не требуют мыши
import Aurora from "react-bits/src/ts-default/Backgrounds/Aurora/Aurora";
import Balatro from "react-bits/src/ts-default/Backgrounds/Balatro/Balatro";
import DarkVeil from "react-bits/src/ts-default/Backgrounds/DarkVeil/DarkVeil";
import FaultyTerminal from "react-bits/src/ts-default/Backgrounds/FaultyTerminal/FaultyTerminal";
import Galaxy from "react-bits/src/ts-default/Backgrounds/Galaxy/Galaxy";
import Iridescence from "react-bits/src/ts-default/Backgrounds/Iridescence/Iridescence";
import Lightning from "react-bits/src/ts-default/Backgrounds/Lightning/Lightning";
import LightRays from "react-bits/src/ts-default/Backgrounds/LightRays/LightRays";
import LiquidChrome from "react-bits/src/ts-default/Backgrounds/LiquidChrome/LiquidChrome";
import Particles from "react-bits/src/ts-default/Backgrounds/Particles/Particles";
import Prism from "react-bits/src/ts-default/Backgrounds/Prism/Prism";
import PrismaticBurst from "react-bits/src/ts-default/Backgrounds/PrismaticBurst/PrismaticBurst";
import Squares from "react-bits/src/ts-default/Backgrounds/Squares/Squares";
import Threads from "react-bits/src/ts-default/Backgrounds/Threads/Threads";

import {
  FollowerInfo,
  RxdcodxViewers,
  TelegramusHubSignalRContext,
} from "@/shared/api";
import { useTwitchStore } from "@/shared/twitchStore/twitchStore";
import Announce from "@/shared/Utils/Announce/Announce";

import styles from "./Credits.module.scss";

// Импортируем список музыкальных треков из папки music (mp3/ogg/wav)
const musicFiles = import.meta.glob("./music/*.{mp3,ogg,wav}", {
  eager: true,
  query: "url",
  import: "default",
}) as Record<string, string>;

const musicUrls: string[] = Object.values(musicFiles).sort();

// Ключ для сохранения индекса трека между запусками
const MUSIC_INDEX_STORAGE_KEY = "credits-music-index";

// Конфигурации фонов, которые не требуют мыши
// Бекграунды под названием Beams и Silk вместе вызывают баг не рендера app.tsx
const backgroundConfigs = [
  {
    name: "Aurora",
    element: (
      <Aurora
        colorStops={["#5227FF", "#7cff67", "#5227FF"]}
        amplitude={1.2}
        blend={0.6}
      />
    ),
  },
  {
    name: "DarkVeil",
    element: (
      <DarkVeil
        hueShift={200}
        noiseIntensity={0.05}
        scanlineIntensity={0.1}
        speed={0.8}
      />
    ),
  },
  {
    name: "Liquid Chrome",
    element: <LiquidChrome interactive={false} />,
  },
  {
    name: "Lightning",
    element: <Lightning hue={280} speed={1.2} intensity={1.5} size={1.2} />,
  },
  {
    name: "LightRays",
    element: (
      <LightRays
        raysColor="#5227FF"
        raysSpeed={1.5}
        lightSpread={1.2}
        rayLength={2.5}
        followMouse={false}
      />
    ),
  },
  {
    name: "Squares",
    element: (
      <Squares
        direction="diagonal"
        speed={1.0}
        borderColor="#B19EEF"
        squareSize={40}
        hoverFillColor="rgba(177, 158, 239, 0.3)"
      />
    ),
  },
  {
    name: "Balatro",
    element: (
      <Balatro
        mouseInteraction={false}
        color1="#DE443B"
        color2="#006BB4"
        color3="#162325"
        isRotate={true}
        spinSpeed={5}
      />
    ),
  },
  {
    name: "FaultyTerminal",
    element: (
      <FaultyTerminal
        mouseReact={false}
        tint="#5227FF"
        flickerAmount={0.8}
        glitchAmount={0.9}
      />
    ),
  },
  {
    name: "Galaxy",
    element: (
      <Galaxy
        mouseInteraction={false}
        hueShift={200}
        density={1.5}
        glowIntensity={0.5}
        transparent={false}
      />
    ),
  },
  {
    name: "Iridescence",
    element: (
      <Iridescence
        mouseReact={false}
        color={[1, 0.8, 1]}
        speed={1.5}
        amplitude={0.2}
      />
    ),
  },
  {
    name: "Particles",
    element: (
      <Particles
        moveParticlesOnHover={false}
        particleCount={250}
        particleColors={["#5227FF", "#FF9FFC", "#B19EEF"]}
        alphaParticles={true}
        disableRotation={false}
      />
    ),
  },
  {
    name: "Prism",
    element: (
      <Prism
        animationType="rotate"
        glow={1.5}
        bloom={1.2}
        transparent={false}
      />
    ),
  },
  {
    name: "PrismaticBurst",
    element: (
      <PrismaticBurst
        animationType="rotate3d"
        intensity={2.5}
        speed={0.6}
        colors={["#5227FF", "#FF9FFC", "#B19EEF", "#7cff67"]}
      />
    ),
  },
  {
    name: "Threads",
    element: (
      <Threads
        enableMouseInteraction={false}
        color={[0.7, 0.5, 1]}
        amplitude={1.2}
        distance={0.3}
      />
    ),
  },
];

// Импортируем иконки через import.meta.glob
const iconFiles = import.meta.glob("./icons/*.png", {
  eager: true,
  query: "url",
  import: "default",
}) as Record<string, string>;

// Создаем объект с иконками
const icons = {
  follower: iconFiles["./icons/follower.png"],
  mods: iconFiles["./icons/mods.png"],
  streamer: iconFiles["./icons/streamer.png"],
  vip: iconFiles["./icons/vip.png"],
};

const SectionTitle: React.FC<{
  children: React.ReactNode;
  leftIcon?: string;
  rightIcon?: string;
}> = ({ children, leftIcon, rightIcon }) => (
  <div className={styles.sectionTitle}>
    {leftIcon && <img src={leftIcon} alt="" className={styles.sectionIcon} />}
    <span className={styles.sectionText}>{children}</span>
    {rightIcon && <img src={rightIcon} alt="" className={styles.sectionIcon} />}
  </div>
);

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
  const controls = useAnimationControls();
  const { getStreamerInfo, getStreamerChatColor } = useTwitchStore();

  const [moderators, setModerators] = useState<FollowerInfo[]>([]);
  const [vips, setVips] = useState<FollowerInfo[]>([]);
  const [followers, setFollowers] = useState<FollowerInfo[]>([]);
  const [contentReady, setContentReady] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [announced, setAnnounced] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [streamerInfo, setStreamerInfo] = useState<{
    displayName: string;
    profileImageUrl: string;
    chatColor: string;
  } | null>(null);

  const [selectedBackground, setSelectedBackground] = useState<{
    name: string;
    element: React.ReactElement;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationTimeoutRef = useRef<number | null>(null);
  const contentReadyRef = useRef(false);
  const runIdRef = useRef(0);

  // Аудио и WebAudio для плавного затухания
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const fadeTimeoutRef = useRef<number | null>(null);
  const selectedTrackUrlRef = useRef<string | null>(null);

  const ensureAudioGraph = useCallback(() => {
    if (!audioRef.current) return;
    if (!audioContextRef.current) {
      type WindowWithWebkitAC = typeof window & {
        webkitAudioContext?: typeof AudioContext;
      };
      const AudioContextCtor =
        (window as WindowWithWebkitAC).webkitAudioContext ?? AudioContext;
      audioContextRef.current = new AudioContextCtor();
    }
    const ctx = audioContextRef.current;

    if (!gainNodeRef.current) {
      gainNodeRef.current = ctx.createGain();
      gainNodeRef.current.gain.setValueAtTime(1.0, ctx.currentTime);
    }

    if (!sourceNodeRef.current && audioRef.current) {
      try {
        sourceNodeRef.current = ctx.createMediaElementSource(audioRef.current);
      } catch {
        // Источник уже создан для данного элемента, игнорируем
      }
    }

    // Переподключаем граф
    try {
      // Отключаем прежние соединения
      sourceNodeRef.current?.disconnect();
    } catch {
      // ignore
    }
    try {
      gainNodeRef.current?.disconnect();
    } catch {
      // ignore
    }

    if (sourceNodeRef.current && gainNodeRef.current) {
      sourceNodeRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(ctx.destination);
    }
  }, []);

  const stopAndCleanupAudio = useCallback(() => {
    if (fadeTimeoutRef.current) {
      window.clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    }
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.src = "";
      } catch {
        // ignore
      }
    }
    // Возвращаем громкость к 1 на всякий случай
    if (audioContextRef.current && gainNodeRef.current) {
      gainNodeRef.current.gain.cancelScheduledValues(
        audioContextRef.current.currentTime
      );
      gainNodeRef.current.gain.setValueAtTime(
        1.0,
        audioContextRef.current.currentTime
      );
    }
  }, []);

  const selectNextMusicUrl = useCallback((): string | null => {
    if (!musicUrls.length) return null;
    let storedIndex = Number(localStorage.getItem(MUSIC_INDEX_STORAGE_KEY));
    if (Number.isNaN(storedIndex) || storedIndex < 0) storedIndex = -1;
    const nextIndex = (storedIndex + 1) % musicUrls.length;
    localStorage.setItem(MUSIC_INDEX_STORAGE_KEY, String(nextIndex));
    return musicUrls[nextIndex];
  }, []);

  const selectRandomBackground = useCallback(() => {
    if (!backgroundConfigs.length) return;
    const randomIndex = Math.floor(Math.random() * backgroundConfigs.length);
    const selected = backgroundConfigs[randomIndex];
    console.log("Выбран фон для титров:", selected.name);
    setSelectedBackground(selected);
  }, []);

  const playSelectedTrack = useCallback(
    async (url: string) => {
      if (!audioRef.current) return;
      ensureAudioGraph();
      audioRef.current.src = url;
      audioRef.current.loop = false;
      audioRef.current.muted = false;
      audioRef.current.preload = "auto";
      try {
        await audioRef.current.play();
      } catch {
        // Автоплей может запретиться — пробуем с muted
        audioRef.current.muted = true;
        await audioRef.current.play().catch(() => {
          // ignore
        });
        // Снимем mute как только можно
        setTimeout(() => {
          if (audioRef.current) audioRef.current.muted = false;
        }, 200);
      }
    },
    [ensureAudioGraph]
  );

  // Ожидание загрузки всех изображений внутри контейнера
  const waitImagesLoaded = useCallback(async () => {
    if (!containerRef.current) return;
    const images = Array.from(containerRef.current.querySelectorAll("img"));
    if (!images.length) return;
    await Promise.all(
      images.map(img => {
        const image = img as HTMLImageElement;
        if (image.complete) return Promise.resolve(undefined);
        return new Promise<void>(resolve => {
          image.onload = () => resolve();
          image.onerror = () => resolve();
        });
      })
    );
  }, []);

  // Функция для загрузки информации о стримере
  const loadStreamerInfo = useCallback(async () => {
    try {
      // ID стримера rxdcodx (785975641)
      const streamerId = "785975641";
      const [streamerData, chatColor] = await Promise.all([
        getStreamerInfo(streamerId),
        getStreamerChatColor(streamerId),
      ]);

      if (streamerData) {
        setStreamerInfo({
          displayName: streamerData.displayName,
          profileImageUrl: streamerData.profilePictureUrl,
          chatColor: chatColor || "#FFFFFF",
        });
        console.log("Информация о стримере загружена:", {
          displayName: streamerData.displayName,
          chatColor: chatColor || "#FFFFFF",
        });
      }
    } catch (error) {
      console.error("Ошибка загрузки информации о стримере:", error);
    }
  }, [getStreamerInfo, getStreamerChatColor]);

  // Функция для загрузки данных титров
  const loadCreditsData = useCallback(async () => {
    if (isLoading) {
      console.log("Загрузка уже идет, пропускаем...");
      return;
    }

    console.log("Начинаем загрузку данных титров...");
    setIsLoading(true);
    setContentReady(false);

    try {
      // Загружаем данные параллельно
      const [allRes] = await Promise.all([
        api.rxdcodxViewersAllList({ forceUseCash: true }),
        loadStreamerInfo(),
      ]);

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

      console.log("Данные титров загружены:", {
        moderators: moderatorsData.length,
        vips: vipsData.length,
        followers: followersData.length,
      });

      setContentReady(true);
      contentReadyRef.current = true;
      console.log("contentReady установлен в true");
    } catch (e) {
      console.error("Ошибка загрузки данных титров:", e);
      setContentReady(false);
      contentReadyRef.current = false;
    } finally {
      setIsLoading(false);
      console.log("Загрузка завершена, isLoading установлен в false");
    }
  }, [api, isLoading, loadStreamerInfo]);

  // Функция для запуска анимации титров через framer-motion + музыка
  const startCreditsAnimation = useCallback(async () => {
    const currentRunId = runIdRef.current;
    if (!containerRef.current) return;
    if (!contentReadyRef.current) return;
    if (isAnimating) return;

    setIsAnimating(true);

    // Ждем рендер и загрузку изображений
    await new Promise(resolve => requestAnimationFrame(resolve));
    await new Promise(resolve => requestAnimationFrame(resolve));
    await waitImagesLoaded();

    if (currentRunId !== runIdRef.current) {
      setIsAnimating(false);
      return;
    }

    const el = containerRef.current;
    const containerHeight = el.scrollHeight;
    const viewportHeight = window.innerHeight;
    const rect = el.getBoundingClientRect();
    const padding = 40;
    const startY = viewportHeight + padding - rect.top;
    const endY = -containerHeight - padding - rect.top;

    setIsPlaying(true);
    await controls.set({ y: startY });

    if (currentRunId !== runIdRef.current) {
      setIsPlaying(false);
      setIsAnimating(false);
      return;
    }

    // Продолжительность прокрутки титров
    const animationDurationSec = 45;

    // Планируем экспоненциальное затухание за 5 сек до конца анимации
    if (audioContextRef.current && gainNodeRef.current) {
      const ctx = audioContextRef.current;
      const startDelayMs = Math.max(0, (animationDurationSec - 5) * 1000);
      fadeTimeoutRef.current = window.setTimeout(() => {
        try {
          // Устанавливаем текущее значение как старт и уходим в 0.001 за 5 секунд
          const now = ctx.currentTime;
          const gain = gainNodeRef.current!.gain;
          gain.cancelScheduledValues(now);
          // Стартуем с max(текущего, маленького положительного)
          const startVal = Math.max(0.01, gain.value || 1.0);
          gain.setValueAtTime(startVal, now);
          gain.exponentialRampToValueAtTime(0.001, now + 5);
        } catch {
          // ignore
        }
      }, startDelayMs);
    }

    await controls.start({
      y: endY,
      transition: { duration: animationDurationSec, ease: "linear" },
    });

    if (currentRunId !== runIdRef.current) return;

    setIsPlaying(false);
    setIsActive(false);
    setIsAnimating(false);

    // Останавливаем музыку и размьючиваем
    stopAndCleanupAudio();
    TelegramusHubSignalRContext.invoke("UnmuteSessions");
  }, [controls, isAnimating, waitImagesLoaded, stopAndCleanupAudio]);

  // Обработчик SignalR события Credits — показать экран и запустить титры после затемнения
  TelegramusHubSignalRContext.useSignalREffect(
    "Credits",
    async () => {
      try {
        // Новый запуск
        runIdRef.current += 1;
        // Сбрасываем состояние
        setIsActive(true);
        setIsPlaying(false);
        setContentReady(false);
        contentReadyRef.current = false;

        // Выбираем случайный фон
        selectRandomBackground();

        // Выбираем следующий трек
        const nextUrl = selectNextMusicUrl();
        selectedTrackUrlRef.current = nextUrl;
        // На новый запуск гарантированно останавливаем предыдущий звук
        stopAndCleanupAudio();

        // Сразу запускаем музыку и глушим остальные источники (старт затемнения)
        if (selectedTrackUrlRef.current) {
          try {
            TelegramusHubSignalRContext.invoke("MuteAll", []);
            await playSelectedTrack(selectedTrackUrlRef.current);
          } catch {
            // ignore
          }
        }

        // Загружаем данные титров
        await loadCreditsData();

        // Запустить прокрутку спустя 2 секунды (время затемнения фона)
        animationTimeoutRef.current = window.setTimeout(() => {
          startCreditsAnimation();
        }, 2000);

        return () => {
          if (animationTimeoutRef.current) {
            window.clearTimeout(animationTimeoutRef.current);
            animationTimeoutRef.current = null;
          }
          controls.stop();
          stopAndCleanupAudio();
          TelegramusHubSignalRContext.invoke("UnmuteSessions");
        };
      } catch {
        setIsActive(false);
        setContentReady(false);
        contentReadyRef.current = false;
      }
    },
    [
      loadCreditsData,
      startCreditsAnimation,
      controls,
      selectNextMusicUrl,
      selectRandomBackground,
      stopAndCleanupAudio,
      playSelectedTrack,
    ]
  );

  // Cleanup эффект для очистки таймеров
  useEffect(
    () => () => {
      if (animationTimeoutRef.current) {
        window.clearTimeout(animationTimeoutRef.current);
        animationTimeoutRef.current = null;
      }
      if (fadeTimeoutRef.current) {
        window.clearTimeout(fadeTimeoutRef.current);
        fadeTimeoutRef.current = null;
      }
      stopAndCleanupAudio();
      TelegramusHubSignalRContext.invoke("UnmuteSessions");
    },
    [stopAndCleanupAudio]
  );

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
      <audio ref={audioRef} style={{ visibility: "hidden" }} />
      <div className={`${styles.root} ${isActive ? styles.active : ""}`}>
        {isActive && (
          <>
            {/* Рендерим выбранный фон */}
            {selectedBackground && (
              <div className={styles.backgroundContainer}>
                {selectedBackground.element}
              </div>
            )}
            <div className={styles.maskTop} />
            <div className={styles.maskBottom} />
            {/* Невидимый аудио-элемент для проигрывания музыки титров */}
            {isLoading && (
              <div className={styles.loading}>Загрузка данных титров...</div>
            )}
            {contentReady && (
              <motion.div
                ref={containerRef}
                className={styles.scroll}
                animate={controls}
                initial={{ y: 0 }}
                style={{ visibility: isPlaying ? "visible" : "hidden" }}
              >
                <div className={styles.block}>
                  {streamerInfo && (
                    <div className={styles.streamerSection}>
                      <ElectricBorder
                        style={{ borderRadius: "50%" }}
                        color="rgb(230,172,12)"
                      >
                        <img
                          src={streamerInfo.profileImageUrl}
                          alt={streamerInfo.displayName}
                          className={styles.streamerAvatar}
                        />
                      </ElectricBorder>
                      <SectionTitle
                        leftIcon={icons.streamer}
                        rightIcon={icons.streamer}
                      >
                        <span className={styles.twitchPrefix}>TWITCH.TV/</span>
                        <span
                          className={styles.streamerName}
                          style={{ color: streamerInfo.chatColor }}
                        >
                          {streamerInfo.displayName.toUpperCase()}
                        </span>
                      </SectionTitle>
                    </div>
                  )}
                  {!streamerInfo && (
                    <SectionTitle
                      leftIcon={icons.streamer}
                      rightIcon={icons.streamer}
                    >
                      TWITCH.TV/RXDCODX
                    </SectionTitle>
                  )}
                </div>

                <div className={styles.block}>
                  <SectionTitle leftIcon={icons.mods} rightIcon={icons.mods}>
                    СПАСИБО МОДЕРАТОРАМ
                  </SectionTitle>
                  <div className={styles.list}>{renderNames(moderators)}</div>
                </div>

                <div className={styles.block}>
                  <SectionTitle leftIcon={icons.vip} rightIcon={icons.vip}>
                    СПАСИБО VIP
                  </SectionTitle>
                  <div className={styles.list}>{renderNames(vips)}</div>
                </div>

                <div className={styles.block}>
                  <SectionTitle
                    leftIcon={icons.follower}
                    rightIcon={icons.follower}
                  >
                    СПАСИБО ФОЛОВЕРАМ
                  </SectionTitle>
                  <div className={styles.list}>{renderNames(followers)}</div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Credits;

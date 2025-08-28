import { AnimatePresence, motion } from "framer-motion";
import { type CSSProperties, useCallback, useState } from "react";

import { useScoreboardStore } from "./AdminPanel";
import {
  defaultLayout,
  defaultPreset,
  LayoutSettings,
} from "./AdminPanel/types";
import styles from "./Scoreboard.module.scss";

type Player = {
  name: string;
  sponsor: string;
  score: number;
  tag: string;
  flag: string;
  final: string; // "winner", "loser", "none"
};

type MetaInfo = {
  title: string;
  fightRule: string;
};

type ColorPreset = {
  mainColor?: string;
  playerNamesColor?: string;
  tournamentTitleColor?: string;
  fightModeColor?: string;
  scoreColor?: string;
  backgroundColor?: string;
  borderColor?: string;
};

type ScoreboardState = {
  player1: Player;
  player2: Player;
  meta: MetaInfo;
  colors: ColorPreset;
  isVisible: boolean;
  animationDuration?: number;
  layout?: LayoutSettings;
};

const ScoreboardContent: React.FC = () => {
  // Функция для проверки валидности тега
  const isValidTag = (tag: string): boolean => {
    if (!tag || tag.trim() === "") return false;
    const hasLetter = /[a-zA-Zа-яА-Я]/.test(tag);
    return hasLetter;
  };

  // Функция для получения пути к флагу
  const getFlagPath = (countryCode: string): string => {
    if (!countryCode) return "";
    return `/flags/${countryCode.toLowerCase()}.svg`;
  };

  const [player1, setPlayer1] = useState<Player>({
    name: "Daigo Umehara",
    sponsor: "Red Bull",
    score: 2,
    tag: "The Beast",
    flag: "jp",
    final: "none",
  });
  const [player2, setPlayer2] = useState<Player>({
    name: "Tokido",
    sponsor: "Mad Catz",
    score: 1,
    tag: "Murder Face",
    flag: "jp",
    final: "none",
  });
  const [meta, setMeta] = useState<MetaInfo>({
    title: "Street Fighter 6",
    fightRule: "Grand Finals",
  });
  const [colors, setColors] = useState<ColorPreset>(defaultPreset);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [animationDuration, setAnimationDuration] = useState<number>(800);
  const [layout, setLayout] = useState<LayoutSettings>(defaultLayout);
  const connection = useScoreboardStore(state => state._connection);

  const handleReceiveState = useCallback((state: ScoreboardState) => {
    setPlayer1(state.player1);
    setPlayer2(state.player2);
    setMeta(state.meta);
    setIsVisible(state.isVisible);

    if (state.colors) {
      setColors(state.colors);
    }

    if (state.animationDuration) {
      setAnimationDuration(state.animationDuration);
    }

    if (state.layout) {
      setLayout(state.layout);
    }
  }, []);

  connection.on("ReceiveState", handleReceiveState);
  connection.on("StateUpdated", handleReceiveState);
  connection.on("VisibilityChanged", (isVisible: boolean) => {
    setIsVisible(isVisible);
  });

  if (!isVisible) {
    return null;
  }

  // Функция для проверки, нужно ли отображать режим боя
  const shouldShowFightMode = () =>
    meta.fightRule &&
    meta.fightRule.trim() !== "" &&
    meta.fightRule.toLowerCase() !== "none" &&
    meta.fightRule.toLowerCase() !== "n/a";

  // Анимационные варианты
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: animationDuration / 1000,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: animationDuration / 1000 },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: animationDuration / 1000 },
      transform: "translateX(-50%)",
    },
  };

  // Dynamic border calculations based on header height
  const baseHeaderHeight = 60; // reference height matching SCSS defaults
  const effectiveHeaderHeight = layout?.headerHeight ?? baseHeaderHeight;
  const delta = baseHeaderHeight - effectiveHeaderHeight;

  // Derived values from provided samples:
  // top: -2px @60 -> -11px @20  => slope ≈ 0.225 per px
  // height: 130% @60 -> 211% @20 => slope ≈ 2.025% per px
  // left rotate: 148deg @60 -> 131deg @20 => slope ≈ 0.425deg per px (decreasing)
  // right rotate: 32deg @60 -> 49deg @20 => slope ≈ 0.425deg per px (increasing)
  const borderTopPx = -2 - 0.225 * delta;
  const borderHeightPercent = 130 + 2.025 * delta;
  const leftRotateDeg = 148 - 0.425 * delta;
  const rightRotateDeg = 32 + 0.425 * delta;

  const leftBorderStyle: CSSProperties = {
    borderColor: colors.borderColor,
    top: `${borderTopPx}px`,
    height: `${borderHeightPercent}%`,
    transform: `rotate(${leftRotateDeg}deg)`,
  };

  const rightBorderStyle: CSSProperties = {
    borderColor: colors.borderColor,
    top: `${borderTopPx}px`,
    height: `${borderHeightPercent}%`,
    transform: `rotate(${rightRotateDeg}deg)`,
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.scoreboardContainer}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Заголовок турнира с режимом боя */}
          {layout.showHeader && (
            <motion.div
              className={styles.tournamentHeader}
              variants={headerVariants}
              style={{
                position: "absolute",
                top: `${layout.headerTop}px`,
                left: `${layout.headerLeft}%`,
                transform: "translateX(-50%)",
                width: `${layout.headerWidth}px`,
                height: `${layout.headerHeight}px`,
                backgroundColor: colors.backgroundColor,
                borderColor: colors.borderColor || colors.mainColor,
                padding: `${layout.padding}px`,
              }}
            >
              <div
                className={styles.headerLeftBorder}
                style={leftBorderStyle}
              ></div>
              <h1 style={{ color: colors.tournamentTitleColor }}>
                {meta.title}
              </h1>
              {shouldShowFightMode() && (
                <div
                  className={styles.fightMode}
                  style={{ color: colors.fightModeColor }}
                >
                  {meta.fightRule}
                </div>
              )}
              <div
                className={styles.headerRightBorder}
                style={rightBorderStyle}
              ></div>
            </motion.div>
          )}

          {/* Контейнер игроков */}
          <motion.div
            className={styles.playersContainer}
            variants={itemVariants}
            style={{
              position: "absolute",
              top: `${layout.playersTop}px`,
              left: `${layout.playersLeft}px`,
              right: `${layout.playersRight}px`,
              gap: `${layout.spacing}px`,
            }}
          >
            {/* Левый игрок */}
            <motion.div
              className={styles.playerLeft}
              style={{
                width: `${layout.playerBarWidth}px`,
                height: `${layout.playerBarHeight}px`,
                backgroundColor: colors.backgroundColor,
                borderColor: colors.borderColor || colors.mainColor,
                padding: `${layout.padding}px`,
              }}
            >
              {layout.showFlags && player1.flag && player1.flag !== "none" && (
                <div
                  className={styles.flag}
                  style={{
                    height: "auto",
                  }}
                >
                  <img
                    src={getFlagPath(player1.flag)}
                    alt="Player 1 flag"
                    onError={e => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}

              {/* Счет левого игрока */}
              <div
                className={styles.score}
                style={{
                  width: layout.scoreSize,
                  backgroundColor: colors.borderColor,
                  height: layout.playerBarHeight,
                }}
              >
                <h3 style={{ color: colors.scoreColor }}>{player1.score}</h3>
              </div>
              <div className={styles.playerInfo}>
                <h2 style={{ color: colors.playerNamesColor }}>
                  {player1.final === "winner" && "[W] "}
                  {player1.final === "loser" && "[L] "}
                  {layout.showTags && isValidTag(player1.tag) && (
                    <span
                      className={styles.playerTag}
                      style={{ color: colors.mainColor }}
                    >
                      {player1.tag}
                    </span>
                  )}
                  {layout.showTags && isValidTag(player1.tag) && " | "}
                  {player1.name}
                </h2>
              </div>
            </motion.div>

            {/* Правый игрок */}
            <motion.div
              className={styles.playerRight}
              style={{
                width: `${layout.playerBarWidth}px`,
                height: `${layout.playerBarHeight}px`,
                backgroundColor: colors.backgroundColor,
                borderColor: colors.borderColor || colors.mainColor,
                padding: `${layout.padding}px`,
              }}
            >
              {layout.showFlags && player2.flag && player2.flag !== "none" && (
                <div
                  className={styles.flag}
                  style={{
                    height: `auto`,
                  }}
                >
                  <img
                    src={getFlagPath(player2.flag)}
                    alt="Player 2 flag"
                    onError={e => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}

              <div className={styles.playerInfo}>
                <h2 style={{ color: colors.playerNamesColor }}>
                  {player2.final === "winner" && "[W] "}
                  {player2.final === "loser" && "[L] "}
                  {player2.name}
                  {layout.showTags && isValidTag(player2.tag) && " | "}
                  {layout.showTags && isValidTag(player2.tag) && (
                    <span
                      className={styles.playerTag}
                      style={{ color: colors.mainColor }}
                    >
                      {player2.tag}
                    </span>
                  )}
                </h2>
              </div>

              {/* Счет правого игрока */}
              <div
                className={styles.score}
                style={{
                  width: layout.scoreSize,
                  backgroundColor: colors.borderColor,
                  height: layout.playerBarHeight,
                }}
              >
                <h3 style={{ color: colors.scoreColor }}>{player2.score}</h3>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Scoreboard: React.FC = () => <ScoreboardContent />;

export default Scoreboard;

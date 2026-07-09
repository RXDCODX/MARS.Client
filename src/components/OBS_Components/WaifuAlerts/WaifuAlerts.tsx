/* eslint-disable simple-import-sort/imports */
import { useCallback, useEffect, useRef, useState } from "react";
import SchoolPride from "react-canvas-confetti/dist/presets/pride";
import { Textfit } from "react-textfit";
import { useShallow } from "zustand/react/shallow";
import useTelegramusHubStore from "@/shared/stores/telegramusHubStore";
import useWaifuPrizesStore from "@/shared/stores/waifuPrizesStore";
import animate from "@/shared/styles/animate.module.scss";
import useTwitchStore from "@/shared/twitchStore/twitchStore";
import { getRandomColor } from "@/shared/Utils";
import { getApiBaseUrl } from "@/shared/api/api-config";
import Announce from "@/shared/Utils/Announce/Announce";
import InjectStyles from "@/shared/components/InjectStyles";

import common from "../OBSCommon.module.scss";
import { getHusbandText, getText, getTitle } from "./helper";
import styles from "./WaifuAlerts.module.scss";
import WaifuRoulette from "./WaifuRoulette";

// Очередь сообщений теперь живёт в SignalR-сторе

export default function WaifuAlerts() {
  const currentMessage = useTelegramusHubStore(
    useShallow(state => state.currentMessage)
  );
  const dequeueCurrent = useTelegramusHubStore(state => state.dequeueCurrent);
  const startHub = useTelegramusHubStore(state => state.start);
  const [announced, setAnnounced] = useState(false);
  const divHard = useRef<HTMLDivElement>(null);
  const [isRouletted, setIsRouletted] = useState(false);
  const [rouletteIndex, setRouletteIndex] = useState(-1);
  const sendMessage = useTwitchStore(state => state.sendMsgToPyrokxnezxz);
  const imageLoadTimeoutReference = useRef<NodeJS.Timeout | null>(null);

  // Используем отдельный store для призов
  const prizes = useWaifuPrizesStore(useShallow(state => state.prizes));
  const shufflePrizes = useWaifuPrizesStore(state => state.shuffle);

  // Инициализируем подключение к хабу при монтировании
  useEffect(() => {
    startHub();
  }, [startHub]);

  // Призы приходят и обрабатываются в сторе TelegramusHubStore
  const handleRemoveEvent = useCallback(() => {
    dequeueCurrent();
  }, [dequeueCurrent]);

  useEffect(() => {
    if (!currentMessage) {
      return;
    }

    console.log("Current message changed:", {
      waifuId: currentMessage.waifu.shikiId,
      waifuName: currentMessage.waifu.name,
      hasTwitchUser: !!currentMessage.waifuHusband?.twitchUser,
      twitchUserId: currentMessage.waifuHusband?.twitchUser?.twitchId,
    });
    console.log("Prizes available:", prizes.length);

    if (prizes && prizes.length > 0) {
      const index = prizes.findIndex(
        prize => prize.id === currentMessage.waifu.shikiId
      );
      console.log(
        "Found prize index:",
        index,
        "for waifu:",
        currentMessage.waifu.shikiId
      );

      if (index === -1) {
        console.warn("⚠️ Waifu not found in prizes list! Skipping roulette.");
        // Если вайфу нет в списке призов, сразу показываем алерт
        queueMicrotask(() => {
          setRouletteIndex(-1);
          setIsRouletted(true);
        });
      } else if (currentMessage.waifuHusband?.twitchUser) {
        queueMicrotask(() => {
          setRouletteIndex(index);
        });
      } else {
        console.warn("⚠️ TwitchUser not loaded! Skipping roulette.");
        // Если TwitchUser не загружен, показываем алерт без рулетки
        queueMicrotask(() => {
          setRouletteIndex(-1);
          setIsRouletted(true);
        });
      }
    } else {
      console.log("No prizes available, waiting for UpdateWaifuPrizes...");
      queueMicrotask(() => {
        setRouletteIndex(-1);
      });

      // Если призы не загружены, ждем 5 секунд и показываем алерт
      const timeout = setTimeout(() => {
        console.warn(
          "⚠️ Prizes timeout after 5 seconds! Showing alert directly."
        );
        setIsRouletted(true);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [prizes, currentMessage]);

  useEffect(() => {
    if (
      currentMessage &&
      (currentMessage.waifu.isMerged || currentMessage.waifu.isAdded)
    ) {
      queueMicrotask(() => {
        setIsRouletted(true);
      });
    }
  }, [currentMessage]);

  // Таймаут для загрузки изображения (10 секунд)
  useEffect(() => {
    if (!(currentMessage && isRouletted) || currentMessage.waifu.isMerged) {
      return;
    }

    imageLoadTimeoutReference.current = setTimeout(() => {
      console.warn(
        "Таймаут загрузки изображения waifu:",
        currentMessage.waifu.imageUrl
      );
      handleRemoveEvent();
      setRouletteIndex(-1);
      setIsRouletted(false);
    }, 10_000);

    return () => {
      if (!imageLoadTimeoutReference.current) {
        return;
      }

      clearTimeout(imageLoadTimeoutReference.current);
      imageLoadTimeoutReference.current = null;
    };
  }, [currentMessage, isRouletted, handleRemoveEvent]);

  const invokeHub = useTelegramusHubStore(state => state.invoke);
  const muteAll = useCallback(() => {
    invokeHub("MuteAll", []);
  }, [invokeHub]);

  const unmuteAll = useCallback(() => {
    invokeHub("UnmuteSessions");
  }, [invokeHub]);

  const error = useCallback(() => {
    unmuteAll();
    handleRemoveEvent();
    throw new Error("Failed to play audio");
  }, [unmuteAll, handleRemoveEvent]);

  // Отслеживание изменений prizes
  const previousPrizesLengthReference = useRef(prizes.length);

  useEffect(() => {
    const previousLength = previousPrizesLengthReference.current;
    const currentLength = prizes.length;

    if (previousLength !== currentLength) {
      debugger; // eslint-disable-line no-debugger
      console.log("🔍 PRIZES ИЗМЕНИЛИСЬ:", {
        было: previousLength,
        стало: currentLength,
        разница: currentLength - previousLength,
        стекТрейс: new Error().stack,
      });

      if (currentLength === 0 && previousLength > 0) {
        debugger; // eslint-disable-line no-debugger
        console.error("❌❌❌ ПРИЗЫ ОБНУЛИЛИСЬ! Было:", previousLength);
        console.trace("Stack trace при обнулении");
      }

      previousPrizesLengthReference.current = currentLength;
    }

    console.log("WaifuAlerts render state:", {
      currentMessage: !!currentMessage,
      isRouletted,
      rouletteIndex,
      prizesLength: prizes.length,
      announced,
      shouldShowRoulette:
        currentMessage &&
        !isRouletted &&
        rouletteIndex !== -1 &&
        prizes.length > 0,
      shouldShowLoading:
        currentMessage &&
        !isRouletted &&
        rouletteIndex === -1 &&
        prizes.length === 0,
      shouldShowAlert:
        currentMessage &&
        (isRouletted || prizes.length === 0) &&
        !currentMessage.waifu.isMerged,
    });
  }, [announced, currentMessage, isRouletted, prizes, rouletteIndex]);

  return (
    <div className={common.textStrokeShadow} data-testid="obs-waifu-alerts">
      <InjectStyles
        styles={`
          html, body {
            height: 100%;
            margin: 0;
          }
          
          div#root {
            min-height: 100%;
            flex-direction: column;
          }
        `}
        id="waifu-alerts-styles"
      />
      {!announced && (
        <Announce title={"WaifuRoll"} callback={() => setAnnounced(true)} />
      )}
      {currentMessage &&
        !isRouletted &&
        !currentMessage.waifu.isMerged &&
        rouletteIndex !== -1 &&
        prizes.length > 0 &&
        currentMessage.waifuHusband?.twitchUser && (
          <WaifuRoulette
            key={currentMessage.waifu.shikiId}
            shuffle={shufflePrizes}
            callback={() => {
              setIsRouletted(true);
              setRouletteIndex(-1);
            }}
            rouletteIndex={rouletteIndex}
            prizes={(prizes || []).map(p => ({
              ...p,
              id: String(p.id),
              text: p.text || "",
            }))}
            twitchUser={currentMessage.waifuHusband.twitchUser}
          />
        )}
      {currentMessage &&
        !isRouletted &&
        !currentMessage.waifu.isMerged &&
        rouletteIndex === -1 &&
        prizes.length === 0 && (
          <div
            className={styles["roulette-name-text"]}
            data-testid="status-loading-roulette"
          >
            <span>Загрузка рулетки...</span>
          </div>
        )}
      {currentMessage &&
        (isRouletted || currentMessage.waifu.isAdded) &&
        !currentMessage.waifu.isMerged && (
          <div
            id={currentMessage.waifu.shikiId}
            key={currentMessage.waifu.shikiId}
            ref={divHard}
            className={
              styles.baza + " " + animate.bounceIn + " " + animate.animated
            }
          >
            <div className={styles["alert-box"]} data-testid="waifu-alert-box">
              <img
                src={currentMessage.waifu.imageUrl}
                style={{ height: "498px", width: "320px" }}
                onLoad={() => {
                  // Очищаем таймаут, так как изображение загрузилось
                  if (imageLoadTimeoutReference.current) {
                    clearTimeout(imageLoadTimeoutReference.current);
                    imageLoadTimeoutReference.current = null;
                  }

                  setTimeout(() => {
                    divHard.current!.addEventListener("animationend", () => {
                      handleRemoveEvent();
                      setRouletteIndex(-1);
                      setIsRouletted(false);
                      shufflePrizes();
                    });

                    divHard.current!.className =
                      styles.baza +
                      " " +
                      animate.bounceOut +
                      " " +
                      animate.animated;
                  }, 7000);
                  if (!currentMessage.waifu.isAdded) {
                    sendMessage(
                      `@${currentMessage.displayName}, ${getText(currentMessage)} ${getTitle(currentMessage)}!${getHusbandText(currentMessage)}`
                    );
                  }
                }}
                onError={() => {
                  // Очищаем таймаут, так как произошла ошибка
                  if (imageLoadTimeoutReference.current) {
                    clearTimeout(imageLoadTimeoutReference.current);
                    imageLoadTimeoutReference.current = null;
                  }

                  console.error(
                    "Ошибка загрузки изображения waifu:",
                    currentMessage.waifu.imageUrl
                  );
                  handleRemoveEvent();
                  setRouletteIndex(-1);
                  setIsRouletted(false);
                }}
              />
            </div>
            {currentMessage.waifu.audioId && (
              <audio
                key={`waifu-audio-${currentMessage.waifu.shikiId}`}
                autoPlay
                controls={false}
                src={`${getApiBaseUrl()}/api/WaifuRoll/audios/${currentMessage.waifu.audioId}/stream`}
              />
            )}
            <div className={styles["alert-box"]} data-testid="waifu-alert-text">
              <span
                className="text-shadow block-text"
                style={{
                  color: "white",
                }}
              >
                <Textfit min={1} max={1500} forceSingleModeWidth>
                  {currentMessage.displayName.toUpperCase()}
                </Textfit>
              </span>
              <span
                className="text-shadow block-text"
                style={{
                  color: "cornflowerblue",
                }}
              >
                <Textfit min={1} max={1500} forceSingleModeWidth>
                  {getText(currentMessage)}
                </Textfit>
              </span>
              <span
                className="text-shadow block-text"
                style={{
                  color: "red",
                }}
              >
                <Textfit min={1} max={1500} forceSingleModeWidth>
                  {getTitle(currentMessage)}
                </Textfit>
              </span>
            </div>
          </div>
        )}
      {currentMessage &&
        (isRouletted || currentMessage.waifu.isMerged) &&
        currentMessage.waifu.isMerged && (
          <>
            {/** Confetty */}
            <SchoolPride
              width="100%"
              height="100%"
              autorun={{ speed: 30, duration: 20 * 1000 }}
              decorateOptions={(): confetti.Options => ({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ["#000000", "#FF0000", "#FFFFFF"],
              })}
            />
            <SchoolPride
              width="100%"
              height="100%"
              autorun={{ speed: 30, duration: 20 * 1000 }}
              decorateOptions={(): confetti.Options => ({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ["#000000", "#FF0000", "#FFFFFF"],
              })}
            />
            {/** Images With text */}
            <div
              className={styles["merge-container"]}
              data-testid="waifu-merge-container"
            >
              <div className={styles["merge-image"]}>
                <img
                  src={currentMessage.waifuHusband?.twitchUser?.profileImageUrl}
                ></img>
              </div>
              <div className={styles["merge-text"]}>
                <Textfit
                  className={common.textStrokeShadow}
                  style={{
                    color: "white",
                  }}
                  mode="multi"
                  min={1}
                  max={2000}
                >
                  Поздравляем{" "}
                  <span
                    className={common.textStrokeShadow}
                    style={{
                      color: currentMessage.color,
                    }}
                  >
                    {currentMessage.waifuHusband!.twitchUser?.displayName}
                  </span>{" "}
                  и{" "}
                  <span
                    className={common.textStrokeShadow}
                    style={{
                      color: getRandomColor(),
                    }}
                  >
                    {currentMessage.waifu.name}{" "}
                  </span>{" "}
                  из{" "}
                  <span
                    className={common.textStrokeShadow}
                    style={{
                      color: currentMessage.waifu.anime ? "blue" : "gold",
                    }}
                  >
                    {getTitle(currentMessage)}
                  </span>{" "}
                  с свадьбой!
                </Textfit>
              </div>
              <div className={styles["merge-image"]}>
                <img src={currentMessage.waifu.imageUrl}></img>
              </div>
            </div>
            {/** Audio */}
            <audio
              key={currentMessage.waifu.shikiId}
              controls={false}
              autoPlay
              onError={() => error()}
              onEnded={() => {
                setIsRouletted(true);
                setRouletteIndex(-1);
                unmuteAll();
                handleRemoveEvent();
              }}
              onCanPlay={event => {
                try {
                  event.currentTarget?.play();
                } catch {
                  event.currentTarget.muted = true;
                  event.currentTarget?.play();
                }
              }}
              onCanPlayThrough={() => muteAll()}
            >
              <source
                src={import.meta.env.VITE_BASE_PATH + "Alerts/svadba.mp3"}
              />
            </audio>
          </>
        )}
    </div>
  );
}

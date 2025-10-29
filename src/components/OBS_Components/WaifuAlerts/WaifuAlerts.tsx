import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import SchoolPride from "react-canvas-confetti/dist/presets/pride";
import { PrizeType } from "react-roulette-pro";
import { Textfit } from "react-textfit";

import { Host, Waifu } from "@/shared/api";
import { TelegramusHubSignalRContext as SignalRContext } from "@/shared/api/signalr-clients/TelegramusHub/SignalRHubWrapper";
import animate from "@/shared/styles/animate.module.scss";
import useTwitchStore from "@/shared/twitchStore/twitchStore";
import { arrayExcept, getRandomColor } from "@/shared/Utils";
import Announce from "@/shared/Utils/Announce/Announce";

import common from "../OBSCommon.module.scss";
import {
  getHusbandText,
  getText,
  getTitle,
  shuffleArray,
  WaifuAlertProps,
} from "./helper";
import styles from "./WaifuAlerts.module.scss";
import WaifuRoulette from "./WaifuRoulette";

enum StateStatus {
  add,
  remove,
  addPrizes,
  shuffle,
}

interface State {
  messages: WaifuAlertProps[];
  prizes: PrizeType[];
  currentMessage?: WaifuAlertProps;
  isWaifuShowing: boolean;
}

function reducer(
  state: State,
  action: { type: StateStatus; waifu?: WaifuAlertProps; prizes?: PrizeType[] }
): State {
  switch (action.type) {
    case StateStatus.add:
      if (!action.waifu) {
        return state;
      }

      if (!state.isWaifuShowing) {
        return {
          ...state,
          messages: [...state.messages],
          currentMessage: action.waifu,
          isWaifuShowing: true,
        };
      }

      return { ...state, messages: [...state.messages, action.waifu] };

    case StateStatus.remove:
      if (action.waifu === undefined) {
        return { ...state };
      }

      if (state.messages.length > 0) {
        const newArray = state.messages.filter(
          message => message.waifu.shikiId !== action.waifu!.waifu.shikiId
        );

        if (newArray.length > 0) {
          const newWaifu = newArray[0];

          return {
            ...state,
            messages: newArray,
            currentMessage: newWaifu,
            isWaifuShowing: true,
          };
        }

        return {
          ...state,
          isWaifuShowing: false,
          messages: newArray,
          currentMessage: undefined,
        };
      }

      return {
        ...state,
        messages: [],
        currentMessage: undefined,
        isWaifuShowing: false,
      };

    case StateStatus.addPrizes: {
      const excepts = arrayExcept(
        state.prizes ?? [],
        action.prizes ?? [],
        (a, b) => a.id === b.id
      );

      console.log("🔄 Adding prizes to state:", {
        existingCount: state.prizes.length,
        newCount: action.prizes?.length || 0,
        toAddCount: excepts.length,
        totalAfter: state.prizes.length + excepts.length,
      });

      excepts.forEach(prize => {
        if (prize.image) {
          const img = new Image();
          img.src = prize.image;
        }
      });

      const newState = {
        ...state,
        prizes: [...state.prizes, ...excepts],
      };

      console.log(
        "✅ Prizes state updated. Total prizes:",
        newState.prizes.length
      );

      return newState;
    }
    case StateStatus.shuffle: {
      return {
        ...state,
        prizes: shuffleArray(state.prizes ?? []),
      };
    }
  }
}

export default function WaifuAlerts() {
  const initState: State = {
    messages: [],
    isWaifuShowing: false,
    prizes: [],
  };

  const [{ currentMessage, prizes }, dispatch] = useReducer(reducer, initState);
  const [announced, setAnnounced] = useState(false);
  const divHard = useRef<HTMLDivElement>(null);
  const [isRouletted, setIsRouletted] = useState(false);
  const [rouletteIndex, setRouletteIndex] = useState(-1);
  const sendMessage = useTwitchStore(state => state.sendMsgToPyrokxnezxz);

  SignalRContext.useSignalREffect(
    "WaifuRoll",
    (message: Waifu, displayName: string, host: Host, color?: string) => {
      console.log("🎰 WaifuRoll event received:", {
        waifuId: message?.shikiId,
        waifuName: message?.name,
        displayName,
        hostId: host?.twitchId,
        hasTwitchUser: !!host?.twitchUser,
        twitchUserId: host?.twitchUser?.twitchId,
        twitchUserName: host?.twitchUser?.displayName,
        hasAvatar: !!host?.twitchUser?.profileImageUrl,
        color,
      });

      if (!host?.twitchUser) {
        console.error("❌ Host.TwitchUser is missing in WaifuRoll event!");
      }

      const parsedMessage: WaifuAlertProps = {
        waifu: message,
        displayName,
        waifuHusband: host,
        color,
      };
      handleAddEvent(parsedMessage);
    },
    []
  );

  SignalRContext.useSignalREffect(
    "addnewwaifu",
    (message: Waifu, displayName: string, color?: string) => {
      message.isAdded = true;
      const parsedMessage: WaifuAlertProps = {
        waifu: message,
        displayName,
        color,
      };
      handleAddEvent(parsedMessage);
    },
    []
  );

  SignalRContext.useSignalREffect(
    "Mergewaifu",
    (message: Waifu, host: Host, _avatar?: string, color?: string) => {
      message.isMerged = true;
      const parsedMessage: WaifuAlertProps = {
        waifu: message,
        displayName: host.twitchUser!.displayName!,
        waifuHusband: host,
        color,
      };
      handleAddEvent(parsedMessage);
    },
    []
  );

  SignalRContext.useSignalREffect(
    "UpdateWaifuPrizes",
    async (prizes: PrizeType[]) => {
      console.log("📦 UpdateWaifuPrizes event received:", {
        count: prizes?.length || 0,
        isArray: Array.isArray(prizes),
        isNull: prizes === null,
        isUndefined: prizes === undefined,
        firstPrize: prizes?.[0],
        lastPrize: prizes?.[prizes.length - 1],
      });

      if (!prizes || prizes.length === 0) {
        console.error("❌ Received empty or null prizes array!");
      }

      dispatch({ type: StateStatus.addPrizes, prizes });
    },
    []
  );

  function handleAddEvent(waifu: WaifuAlertProps) {
    console.log("Adding waifu event:", waifu);
    dispatch({ type: StateStatus.add, waifu });
  }

  function handleRemoveEvent(waifu: WaifuAlertProps) {
    dispatch({ type: StateStatus.remove, waifu });
  }

  function shufflePrizesEvent() {
    dispatch({ type: StateStatus.shuffle });
  }

  useEffect(() => {
    if (currentMessage) {
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
          setRouletteIndex(-1);
          setIsRouletted(true);
        } else if (!currentMessage.waifuHusband?.twitchUser) {
          console.warn("⚠️ TwitchUser not loaded! Skipping roulette.");
          // Если TwitchUser не загружен, показываем алерт без рулетки
          setRouletteIndex(-1);
          setIsRouletted(true);
        } else {
          setRouletteIndex(index);
        }
      } else {
        console.log("No prizes available, waiting for UpdateWaifuPrizes...");
        setRouletteIndex(-1);

        // Если призы не загружены, ждем 5 секунд и показываем алерт
        const timeout = setTimeout(() => {
          console.warn(
            "⚠️ Prizes timeout after 5 seconds! Showing alert directly."
          );
          setIsRouletted(true);
        }, 5000);

        return () => clearTimeout(timeout);
      }
    }
  }, [prizes, currentMessage]);

  useEffect(() => {
    if (currentMessage) {
      if (currentMessage.waifu.isMerged || currentMessage.waifu.isAdded) {
        setIsRouletted(true);
      }
    }
  }, [currentMessage]);

  const muteAll = useCallback(() => {
    SignalRContext.invoke("MuteAll", []);
  }, []);

  const unmuteAll = useCallback(() => {
    SignalRContext.invoke("UnmuteSessions");
  }, []);

  const error = useCallback(
    (currentMessage: WaifuAlertProps) => {
      unmuteAll();
      handleRemoveEvent(currentMessage);
      throw Error("Failed to play audio");
    },
    [unmuteAll]
  );

  // Отладочная информация
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

  return (
    <div className={common.textStrokeShadow}>
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
            callback={() => {
              setIsRouletted(true);
              setRouletteIndex(-1);
            }}
            rouletteIndex={rouletteIndex}
            prizes={prizes || []}
            twitchUser={currentMessage.waifuHusband.twitchUser}
          />
        )}
      {currentMessage &&
        !isRouletted &&
        !currentMessage.waifu.isMerged &&
        rouletteIndex === -1 &&
        prizes.length === 0 && (
          <div className={styles["roulette-name-text"]}>
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
            <div className={styles["alert-box"]}>
              <img
                src={currentMessage.waifu.imageUrl}
                style={{ height: "498px", width: "320px" }}
                onLoad={() => {
                  setTimeout(() => {
                    divHard.current!.onanimationend = () => {
                      handleRemoveEvent(currentMessage);
                      setRouletteIndex(-1);
                      setIsRouletted(false);
                      shufflePrizesEvent();
                    };

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
              />
            </div>
            <div className={styles["alert-box"]}>
              <span
                className={`${common.textStrokeShadow} text-shadow block-text`}
                style={{
                  color: "white",
                }}
              >
                <Textfit min={1} max={1500} forceSingleModeWidth>
                  {currentMessage.displayName.toUpperCase()}
                </Textfit>
              </span>
              <span
                className={`${common.textStrokeShadow} text-shadow block-text`}
                style={{
                  color: "cornflowerblue",
                }}
              >
                <Textfit min={1} max={1500} forceSingleModeWidth>
                  {getText(currentMessage)}
                </Textfit>
              </span>
              <span
                className={`${common.textStrokeShadow} text-shadow block-text`}
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
            <div className={styles["merge-container"]}>
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
              onError={() => error(currentMessage)}
              onEnded={() => {
                setIsRouletted(true);
                setRouletteIndex(-1);
                unmuteAll();
                handleRemoveEvent(currentMessage);
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

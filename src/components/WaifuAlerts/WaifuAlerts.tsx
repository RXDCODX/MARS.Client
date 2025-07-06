import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import SchoolPride from "react-canvas-confetti/dist/presets/pride";
import { PrizeType } from "react-roulette-pro";
import { Textfit } from "react-textfit";

import { SignalRContext } from "../../app";
import { Host, Waifu } from "../../shared/api/generated/baza";
import animate from "../../shared/styles/animate.module.scss";
import useTwitchStore from "../../shared/twitchStore/twitchStore";
import { arrayExcept, getRandomColor } from "../../shared/Utils";
import Announce from "../../shared/Utils/Announce/Announce";
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
  action: { type: StateStatus; waifu?: WaifuAlertProps; prizes?: PrizeType[] },
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
          (message) => message.waifu.shikiId !== action.waifu!.waifu.shikiId,
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

    case StateStatus.addPrizes:
      const excepts = arrayExcept(
        state.prizes ?? [],
        action.prizes ?? [],
        (a, b) => a.id === b.id,
      );

      excepts.forEach((prize) => {
        if (prize.image) {
          const img = new Image();
          img.src = prize.image;
        }
      });

      return {
        ...state,
        prizes: [...state.prizes, ...excepts],
      };
    case StateStatus.shuffle:
      return {
        ...state,
        prizes: shuffleArray(state.prizes ?? []),
      };
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
  const sendMessage = useTwitchStore((state) => state.sendMsgToPyrokxnezxz);

  SignalRContext.useSignalREffect(
    "waifuroll",
    (message: Waifu, displayName: string, host: Host, color?: string) => {
      const parsedMessage: WaifuAlertProps = {
        waifu: message,
        displayName,
        waifuHusband: host,
        color,
      };
      handleAddEvent(parsedMessage);
    },
    [],
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
    [],
  );

  SignalRContext.useSignalREffect(
    "Mergewaifu",
    (message: Waifu, host: Host, avatar?: string, color?: string) => {
      message.isMerged = true;
      const parsedMessage: WaifuAlertProps = {
        waifu: message,
        displayName: host.name!,
        waifuHusband: host,
        color,
        avatarUrl: avatar,
      };
      handleAddEvent(parsedMessage);
    },
    [],
  );

  SignalRContext.useSignalREffect(
    "UpdateWaifuPrizes",
    async (prizes: PrizeType[]) => {
      dispatch({ type: StateStatus.addPrizes, prizes });
    },
    [],
  );

  function handleAddEvent(waifu: WaifuAlertProps) {
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
      if (prizes) {
        const index = prizes.findIndex(
          (prize) => prize.id === currentMessage.waifu.shikiId,
        );
        setRouletteIndex(index);
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
    SignalRContext.invoke("MuteAll");
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
    [currentMessage],
  );

  return (
    <>
      {!announced && (
        <Announce title={"WaifuRoll"} callback={() => setAnnounced(true)} />
      )}
      {currentMessage && !isRouletted && rouletteIndex !== -1 && (
        <WaifuRoulette
          key={currentMessage.waifu.shikiId}
          callback={() => {
            setIsRouletted(true);
            setRouletteIndex(-1);
          }}
          rouletteIndex={rouletteIndex}
          prizes={prizes || []}
          name={currentMessage.displayName!}
          color={currentMessage.color}
        />
      )}
      {currentMessage && isRouletted && !currentMessage.waifu.isMerged && (
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
                    `@${currentMessage.displayName}, ${getText(currentMessage)} ${getTitle(currentMessage)}!${getHusbandText(currentMessage)}`,
                  );
                }
              }}
            />
          </div>
          <div className={styles["alert-box"]}>
            <span className="text-shadow block-text" style={{ color: "white" }}>
              <Textfit min={1} max={1500} forceSingleModeWidth>
                {currentMessage.displayName.toUpperCase()}
              </Textfit>
            </span>
            <span
              className="text-shadow block-text"
              style={{ color: "cornflowerblue" }}
            >
              <Textfit min={1} max={1500} forceSingleModeWidth>
                {getText(currentMessage)}
              </Textfit>
            </span>
            <span className="text-shadow block-text" style={{ color: "red" }}>
              <Textfit min={1} max={1500} forceSingleModeWidth>
                {getTitle(currentMessage)}
              </Textfit>
            </span>
          </div>
        </div>
      )}
      {currentMessage && isRouletted && currentMessage.waifu.isMerged && (
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
              <img src={currentMessage.avatarUrl}></img>
            </div>
            <div className={styles["merge-text"]}>
              <Textfit
                style={{ color: "white" }}
                mode="multi"
                min={1}
                max={2000}
              >
                Поздравляем{" "}
                <span style={{ color: currentMessage.color }}>
                  {currentMessage.waifuHusband!.name!}
                </span>{" "}
                и{" "}
                <span style={{ color: getRandomColor() }}>
                  {currentMessage.waifu.name}{" "}
                </span>{" "}
                из{" "}
                <span
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
            onCanPlay={(event) => {
              try {
                event.currentTarget?.play();
              } catch (e) {
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
    </>
  );
}

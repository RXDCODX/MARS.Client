import { useEffect, useReducer, useRef, useState } from "react";
import { PrizeType } from "react-roulette-pro";
import { Textfit } from "react-textfit";

import { SignalRContext } from "../../app";
import animate from "../../shared/styles/animate.module.scss";
import useTwitchStore from "../../shared/twitchStore/twitchStore";
import Announce from "../../shared/Utils/Announce/Announce";
import { getText, getTitle, shuffleArray, WaifuAlertProps } from "./helper";
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
  prizes?: PrizeType[];
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
      return {
        ...state,
        prizes: action.prizes,
      };
    case StateStatus.shuffle:
      return {
        ...state,
        prizes: shuffleArray(state.prizes ?? []),
      };
  }
}

export default function WaifuAlerts() {
  document.title = "WaifuAlerts";

  const initState: State = {
    messages: [],
    isWaifuShowing: false,
  };

  const [{ currentMessage, prizes }, dispatch] = useReducer(reducer, initState);
  const [announced, setAnnounced] = useState(false);
  const divHard = useRef<HTMLDivElement>(null);
  const [isRouletted, setIsRouletted] = useState(false);
  const [rouletteIndex, setRouletteIndex] = useState(-1);
  const sendMessage = useTwitchStore((state) => state.sendMsgToPyrokxnezxz);

  SignalRContext.useSignalREffect(
    "waifuroll",
    (message, displayName: string, color?: string) => {
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
    "addnewwaifu",
    (message, displayName: string, color?: string) => {
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
    (message, displayName: string, color?: string) => {
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
    "UpdateWaifuPrizes",
    (prizes: PrizeType[]) => {
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
    SignalRContext.invoke("UpdateWaifuPrizesPrizes");
  }, []);

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
          name={currentMessage.displayName}
          color={currentMessage.color}
        />
      )}
      {currentMessage && isRouletted && (
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
                sendMessage(
                  `@${currentMessage.displayName}, ${getText(currentMessage)} ${getTitle(currentMessage)}!`,
                );
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
    </>
  );
}

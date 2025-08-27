import { useEffect, useReducer, useRef, useState } from "react";

import { TelegramusHubSignalRContext as SignalRContext } from "@/shared/api/signalr-clients/TelegramusHub/SignalRHubWrapper";
import Announce from "@/shared/Utils/Announce/Announce";

import styles from "./ADHDLayout.module.scss";
import { ADHDPage } from "./ADHDPage";

interface ADHDState {
  isVisible: boolean;
  duration: number;
  remainingTime: number;
}

type ADHDAction =
  | { type: "SHOW"; payload: { duration: number } }
  | { type: "HIDE" }
  | { type: "TICK" }
  | { type: "EXTEND"; payload: { duration: number } };

const adhdReducer = (state: ADHDState, action: ADHDAction): ADHDState => {
  switch (action.type) {
    case "SHOW":
      return {
        isVisible: true,
        duration: action.payload.duration,
        remainingTime: action.payload.duration,
      };
    case "HIDE":
      return {
        ...state,
        isVisible: false,
        remainingTime: 0,
      };
    case "TICK":
      if (state.remainingTime <= 1) {
        return {
          ...state,
          isVisible: false,
          remainingTime: 0,
        };
      }
      return {
        ...state,
        remainingTime: state.remainingTime - 1,
      };
    case "EXTEND":
      return {
        ...state,
        duration: state.duration + action.payload.duration,
        remainingTime: state.remainingTime + action.payload.duration,
      };
    default:
      return state;
  }
};

const initialState: ADHDState = {
  isVisible: false,
  duration: 0,
  remainingTime: 0,
};

export function ADHDController() {
  const [announced, setAnnounced] = useState<boolean>(false);
  const [state, dispatch] = useReducer(adhdReducer, initialState);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Функция форматирования времени в формат MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleMessage = (duration: number) => {
    if (state.isVisible) {
      // Если уже показывается, продлеваем время
      dispatch({ type: "EXTEND", payload: { duration } });
    } else {
      // Если не показывается, начинаем показ
      dispatch({ type: "SHOW", payload: { duration } });
    }
  };

  // Подписка на SignalR события
  SignalRContext.useSignalREffect("adhd", handleMessage, [
    handleMessage,
    state.isVisible,
  ]);

  useEffect(() => {
    if (state.isVisible && state.remainingTime > 0) {
      intervalRef.current = setInterval(() => {
        dispatch({ type: "TICK" });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [state.isVisible, state.remainingTime]);

  return (
    <>
      {!announced && (
        <Announce title={"ADHD"} callback={() => setAnnounced(true)} />
      )}
      {state.isVisible && (
        <div className={styles.adhdControllerContainer}>
          <ADHDPage />
          <div className={styles.timerOverlay}>
            <div className={styles.timerContent}>
              <span className={styles.timerValue}>
                {formatTime(state.remainingTime)}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

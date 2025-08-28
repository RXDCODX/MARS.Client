import { useEffect, useReducer, useRef, useState } from "react";

import { TelegramusHubSignalRContext as SignalRContext } from "@/shared/api/signalr-clients/TelegramusHub/SignalRHubWrapper";
import Announce from "@/shared/Utils/Announce/Announce";

import styles from "./ADHDLayout.module.scss";
import { ADHDPage } from "./ADHDPage";

interface ADHDState {
  isVisible: boolean;
  duration: number;
  remainingTime: number;
  isExploding: boolean;
}

type ADHDAction =
  | { type: "SHOW"; payload: { duration: number } }
  | { type: "HIDE" }
  | { type: "TICK" }
  | { type: "EXTEND"; payload: { duration: number } }
  | { type: "START_EXPLOSION" }
  | { type: "FINISH_EXPLOSION" }
  | { type: "COMPLETE_EXPLOSION" };

const adhdReducer = (state: ADHDState, action: ADHDAction): ADHDState => {
  switch (action.type) {
    case "SHOW":
      return {
        isVisible: true,
        duration: action.payload.duration,
        remainingTime: action.payload.duration,
        isExploding: false,
      };
    case "HIDE":
      return {
        ...state,
        isVisible: false,
        remainingTime: 0,
        isExploding: false,
      };
    case "TICK":
      if (state.remainingTime <= 1) {
        return {
          ...state,
          isExploding: true,
        };
      }
      return {
        ...state,
        remainingTime: state.remainingTime - 1,
      };
    case "EXTEND":
      if (state.isExploding) {
        // Если идет взрыв, добавляем в очередь
        return state;
      }
      return {
        ...state,
        duration: state.duration + action.payload.duration,
        remainingTime: state.remainingTime + action.payload.duration,
      };
    case "START_EXPLOSION":
      return {
        ...state,
        isExploding: true,
      };
    case "FINISH_EXPLOSION":
      return {
        ...state,
        isVisible: false,
        remainingTime: 0,
        // isExploding остается true для продолжения воспроизведения видео
      };
    case "COMPLETE_EXPLOSION":
      return {
        ...state,
        isVisible: false,
        remainingTime: 0,
        isExploding: false,
      };
    default:
      return state;
  }
};

const initialState: ADHDState = {
  isVisible: false,
  duration: 0,
  remainingTime: 0,
  isExploding: false,
};

export function ADHDController() {
  const [announced, setAnnounced] = useState<boolean>(false);
  const [state, dispatch] = useReducer(adhdReducer, initialState);
  const [pendingExtensions, setPendingExtensions] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const explosionRef = useRef<HTMLVideoElement | null>(null);

  // Функция форматирования времени в формат MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleMessage = (duration: number) => {
    if (state.isExploding) {
      // Если идет взрыв, добавляем в очередь продлений
      setPendingExtensions(prev => [...prev, duration]);
      return;
    }

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
    state.isExploding,
  ]);

  useEffect(() => {
    if (state.isVisible && state.remainingTime > 0 && !state.isExploding) {
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
  }, [state.isVisible, state.remainingTime, state.isExploding]);

  useEffect(() => {
    if (state.isExploding && explosionRef.current) {
      const videoElement = explosionRef.current;
      videoElement.play();

      // Скрываем ADHDPage через 2 секунды после начала взрыва
      const hideTimer = setTimeout(() => {
        dispatch({ type: "FINISH_EXPLOSION" });

        // Проверяем очередь продлений
        if (pendingExtensions.length > 0) {
          const totalExtension = pendingExtensions.reduce(
            (sum, ext) => sum + ext,
            0
          );
          setPendingExtensions([]);
          dispatch({ type: "SHOW", payload: { duration: totalExtension } });
        }
      }, 2000);

      // Ждем окончания видео для полного завершения состояния
      const handleVideoEnd = () => {
        dispatch({ type: "COMPLETE_EXPLOSION" });
      };

      videoElement.addEventListener("ended", handleVideoEnd);

      return () => {
        clearTimeout(hideTimer);
        videoElement.removeEventListener("ended", handleVideoEnd);
      };
    }
  }, [state.isExploding, pendingExtensions]);

  return (
    <>
      {!announced && (
        <Announce title={"ADHD"} callback={() => setAnnounced(true)} />
      )}
      {(state.isVisible || import.meta.env.DEV) && (
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
      {state.isExploding && (
        <video
          ref={explosionRef}
          className={styles.explosionVideo}
          src="/src/components/OBS_Components/ADHDLayout/content/explosion.webm"
          autoPlay
          muted
        />
      )}
    </>
  );
}

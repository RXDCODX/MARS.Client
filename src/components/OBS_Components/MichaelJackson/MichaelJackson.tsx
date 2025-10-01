import { useCallback, useReducer } from "react";

import { TelegramusHubSignalRContext } from "@/shared/api";

import styles from "./MichaelJackson.module.scss";
import { getVideoPath } from "./videoAssets";

// Типы для циклического воспроизведения
interface VideoItem {
  id: string;
  src: string;
}

interface VideoState {
  videos: VideoItem[];
  currentIndex: number;
  currentVideo: VideoItem | null;
  isActive: boolean;
}

type VideoAction =
  | { type: "START_PLAYING" }
  | { type: "VIDEO_ENDED" }
  | { type: "STOP_PLAYING" };

// Начальное состояние
const initialState: VideoState = {
  videos: [
    { id: "michael_1", src: getVideoPath("michael_1") },
    { id: "michael_2", src: getVideoPath("michael_2") },
  ],
  currentIndex: 0,
  currentVideo: null,
  isActive: false,
};

// Reducer для управления циклическим воспроизведением
const videoReducer = (state: VideoState, action: VideoAction): VideoState => {
  switch (action.type) {
    case "START_PLAYING": {
      const currentVideo = state.videos[state.currentIndex];
      return {
        ...state,
        currentVideo,
        isActive: true,
      };
    }

    case "VIDEO_ENDED":
      return {
        ...state,
        isActive: false,
        currentVideo: null,
        currentIndex: (state.currentIndex + 1) % state.videos.length,
      };

    case "STOP_PLAYING":
      return {
        ...state,
        isActive: false,
        currentVideo: null,
      };

    default:
      return state;
  }
};

const MichaelJackson = () => {
  const [state, dispatch] = useReducer(videoReducer, initialState);

  // Обработчик SignalR события для запуска алерта
  TelegramusHubSignalRContext.useSignalREffect(
    "MichaelJackson",
    () => {
      dispatch({ type: "START_PLAYING" });
    },
    []
  );

  // Обработчик завершения видео
  const handleVideoEnded = useCallback(() => {
    dispatch({ type: "VIDEO_ENDED" });
  }, []);

  return (
    <div className={`${styles.root} ${state.isActive ? styles.active : ""}`}>
      {state.currentVideo && (
        <video
          src={state.currentVideo.src}
          className={styles.video}
          autoPlay
          controls={false}
          playsInline
          key={state.currentVideo.id}
          onEnded={handleVideoEnded}
        />
      )}
    </div>
  );
};

export default MichaelJackson;

import { useCallback, useReducer, useRef } from "react";
import { Textfit } from "react-textfit";
import { useShallow } from "zustand/react/shallow";

import { SignalRContext } from "../../app";
import { ChatMessage, Image } from "../../shared/api/generated/baza";
import animate from "../../shared/styles/animate.module.scss";
import useTwitchStore from "../../shared/twitchStore/twitchStore";
import { getRandomColor, replaceBadges } from "../../shared/Utils";
import styles from "./Message.module.scss";

enum StateStatus {
  add,
  remove,
}

interface HighliteMessageProps {
  message: ChatMessage;
  color: string;
  faceImage: Image;
}

interface State {
  messages: HighliteMessageProps[];
  currentMessage?: HighliteMessageProps;
  isMessageShowing: boolean;
}

function reducer(
  state: State,
  action: { type: StateStatus; messageProps: HighliteMessageProps },
): State {
  switch (action.type) {
    case StateStatus.add:
      if (!state.isMessageShowing) {
        return {
          messages: [...state.messages],
          currentMessage: action.messageProps,
          isMessageShowing: true,
        };
      }

      return { ...state, messages: [...state.messages, action.messageProps] };

    case StateStatus.remove:
      if (state.messages.length > 0) {
        const newArray = state.messages.filter(
          (message) => message.message.id !== action.messageProps.message.id,
        );

        if (newArray.length > 0) {
          const newMessage = newArray[0];

          return {
            messages: newArray,
            currentMessage: newMessage,
            isMessageShowing: true,
          };
        }

        return {
          messages: state.messages,
          currentMessage: undefined,
          isMessageShowing: false,
        };
      }

      return {
        currentMessage: undefined,
        isMessageShowing: false,
        messages: [],
      };
  }
}

export default function Message() {
  const [{ currentMessage }, dispatch] = useReducer(reducer, {
    messages: [],
    isMessageShowing: false,
  });
  const badges = useTwitchStore(useShallow((state) => state.badges));
  const divHard = useRef<HTMLDivElement>(null);

  SignalRContext.useSignalREffect(
    "highlite",
    (message: ChatMessage, color: string, faceUrl: Image) => {
      dispatch({
        type: StateStatus.add,
        messageProps: { message, color, faceImage: faceUrl },
      });
    },
    [],
  );

  const handleRemoveEvent = useCallback((message: HighliteMessageProps) => {
    dispatch({ type: StateStatus.remove, messageProps: message });
  }, []);

  const isWhiteColor = useCallback((color: string) => {
    if (color === "white") {
      return true;
    }

    if (color === "#ffffff") {
      return true;
    }

    if (color === "rgb(255, 255, 255)") {
      return true;
    }
  }, []);

  const getNotWhiteColor = useCallback(() => {
    while (true) {
      const color: string = getRandomColor();

      if (!isWhiteColor(color)) {
        return color;
      }
    }
  }, [isWhiteColor]);

  const isVideo = useCallback(
    () =>
      (currentMessage?.faceImage.url?.includes(".mp4") ||
        currentMessage?.faceImage.url?.includes(".webm")) ??
      false,
    [currentMessage],
  );

  return (
    <>
      {currentMessage && (
        <div
          key={currentMessage.message.id}
          id={currentMessage.message.id}
          className={
            styles.container + " " + animate.fadeIn + " " + animate.animated
          }
          ref={divHard}
        >
          <div className={styles["buble-image"]}>
            {!isVideo() && (
              <img
                alt="Image"
                src={
                  import.meta.env.VITE_BASE_PATH + currentMessage.faceImage.url
                }
                onLoad={() => {
                  setTimeout(() => {
                    divHard.current!.onanimationend = () => {
                      handleRemoveEvent(currentMessage);
                    };
                    divHard.current!.className =
                      styles.container +
                      " " +
                      animate.fadeOut +
                      " " +
                      animate.animated;
                  }, 7000);
                }}
              />
            )}
            {isVideo() && (
              <video
                src={
                  import.meta.env.VITE_BASE_PATH + currentMessage.faceImage.url
                }
                autoPlay
                controls={false}
                loop
                muted
                onLoadedMetadata={() => {
                  setTimeout(() => {
                    divHard.current!.onanimationend = () => {
                      handleRemoveEvent(currentMessage);
                    };
                    divHard.current!.className =
                      styles.container +
                      " " +
                      animate.fadeOut +
                      " " +
                      animate.animated;
                  }, 7000);
                }}
              />
            )}
          </div>
          <div
            className={styles.bubble + " " + styles.right}
            style={{
              background: `linear-gradient(135deg, ${isWhiteColor(currentMessage.color) ? getNotWhiteColor() : "white"}, ${currentMessage.color}) border-box`,
            }}
          >
            <div className={styles.talktext}>
              <div className={styles.icons}>
                {replaceBadges(badges, currentMessage.message)}
                <p
                  style={{
                    fontWeight: "bold",
                    color: `${currentMessage.color}`,
                    marginRight: "1vh",
                    marginLeft: "1vh",
                  }}
                >
                  {currentMessage.message.displayName}:
                </p>
              </div>
              {/* <span className={styles.emotes}> */}
              <Textfit
                min={1}
                max={1500}
                mode="multi"
                className={styles.emotes}
              >
                {currentMessage.message.message}
              </Textfit>
              {/* </span> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

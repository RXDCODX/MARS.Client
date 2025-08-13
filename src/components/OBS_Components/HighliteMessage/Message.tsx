import { useCallback, useReducer, useRef } from "react";
import { Textfit } from "react-textfit";
import { useShallow } from "zustand/react/shallow";

import { ChatMessage } from "@/shared/api";
import animate from "@/shared/styles/animate.module.scss";
import useTwitchStore from "@/shared/twitchStore/twitchStore";
import {
  getNotWhiteColor,
  getRandomFace,
  isWhiteColor,
  replaceBadges,
  type FaceAsset,
} from "@/shared/Utils";

import { SignalRContext } from "../../../app";
import styles from "./Message.module.scss";

enum StateStatus {
  add,
  remove,
}

export interface HighliteMessageProps {
  message: ChatMessage;
  color: string;
  faceImage: FaceAsset;
}

interface State {
  messages: HighliteMessageProps[];
  currentMessage?: HighliteMessageProps;
  isMessageShowing: boolean;
}

function reducer(
  state: State,
  action: { type: StateStatus; messageProps: HighliteMessageProps }
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
          message => message.message.id !== action.messageProps.message.id
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
  const badges = useTwitchStore(useShallow(state => state.badges));
  const divHard = useRef<HTMLDivElement>(null);

  SignalRContext.useSignalREffect(
    "Highlite",
    (message: ChatMessage, color: string) => {
      // Генерируем случайное лицо для каждого сообщения
      const faceImage = getRandomFace();
      dispatch({
        type: StateStatus.add,
        messageProps: { message, color, faceImage },
      });
    },
    []
  );

  const handleRemoveEvent = useCallback((message: HighliteMessageProps) => {
    dispatch({ type: StateStatus.remove, messageProps: message });
  }, []);

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
          {/* IMAGE */}
          <div className={styles["buble-image"]}>
            {currentMessage.faceImage.type === "image" && (
              <img
                alt={`Face: ${currentMessage.faceImage.name}`}
                src={currentMessage.faceImage.url}
                onLoad={() => {
                  setTimeout(
                    () => {
                      divHard.current!.onanimationend = () => {
                        handleRemoveEvent(currentMessage);
                      };
                      divHard.current!.className =
                        styles.container +
                        " " +
                        animate.fadeOut +
                        " " +
                        animate.animated;
                    },
                    import.meta.env.DEV ? 99999 : 7000
                  );
                }}
              />
            )}
            {currentMessage.faceImage.type === "video" && (
              <video
                src={currentMessage.faceImage.url}
                autoPlay
                controls={false}
                loop
                muted
                onLoadedMetadata={() => {
                  setTimeout(
                    () => {
                      divHard.current!.onanimationend = () => {
                        handleRemoveEvent(currentMessage);
                      };
                      divHard.current!.className =
                        styles.container +
                        " " +
                        animate.fadeOut +
                        " " +
                        animate.animated;
                    },
                    import.meta.env.DEV ? 99999 : 7000
                  );
                }}
              />
            )}
          </div>
          {/* TEXT */}
          <div
            className={styles.bubble + " " + styles.right}
            style={{
              background: `linear-gradient(135deg, ${isWhiteColor(currentMessage.color) ? getNotWhiteColor() : "white"}, ${currentMessage.color}) border-box`,
            }}
          >
            <div className={styles.talktext}>
              <div className={styles.icons}>
                <Textfit
                  min={1}
                  max={1500}
                  style={{
                    fontWeight: "bold",
                    color: `${currentMessage.color}`,
                  }}
                  mode="single"
                  forceSingleModeWidth
                  className={styles.name}
                >
                  {currentMessage.message.displayName}:
                </Textfit>
                <div>{replaceBadges(badges, currentMessage.message)}</div>
              </div>
              <Textfit
                min={1}
                max={1500}
                mode="multi"
                className={styles.emotes}
              >
                {currentMessage.message.message}
              </Textfit>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

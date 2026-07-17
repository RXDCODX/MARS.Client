import { useEffect, useRef } from "react";
import SchoolPride from "react-canvas-confetti/dist/presets/pride";
import { Textfit } from "react-textfit";

import { WaifuAlertProps } from "@/components/OBS_Components/WaifuAlerts/helper";
import animate from "@/shared/styles/animate.module.scss";

import { getMarriageDisplayText, getMergeCongratulationText, getMergeMarriageText } from "./helper";
import styles from "./WaifuAlerts.module.scss";

interface Properties {
  message: WaifuAlertProps;
  onRemove: () => void;
  onMuteAll: () => void;
  onUnmuteAll: () => void;
}

export default function WaifuMarriageAlert({
  message,
  onRemove,
  onMuteAll,
  onUnmuteAll,
}: Properties) {
  const isReminder = message.isReminder === true;
  const containerReference = useRef<HTMLDivElement>(null);
  const timeoutReference = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutReference.current) {
        clearTimeout(timeoutReference.current);
        timeoutReference.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isReminder) {
      return;
    }

    const timeout = setTimeout(() => {
      onRemove();
    }, 10_000);

    return () => clearTimeout(timeout);
  }, [isReminder, onRemove]);

  const error = () => {
    onUnmuteAll();
    onRemove();
    throw new Error("Failed to play audio");
  };

  return (
    <>
      {!isReminder && (
        <>
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
        </>
      )}
      <div
        id={message.waifu.shikiId}
        ref={containerReference}
        className={
          styles.baza + " " + animate.bounceIn + " " + animate.animated
        }
        data-testid="waifu-merge-container"
      >
        <div className={styles["alert-box"]} data-testid="waifu-merge-image">
          <img
            src={message.waifu.imageUrl}
            style={{ height: "498px", width: "320px" }}
            onLoad={() => {
              if (timeoutReference.current) {
                clearTimeout(timeoutReference.current);
                timeoutReference.current = null;
              }

              setTimeout(() => {
                containerReference.current!.addEventListener(
                  "animationend",
                  () => {
                    onRemove();
                  }
                );

                containerReference.current!.className =
                  styles.baza +
                  " " +
                  animate.bounceOut +
                  " " +
                  animate.animated;
              }, 7000);
            }}
            onError={() => {
              if (timeoutReference.current) {
                clearTimeout(timeoutReference.current);
                timeoutReference.current = null;
              }

              onRemove();
            }}
          />
        </div>
        <div className={styles["alert-box"]} data-testid="waifu-merge-text">
          <span
            className="text-shadow block-text"
            style={{ color: message.color ?? "white" }}
          >
            <Textfit min={1} max={1500} forceSingleModeWidth>
              {message.waifuHusband!.twitchUser?.displayName?.toUpperCase()}
            </Textfit>
          </span>
          <span
            className="text-shadow block-text"
            style={{ color: "cornflowerblue" }}
          >
            <Textfit min={1} max={1500} forceSingleModeWidth>
              {isReminder
                ? getMarriageDisplayText(message)
                : getMergeCongratulationText(message)}
            </Textfit>
          </span>
          {getMergeMarriageText(message) && (
            <span
              className="text-shadow block-text"
              style={{ color: "gold" }}
            >
              <Textfit min={1} max={1500} forceSingleModeWidth>
                {getMergeMarriageText(message)}
              </Textfit>
            </span>
          )}
        </div>
      </div>
      {!isReminder && (
        <audio
          key={message.waifu.shikiId}
          controls={false}
          autoPlay
          onError={() => error()}
          onEnded={() => {
            onUnmuteAll();
            onRemove();
          }}
          onCanPlay={event => {
            try {
              event.currentTarget?.play();
            } catch {
              event.currentTarget.muted = true;
              event.currentTarget?.play();
            }
          }}
          onCanPlayThrough={() => onMuteAll()}
        >
          <source
            src={import.meta.env.VITE_BASE_PATH + "Alerts/svadba.mp3"}
          />
        </audio>
      )}
    </>
  );
}

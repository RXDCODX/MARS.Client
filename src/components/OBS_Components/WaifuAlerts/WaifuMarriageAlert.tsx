/* eslint-disable simple-import-sort/imports */
import { useCallback, useEffect } from "react";
import SchoolPride from "react-canvas-confetti/dist/presets/pride";
import { Textfit } from "react-textfit";

import { WaifuAlertProps } from "@/components/OBS_Components/WaifuAlerts/helper";
import { getRandomColor } from "@/shared/Utils";

import common from "../OBSCommon.module.scss";
import { getMergeMarriageText, getTitle } from "./helper";
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

  // Для напоминания — автозакрытие через 10 секунд (нет аудио для триггера)
  useEffect(() => {
    if (!isReminder) {
      return;
    }

    const timeout = setTimeout(() => {
      onRemove();
    }, 10_000);

    return () => clearTimeout(timeout);
  }, [isReminder, onRemove]);

  const error = useCallback(() => {
    onUnmuteAll();
    onRemove();
    throw new Error("Failed to play audio");
  }, [onUnmuteAll, onRemove]);

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
        className={styles["merge-container"]}
        data-testid="waifu-merge-container"
      >
        <div className={styles["merge-image"]}>
          <img
            src={message.waifuHusband?.twitchUser?.profileImageUrl}
          />
        </div>
        <div className={styles["merge-text"]}>
          <Textfit
            className={common.textStrokeShadow}
            style={{ color: "white" }}
            mode="multi"
            min={1}
            max={2000}
          >
            {isReminder ? (
              <>
                <span
                  className={common.textStrokeShadow}
                  style={{ color: message.color }}
                >
                  {message.waifuHusband!.twitchUser?.displayName}
                </span>{" "}
                уже в браке с{" "}
                <span
                  className={common.textStrokeShadow}
                  style={{ color: getRandomColor() }}
                >
                  {message.waifu.name}{" "}
                </span>
                из{" "}
                <span
                  className={common.textStrokeShadow}
                  style={{
                    color: message.waifu.anime ? "blue" : "gold",
                  }}
                >
                  {getTitle(message)}
                </span>
              </>
            ) : (
              <>
                Поздравляем{" "}
                <span
                  className={common.textStrokeShadow}
                  style={{ color: message.color }}
                >
                  {message.waifuHusband!.twitchUser?.displayName}
                </span>{" "}
                и{" "}
                <span
                  className={common.textStrokeShadow}
                  style={{ color: getRandomColor() }}
                >
                  {message.waifu.name}{" "}
                </span>
                из{" "}
                <span
                  className={common.textStrokeShadow}
                  style={{
                    color: message.waifu.anime ? "blue" : "gold",
                  }}
                >
                  {getTitle(message)}
                </span>{" "}
                с свадьбой!
              </>
            )}
          </Textfit>
          {getMergeMarriageText(message) && (
            <Textfit
              className={common.textStrokeShadow}
              style={{ color: "gold" }}
              mode="multi"
              min={1}
              max={2000}
            >
              {getMergeMarriageText(message)}
            </Textfit>
          )}
        </div>
        <div className={styles["merge-image"]}>
          <img src={message.waifu.imageUrl} />
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

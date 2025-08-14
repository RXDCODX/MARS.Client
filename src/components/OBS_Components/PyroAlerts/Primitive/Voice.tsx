import { useCallback, useState } from "react";
import { Textfit } from "react-textfit";

import { TelegramusHubSignalRContext as SignalRContext } from "@/shared/api";
import { MediaDto } from "@/shared/api";

import styles from "./Media.module.scss";

interface Props {
  mediaInfo: MediaDto;
  callback: () => void;
  isHighPrior?: boolean;
}

export function Voice({ mediaInfo, callback, isHighPrior }: Props) {
  const { metaInfo, fileInfo, textInfo } = mediaInfo.mediaInfo;
  const bellSrc = import.meta.env.VITE_BASE_PATH + "Alerts/bell.wav";
  const voiceSrc = fileInfo.filePath;
  const imageSrc = import.meta.env.VITE_BASE_PATH + textInfo.text;

  const [isBellPlayed, setIsBellPlayed] = useState(false);

  const unmuteAll = useCallback(() => {
    if (isHighPrior) {
      SignalRContext.invoke("UnmuteSessions");
    }
  }, [isHighPrior]);

  const error = useCallback(() => {
    unmuteAll();
    callback();
    throw Error("Failed to play audio");
  }, [callback, unmuteAll]);

  const muteAll = useCallback(() => {
    if (isHighPrior) {
      SignalRContext.invoke("MuteAll", []);
    }
  }, [isHighPrior]);

  return (
    <>
      {!isBellPlayed && (
        <audio
          autoPlay
          src={bellSrc}
          onEnded={() => setIsBellPlayed(true)}
          onError={() => error()}
          onErrorCapture={() => error()}
          onCanPlayThrough={muteAll}
        />
      )}
      {isBellPlayed && (
        <audio
          autoPlay
          src={voiceSrc}
          onEnded={() => {
            unmuteAll();
            callback();
          }}
          onError={() => error()}
          onErrorCapture={() => error()}
        />
      )}
      {
        <div className={styles.container}>
          <div className={styles.block}>
            <Textfit forceSingleModeWidth max={2000} min={1}>
              всем тихо
            </Textfit>
          </div>
          <div className={styles.block_image}>
            <img src={import.meta.env.VITE_BASE_PATH + "Alerts/mute.png"} />
          </div>
          <div className={styles.block}>
            <Textfit forceSingleModeWidth max={2000} min={1}>
              Сейчас говорит <img className="emote" src={imageSrc} />
              {metaInfo.displayName}
            </Textfit>
          </div>
        </div>
      }
    </>
  );
}

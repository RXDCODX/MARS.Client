import { useCallback, useRef } from "react";

import { SignalRContext } from "../../../app";
import { MediaDto } from "../../../shared/api/generated/baza";
import { BigTextBlockForAudio } from "../../../shared/Utils/BigTexts/BigTextBlockForAudio";

interface Props {
  callback: () => void;
  mediaInfo: MediaDto;
  isHighPrior?: boolean;
}

export function Audio({ mediaInfo, callback, isHighPrior }: Props) {
  const { fileInfo, id: Id } = mediaInfo.mediaInfo;

  const audioRef = useRef<HTMLAudioElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const muteAll = useCallback(() => {
    if (isHighPrior) {
      SignalRContext.invoke("MuteAll", []);
    }
  }, [isHighPrior]);

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

  return (
    <div ref={divRef} style={{ width: "100%" }}>
      <BigTextBlockForAudio mediaInfo={mediaInfo} />
      <audio
        id={Id}
        key={Id}
        ref={audioRef}
        controls={false}
        onError={(e) => {
          console.log(
            "%c" + e,
            "color: #7289DA; -webkit-text-stroke: 2px black; font-size: 72px; font-weight: bold;",
          );
          error();
        }}
        onEnded={() => {
          unmuteAll();
          setTimeout(() => {
            callback();
          }, 1000);
        }}
        onCanPlay={(event) => {
          event.currentTarget?.play();
        }}
        onCanPlayThrough={() => muteAll()}
      >
        <source src={fileInfo.filePath} />
      </audio>
    </div>
  );
}

import { useRef } from "react";
import { MediaDto } from "../../../shared/api/generated/baza";
import { BigTextBlockForAudio } from "../../../shared/Utils/BigTexts/BigTextBlockForAudio";

interface Props {
  callback: () => void;
  mediaInfo: MediaDto;
}

export function Audio({ mediaInfo, callback }: Props) {
  const { fileInfo, id: Id } = mediaInfo.mediaInfo;

  const audioRef = useRef<HTMLAudioElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={divRef} style={{ width: "100%" }}>
      <BigTextBlockForAudio mediaInfo={mediaInfo} />
      <audio
        id={Id}
        key={Id}
        ref={audioRef}
        controls={false}
        onEnded={() => {
          setTimeout(() => {
            callback();
          }, 1000);
        }}
        onCanPlay={(event) => {
          event.currentTarget?.play();
        }}
        crossOrigin="anonymous"
      >
        <source src={fileInfo.localFilePath} />
      </audio>
    </div>
  );
}

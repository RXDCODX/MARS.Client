import { useRef } from "react";
import { MediaDto } from "../../../shared/api/generated/baza";
import { BigTextBlockForVoice } from "../../../shared/Utils";

interface Props {
  mediaInfo: MediaDto;
  callback: () => void;
}

export function Voice({ mediaInfo, callback }: Props) {
  const audioElement = useRef<HTMLAudioElement>(null);

  return (
    <>
      <BigTextBlockForVoice mediaInfo={mediaInfo} />
      <audio
        controls={false}
        autoPlay
        src={import.meta.env.VITE_BASE_PATH + "Alerts/bell.wav"}
        onEnded={() => {
          audioElement.current?.play();
        }}
      />
      <audio
        ref={audioElement}
        controls={false}
        onEnded={() => callback()}
        src={mediaInfo.mediaInfo.fileInfo.localFilePath}
      />
    </>
  );
}

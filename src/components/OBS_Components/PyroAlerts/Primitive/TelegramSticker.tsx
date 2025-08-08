import { createComponent } from "@lit/react";
import { TGSPlayer } from "@lottiefiles/lottie-player/dist/tgs-player";
import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-restricted-imports
import react from "react";

import { MediaDto } from "@/shared/api";
import useTwitchStore from "@/shared/twitchStore/twitchStore";
import {
  getCoordinates,
  getRandomRotation,
  replaceEmotes,
} from "@/shared/Utils";

import styles from "./Media.module.scss";

const Player = createComponent({
  elementClass: TGSPlayer,
  react: react,
  tagName: "tgs-player",
  displayName: "tgs-player",
});

interface Props {
  callBack: () => void;
  mediaInfo: MediaDto;
}

export default function TelegramSticker({ mediaInfo, callBack }: Props) {
  const {
    id: Id,
    metaInfo,
    positionInfo,
    textInfo,
    fileInfo,
  } = mediaInfo.mediaInfo;
  const parser = useTwitchStore(state => state.parser);
  const parserToLInk = useTwitchStore(state => state.parseToLink);

  const [style, setStyle] = useState<React.CSSProperties>(
    positionInfo.isProportion
      ? {
          maxWidth: positionInfo.width + "px",
          maxHeight: positionInfo.height + "px",
        }
      : {
          width: positionInfo.width + "px",
          height: positionInfo.height + "px",
          maxHeight: "max-content",
        }
  );

  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => callBack(), metaInfo.duration * 1000);
  }, [callBack, metaInfo.duration]);

  useEffect(() => {
    if (elementRef.current) {
      const cords = getCoordinates(elementRef.current, mediaInfo.mediaInfo);
      const rotation = getRandomRotation(mediaInfo.mediaInfo);
      setStyle(prev => ({
        ...prev,
        ...cords,
        ...rotation,
        visibility: "visible",
      }));
    }
  }, [mediaInfo.mediaInfo]);

  if (!parser || !parserToLInk) {
    return null;
  }

  return (
    <div
      id={Id}
      key={Id}
      className={styles.media}
      style={style}
      ref={elementRef}
    >
      <Player
        autoplay
        loop
        src={fileInfo.filePath}
        style={{ width: "320px", height: "320px" }}
        background="transparent"
      />
      <div className="sticker-text">
        {replaceEmotes({
          text: textInfo.text,
          parser,
          newParser: parserToLInk,
        })}
      </div>
    </div>
  );
}

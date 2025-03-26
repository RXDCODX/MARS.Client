import { createComponent } from "@lit/react";
import { TGSPlayer } from "@lottiefiles/lottie-player/dist/tgs-player";
import { CSSProperties, useEffect, useState } from "react";
// eslint-disable-next-line no-restricted-imports
import react from "react";

import { MediaDto } from "../../../shared/api/generated/baza";
import { replaceEmotes } from "../../../shared/Utils";
import styles from "./Media.module.scss";
import useTwitchStore from "../../../shared/twitchStore/twitchStore";

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

export default function TelegramSticker({
  mediaInfo: MediaInfo,
  callBack,
}: Props) {
  const {
    id: Id,
    metaInfo,
    positionInfo,
    textInfo,
    fileInfo,
  } = MediaInfo.mediaInfo;
  const fetcher = useTwitchStore((state) => state.fetcher);
  const parser = useTwitchStore((state) => state.parser);

  if (!fetcher || !parser) {
    return null;
  }

  useEffect(() => {
    setTimeout(() => callBack(), metaInfo.duration * 1000);
  }, [callBack, metaInfo.duration]);

  const [cssStyles] = useState<CSSProperties>({
    maxWidth: positionInfo.width + "px",
    maxHeight: positionInfo.height + "px",
    transform: positionInfo.isRotated
      ? `rotate(${positionInfo.rotation}deg)`
      : "",
  });

  return (
    <div id={Id} key={Id} className={styles.media} style={cssStyles}>
      <Player
        autoplay
        loop
        src={fileInfo.filePath}
        style={{ width: "320px", height: "320px" }}
        background="transparent"
      />
      <div className="sticker-text">
        {replaceEmotes({ text: textInfo.text, fetcher, parser })}
      </div>
    </div>
  );
}

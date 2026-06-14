import { createComponent } from "@lit/react";
import { TGSPlayer } from "@lottiefiles/lottie-player/dist/tgs-player";
import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-restricted-imports
import react from "react";
import { Textfit } from "react-textfit";

import {
  MediaDto,
  TelegramusHubSignalRContext as SignalRContext,
} from "@/shared/api";
import { KeyWordText } from "@/shared/components/KeyWordText";
import useTwitchStore from "@/shared/twitchStore/twitchStore";
import { getCoordinates, getRandomRotation } from "@/shared/Utils";

import common from "../../OBSCommon.module.scss";
import styles from "./Media.module.scss";
import { getMediaFrameStyle } from "./mediaFrameStyle";

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
  const frameStyle = getMediaFrameStyle(mediaInfo);

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

  const isFreezeRequired = metaInfo.isFreezeRequired;

  useEffect(() => {
    if (isFreezeRequired) {
      SignalRContext.invoke("ObsFreeze");
    }
  }, [isFreezeRequired]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isFreezeRequired) {
        SignalRContext.invoke("ObsUnfreeze");
      }
      callBack();
    }, metaInfo.duration * 1000);
    return () => clearTimeout(timer);
  }, [callBack, metaInfo.duration, isFreezeRequired]);

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
      data-testid="pyro-alert-sticker"
    >
      <Player
        autoplay
        loop
        src={fileInfo.filePath}
        style={{ width: "320px", height: "320px", ...frameStyle }}
        background="transparent"
      />
      {textInfo.text !== "" && (
        <Textfit
          className={common.textStrokeShadow}
          forceSingleModeWidth
          mode="single"
          min={30}
          style={{ justifyContent: "center", display: "flex", width: "100%" }}
        >
          <KeyWordText
            keyWordColor={textInfo.keyWordsColor}
            textColor={textInfo.textColor}
            classNameForKeyWordedSpan={styles.key_word}
            keySymbol={textInfo.keyWordSybmolDelimiter ?? "#"}
            isQuouted
            keyWordedString={textInfo.text ?? ""}
          />
        </Textfit>
      )}
    </div>
  );
}

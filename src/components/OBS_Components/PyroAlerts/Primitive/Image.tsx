import { CSSProperties, useEffect, useRef, useState } from "react";
import { Textfit } from "react-textfit";

import { MediaDto } from "@/shared/api";
import { TelegramusHubSignalRContext as SignalRContext } from "@/shared/api";
import { KeyWordText } from "@/shared/components/KeyWordText";
import { getCoordinates, getRandomRotation } from "@/shared/Utils";

import common from "../../OBSCommon.module.scss";
import styles from "./Media.module.scss";
import { getMediaFrameStyle } from "./mediaFrameStyle";

interface Props {
  callBack: () => void;
  mediaInfo: MediaDto;
}

export function Image({ mediaInfo: MediaInfo, callBack }: Props) {
  const mediaInfo = MediaInfo.mediaInfo;
  const fileInfo = mediaInfo.fileInfo;
  const id = mediaInfo.id;
  const metaInfo = mediaInfo.metaInfo;
  const textInfo = mediaInfo.textInfo;
  const positionInfo = mediaInfo.positionInfo;

  useEffect(() => {
    setTimeout(() => callBack(), metaInfo.duration * 1000);
  }, [callBack, metaInfo.duration]);

  const ref = useRef<HTMLDivElement>(null);

  const [containerStyle, setContainerStyle] = useState<CSSProperties>({
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "8px",
    position: "absolute",
    visibility: "hidden",
  });

  const [imageStyle, setImageStyle] = useState<CSSProperties>({
    maxWidth: positionInfo.width + "px",
    maxHeight: positionInfo.height + "px",
    visibility: "hidden",
  });

  const frameStyle = getMediaFrameStyle(MediaInfo);
  const mergeTransformStyles = (
    coordinates: CSSProperties,
    rotation: CSSProperties
  ): CSSProperties => {
    const coordinatesTransform = coordinates.transform?.toString() ?? "";
    const rotationTransform = rotation.transform?.toString() ?? "";
    const transform = [coordinatesTransform, rotationTransform]
      .filter(Boolean)
      .join(" ");

    return {
      ...coordinates,
      ...rotation,
      ...(transform ? { transform } : {}),
    };
  };

  return (
    <div ref={ref} className={styles["imageContainer"]} style={containerStyle}>
      {positionInfo.isProportion ? (
        <img
          id={id}
          src={fileInfo.filePath}
          key={id}
          alt={"IMAGE ERROR"}
          className={styles.media}
          style={{ ...imageStyle, ...frameStyle }}
          onLoad={event => {
            const cords = getCoordinates(event.currentTarget, mediaInfo);
            const rotation = getRandomRotation(mediaInfo);
            const size = { ...imageStyle };
            setContainerStyle(() => ({
              ...mergeTransformStyles(cords, rotation),
              visibility: "visible",
            }));
            setImageStyle(() => ({
              ...size,
              visibility: "visible",
            }));
          }}
          onError={e => {
            console.log(e);
            SignalRContext.invoke(
              "TwitchMsg",
              `RandomMem: failed to load IMAGE id=${id} path=${fileInfo.filePath}`
            );
          }}
          onErrorCapture={e => {
            console.log(e);
            SignalRContext.invoke(
              "TwitchMsg",
              `RandomMem: failed to load IMAGE id=${id} path=${fileInfo.filePath}`
            );
          }}
        />
      ) : (
        <img
          id={id}
          src={fileInfo.filePath}
          key={id}
          alt={"IMAGE ERROR"}
          className={styles.media}
          style={{ ...imageStyle, ...frameStyle }}
          onError={e => {
            console.log(
              "%c" + e,
              "color: #7289DA; -webkit-text-stroke: 2px black; font-size: 72px; font-weight: bold;"
            );
            SignalRContext.invoke(
              "TwitchMsg",
              `RandomMem: failed to load IMAGE id=${id} path=${fileInfo.filePath}`
            );
          }}
          onErrorCapture={e => {
            console.log(e);
            SignalRContext.invoke(
              "TwitchMsg",
              `RandomMem: failed to load IMAGE id=${id} path=${fileInfo.filePath}`
            );
          }}
          onLoad={event => {
            const cords = getCoordinates(event.currentTarget, mediaInfo);
            const rotation = getRandomRotation(mediaInfo);
            const size = { ...imageStyle };
            setContainerStyle(() => ({
              ...mergeTransformStyles(cords, rotation),
              visibility: "visible",
            }));
            setImageStyle(() => ({
              ...size,
              visibility: "visible",
            }));
          }}
        />
      )}
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

import { CSSProperties, useEffect, useRef, useState } from "react";

import { getCoordinates, getRandomRotation } from "../../../shared/Utils";
import styles from "./Media.module.scss";
import { MediaDto } from "../../../shared/api/generated/baza";

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

  const [style, setStyle] = useState<CSSProperties>({
    maxWidth: positionInfo.width + "px",
    maxHeight: positionInfo.height + "px",
    visibility: "hidden",
  });

  return (
    <div ref={ref} className={styles["imageContainer"]}>
      {positionInfo.isProportion ? (
        <img
          id={id}
          src={fileInfo.filePath}
          key={id}
          alt={"IMAGE ERROR"}
          className={styles.media}
          style={style}
          onLoad={(event) => {
            const cords = getCoordinates(event.currentTarget, mediaInfo);
            const rotation = getRandomRotation(mediaInfo);
            const size = { ...style };
            setStyle(() => {
              return { ...cords, ...rotation, ...size, visibility: "visible" };
            });
          }}
          onError={(e) => console.log(e)}
          onErrorCapture={(e) => console.log(e)}
        />
      ) : (
        <img
          id={id}
          src={fileInfo.filePath}
          key={id}
          alt={"IMAGE ERROR"}
          className={styles.media}
          style={style}
          onError={(e) => console.log("%c" + e, "color: #7289DA; -webkit-text-stroke: 2px black; font-size: 72px; font-weight: bold;")}
          onErrorCapture={(e) => console.log(e)}
          onLoad={(event) => {
            const cords = getCoordinates(event.currentTarget, mediaInfo);
            const rotation = getRandomRotation(mediaInfo);
            const size = { ...style };
            setStyle(() => {
              return { ...cords, ...rotation, ...size, visibility: "visible" };
            });
          }}
        />
      )}
      {textInfo.text !== "" && <div>{textInfo.text}</div>}
    </div>
  );
}

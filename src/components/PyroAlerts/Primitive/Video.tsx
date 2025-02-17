import { useCallback, useRef, useState } from "react";
import { Textfit } from "react-textfit";

import { KeyWordText } from "../../../shared/components/KeyWordText";
import { getCoordinates, getRandomRotation } from "../../../shared/Utils";
import styles from "./Media.module.scss";
import { MediaDto } from "../../../shared/api/generated/baza";

interface Props {
  callback: () => void;
  MediaInfo: MediaDto;
}

/**
 * Component for rendering a video with a text overlay.
 *
 * @param {Object} props Component props.
 * @param {MediaDto} props.MediaInfo Media info for the video.
 * @param {function} props.callback Callback function to be called when the video finishes playing.
 *
 * @returns {ReactElement} The rendered video component.
 */
export function Video({ MediaInfo, callback }: Props) {
  const { fileInfo, id, positionInfo, textInfo, metaInfo } =
    MediaInfo.mediaInfo;

  const player = useRef<HTMLVideoElement>(null);

  const [baseStyles, setBaseStyles] = useState<React.CSSProperties>(
    positionInfo.isProportion
      ? {
          maxWidth: positionInfo.width + "px",
          maxHeight: positionInfo.height + "px",
        }
      : {
          width: positionInfo.width + "px",
          height: positionInfo.height + "px",
          maxHeight: "max-content",
        },
  );

  const setStyles = useCallback(
    (styles: React.CSSProperties) => {
      setBaseStyles(styles);
    },
    [setBaseStyles],
  );

  return (
    <div id={id} className={styles.media} style={baseStyles}>
      <video
        ref={player}
        src={fileInfo.localFilePath}
        controls={false}
        autoPlay
        style={{
          maxWidth: baseStyles.maxWidth,
          maxHeight: baseStyles.maxHeight,
          width: baseStyles.width,
          height: baseStyles.height,
        }}
        onLoadedMetadata={(event) => {
          if (player.current) {
            const newCords = getCoordinates(
              player.current,
              MediaInfo.mediaInfo,
            );

            if (positionInfo.isUseOriginalWidthAndHeight) {
              setStyles({
                width: event.currentTarget.videoWidth + "px",
                height: event.currentTarget.videoHeight + "px",
              });
            }

            setStyles({
              ...baseStyles,
              ...newCords,
              ...getRandomRotation(MediaInfo.mediaInfo),
            });

            console.log(baseStyles);
          }

          if (event.currentTarget.duration < metaInfo.duration) {
            if (metaInfo.isLooped) {
              event.currentTarget.loop = true;
              setTimeout(() => {
                player.current?.pause();
                callback();
              }, metaInfo.duration * 1000);
            } else {
              event.currentTarget.onended = () => callback();
            }
          } else {
            event.currentTarget.onended = () => callback();
          }

          event.currentTarget.play();
        }}
      />
      <Textfit
        forceSingleModeWidth
        mode="single"
        min={30}
        style={{ justifyContent: "center", display: "flex" }}
      >
        <KeyWordText
          keyWordColor={textInfo.keyWordsColor}
          classNameForKeyWordedSpan={styles.key_word}
          keySymbol="#"
          isQuouted
          keyWordedString={textInfo.text ?? ""}
        />
      </Textfit>
    </div>
  );
}

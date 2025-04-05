import React, { useRef, useState, useEffect, useCallback } from "react";
import { Textfit } from "react-textfit";

import { KeyWordText } from "../../../shared/components/KeyWordText";
import { getCoordinates, getRandomRotation } from "../../../shared/Utils";
import styles from "./Media.module.scss";
import { MediaDto } from "../../../shared/api/generated/baza";
import { SignalRContext } from "../../../app";

interface Props {
  callback: () => void;
  MediaInfo: MediaDto;
  isHighPrior?: boolean;
}

export function Video({ MediaInfo, callback, isHighPrior }: Props) {
  const { fileInfo, id, positionInfo, textInfo, metaInfo } =
    MediaInfo.mediaInfo;
  const player = useRef<HTMLVideoElement>(null);
  const [backupTimer, setBackupTimer] = useState<NodeJS.Timeout>();
  const [videoProgress, setVideoProgress] = useState(0);

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

  const muteAll = useCallback(() => {
    if (isHighPrior) {
      SignalRContext.invoke("MuteAll");
    }
  }, []);

  const unmuteAll = useCallback(() => {
    if (isHighPrior) {
      SignalRContext.invoke("UnmuteSessions");
    }
  }, []);

  const handleTimeUpdate = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const video = e.currentTarget;
      const currentTime = video.currentTime;
      const duration = video.duration;
      const targetDuration = metaInfo.duration;

      setVideoProgress(currentTime);

      // Проверка достижения конца (с запасом 0.1 сек)
      if (
        duration - currentTime <= 0.1 ||
        (targetDuration && currentTime >= targetDuration - 0.1)
      ) {
        unmuteAll();
        callback();
      }
    },
    [metaInfo.duration, callback],
  );

  const handleLoadedMetadata = useCallback(
    (event: React.SyntheticEvent<HTMLVideoElement>) => {
      const video = event.currentTarget;

      if (player.current) {
        const newCords = getCoordinates(player.current, MediaInfo.mediaInfo);

        if (positionInfo.isUseOriginalWidthAndHeight) {
          setBaseStyles((prev) => ({
            ...prev,
            width: video.videoWidth + "px",
            height: video.videoHeight + "px",
          }));
        }

        setBaseStyles((prev) => ({
          ...prev,
          ...newCords,
          ...getRandomRotation(MediaInfo.mediaInfo),
        }));
      }

      // Автовоспроизведение с обработкой ошибок
      video.play().catch(() => {
        video.muted = true;
        video.play();
      });
    },
    [MediaInfo.mediaInfo, positionInfo.isUseOriginalWidthAndHeight],
  );

  useEffect(() => {
    if (!metaInfo.duration || !player.current) return;

    const timer = setTimeout(
      () => {
        if (videoProgress >= metaInfo.duration - 0.5) {
          unmuteAll();
          callback();
        }
      },
      metaInfo.duration * 1000 + 2000,
    ); // Длительность + 2 сек буфера

    setBackupTimer(timer);

    return () => {
      if (backupTimer) clearTimeout(backupTimer);
    };
  }, [videoProgress, metaInfo.duration, callback]);

  return (
    <div id={id} className={styles.media} style={baseStyles}>
      <video
        ref={player}
        src={fileInfo.filePath}
        controls={false}
        autoPlay
        style={{
          maxWidth: baseStyles.maxWidth,
          maxHeight: baseStyles.maxHeight,
          width: baseStyles.width,
          height: baseStyles.height,
        }}
        onError={callback}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onCanPlayThrough={muteAll}
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

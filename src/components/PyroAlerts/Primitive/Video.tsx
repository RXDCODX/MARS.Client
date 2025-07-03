import React, { useCallback, useEffect, useRef, useState } from "react";
import { Textfit } from "react-textfit";

import { SignalRContext } from "../../../app";
import { clampToViewport, getCoordinates, getRandomRotation } from "../../../shared/Utils";
import { MediaDto } from "../../../shared/api/generated/baza";
import { KeyWordText } from "../../../shared/components/KeyWordText";
import styles from "./Media.module.scss";

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
      SignalRContext.invoke("MuteAll", []);
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
      const isLooped = metaInfo.isLooped;

      setVideoProgress(currentTime);

      // Проверка достижения конца (с запасом 0.1 сек)
      if (
        (!isLooped && duration - currentTime <= 0.1) ||
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
        muteAll();
        const newCords = getCoordinates(player.current, MediaInfo.mediaInfo);

        if (positionInfo.isUseOriginalWidthAndHeight) {
          setBaseStyles((prev) => ({
            ...prev,
            width: video.videoWidth + "px",
            height: video.videoHeight + "px",
          }));
        }

        // Корректируем координаты, чтобы не выходило за экран
        const rect = video.getBoundingClientRect();
        const width = rect.width || video.videoWidth || positionInfo.width;
        const height = rect.height || video.videoHeight || positionInfo.height;
        const left = parseInt((newCords.left || '0').toString());
        const top = parseInt((newCords.top || '0').toString());
        const clamped = clampToViewport(left, top, width, height);

        setBaseStyles((prev) => ({
          ...prev,
          ...newCords,
          ...getRandomRotation(MediaInfo.mediaInfo),
          ...clamped,
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
      metaInfo.duration * 1000 + 200,
    ); // Длительность + 2 сек буфера

    setBackupTimer(timer);

    return () => {
      if (backupTimer) clearTimeout(backupTimer);
    };
  }, [videoProgress, metaInfo.duration, callback]);

  useEffect(() => {
    setTimeout(() => {
      unmuteAll();
      callback();
    }, metaInfo.duration * 1000 + 1000);
  }, []);

  return (
    <div id={id} className={styles.media} style={baseStyles}>
      <video
        ref={player}
        src={fileInfo.filePath}
        controls={false}
        autoPlay
        loop={metaInfo.isLooped}
        style={{
          maxWidth: baseStyles.maxWidth,
          maxHeight: baseStyles.maxHeight,
          width: baseStyles.width,
          height: baseStyles.height,
        }}
        onError={(e) => {
          console.log(
            "%c" + e,
            "color: #7289DA; -webkit-text-stroke: 2px black; font-size: 72px; font-weight: bold;",
          );
          unmuteAll();
          callback();
        }}
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

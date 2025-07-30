import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Textfit } from "react-textfit";

import { SignalRContext } from "../../../../app";
import {
  MediaDto,
  MediaFileInfo,
  MediaInfo,
  MediaMetaInfo,
  MediaPositionInfo,
  MediaStylesInfo,
  MediaTextInfo,
} from "../../../../shared/api/generated/Api";
import { KeyWordText } from "../../../../shared/components/KeyWordText";
import { getCoordinates, getRandomRotation } from "../../../../shared/Utils";
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
  const [, setBackupTimer] = useState<NodeJS.Timeout>();
  const [videoProgress, setVideoProgress] = useState(0);

  // Мемоизируем positionInfo для стабильности зависимостей
  const memoizedPositionInfo = useMemo<MediaPositionInfo>(
    () => ({
      isUseOriginalWidthAndHeight: positionInfo.isUseOriginalWidthAndHeight,
      isProportion: positionInfo.isProportion,
      width: positionInfo.width,
      height: positionInfo.height,
      isHorizontalCenter: positionInfo.isHorizontalCenter,
      isResizeRequires: positionInfo.isResizeRequires,
      isRotated: positionInfo.isRotated,
      isVerticallCenter: positionInfo.isVerticallCenter,
      randomCoordinates: positionInfo.randomCoordinates,
      rotation: positionInfo.rotation,
      xCoordinate: positionInfo.xCoordinate,
      yCoordinate: positionInfo.yCoordinate,
    }),
    [
      positionInfo.isUseOriginalWidthAndHeight,
      positionInfo.isProportion,
      positionInfo.width,
      positionInfo.height,
      positionInfo.isHorizontalCenter,
      positionInfo.isResizeRequires,
      positionInfo.isRotated,
      positionInfo.isVerticallCenter,
      positionInfo.randomCoordinates,
      positionInfo.rotation,
      positionInfo.xCoordinate,
      positionInfo.yCoordinate,
    ],
  );

  const initialStyles = useMemo<React.CSSProperties>(
    () =>
      memoizedPositionInfo.isProportion
        ? {
            maxWidth: memoizedPositionInfo.width + "px",
            maxHeight: memoizedPositionInfo.height + "px",
          }
        : {
            width: memoizedPositionInfo.width + "px",
            height: memoizedPositionInfo.height + "px",
            maxHeight: "max-content",
          },
    [memoizedPositionInfo],
  );

  const [baseStyles, setBaseStyles] =
    useState<React.CSSProperties>(initialStyles);

  // Мемоизируем metaInfo для стабильности зависимостей
  const memoizedMetaInfo = useMemo(
    () => ({
      duration: metaInfo.duration,
      isLooped: metaInfo.isLooped,
    }),
    [metaInfo.duration, metaInfo.isLooped],
  );

  // Мемоизируем MediaInfo для стабильности зависимостей
  const memoizedMediaInfo = useMemo(
    () => ({
      id: MediaInfo.mediaInfo.id,
      filePath: fileInfo.filePath,
    }),
    [MediaInfo.mediaInfo.id, fileInfo.filePath],
  );

  // Мемоизируем positionInfo для функций getCoordinates и getRandomRotation
  const memoizedPositionInfoForFunctions = useMemo(
    () => memoizedPositionInfo,
    [memoizedPositionInfo],
  );

  // Мемоизируем id для стабильности зависимостей
  const memoizedId = useMemo(
    () => MediaInfo.mediaInfo.id,
    [MediaInfo.mediaInfo.id],
  );

  // Мемоизируем textInfo для стабильности зависимостей
  const memoizedTextInfo = useMemo(
    () => ({
      keyWordsColor: textInfo.keyWordsColor,
      text: textInfo.text,
    }),
    [textInfo.keyWordsColor, textInfo.text],
  );

  // Обновляем baseStyles при изменении initialStyles
  useEffect(() => {
    setBaseStyles(initialStyles);
  }, [initialStyles]);

  const muteAll = useCallback(() => {
    if (isHighPrior) {
      SignalRContext.invoke("MuteAll", []);
    }
  }, [isHighPrior]);

  const unmuteAll = useCallback(() => {
    if (isHighPrior) {
      SignalRContext.invoke("UnmuteSessions");
    }
  }, [isHighPrior]);

  const handleTimeUpdate = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const video = e.currentTarget;
      const currentTime = video.currentTime;
      const duration = video.duration;
      const targetDuration = memoizedMetaInfo.duration;
      const isLooped = memoizedMetaInfo.isLooped;

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
    [memoizedMetaInfo, unmuteAll, callback],
  );

  const handleLoadedMetadata = useCallback(
    (event: React.SyntheticEvent<HTMLVideoElement>) => {
      const video = event.currentTarget;

      if (player.current) {
        muteAll();
        const fakeMediaInfo: MediaInfo = {
          id: "stub",
          fileInfo: {} as MediaFileInfo,
          metaInfo: {} as MediaMetaInfo,
          stylesInfo: {} as MediaStylesInfo,
          textInfo: {} as MediaTextInfo,
          positionInfo: memoizedPositionInfoForFunctions,
        };
        const newCords = getCoordinates(player.current, fakeMediaInfo);
        const randomRotation = getRandomRotation(fakeMediaInfo);

        if (memoizedPositionInfo.isUseOriginalWidthAndHeight) {
          setBaseStyles((prev) => ({
            ...prev,
            width: video.videoWidth + "px",
            height: video.videoHeight + "px",
          }));
        }

        setBaseStyles((prev) => ({
          ...prev,
          ...newCords,
          ...randomRotation,
        }));
      }

      // Автовоспроизведение с обработкой ошибок
      video.play().catch(() => {
        video.muted = true;
        video.play();
      });
    },
    [
      memoizedPositionInfo.isUseOriginalWidthAndHeight,
      memoizedPositionInfoForFunctions,
      muteAll,
    ],
  );

  useEffect(() => {
    if (!memoizedMetaInfo.duration || !player.current) return;

    const timer = setTimeout(
      () => {
        if (videoProgress >= memoizedMetaInfo.duration - 0.5) {
          unmuteAll();
          callback();
        }
      },
      memoizedMetaInfo.duration * 1000 + 200,
    ); // Длительность + 2 сек буфера

    setBackupTimer(timer);

    return () => {
      clearTimeout(timer);
    };
  }, [videoProgress, memoizedMetaInfo, callback, unmuteAll]);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        unmuteAll();
        callback();
      },
      memoizedMetaInfo.duration * 1000 + 1000,
    );

    return () => {
      clearTimeout(timer);
    };
  }, [callback, memoizedMetaInfo, unmuteAll]);

  return (
    <div id={memoizedId} key={id} className={styles.media} style={baseStyles}>
      <video
        ref={player}
        src={memoizedMediaInfo.filePath}
        controls={false}
        autoPlay
        loop={memoizedMetaInfo.isLooped}
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
          keyWordColor={memoizedTextInfo.keyWordsColor}
          classNameForKeyWordedSpan={styles.key_word}
          keySymbol="#"
          isQuouted
          keyWordedString={memoizedTextInfo.text ?? ""}
        />
      </Textfit>
    </div>
  );
}

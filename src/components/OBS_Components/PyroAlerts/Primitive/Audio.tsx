import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  MediaDto,
  TelegramusHubSignalRContext as SignalRContext,
} from "@/shared/api";
import { BigTextBlockForAudio } from "@/shared/Utils/BigTexts/BigTextBlockForAudio";

const blobUrlCache = new Map<string, string>();
const fetchCache = new Map<string, Promise<Blob>>();

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

interface Props {
  callback: () => void;
  mediaInfo: MediaDto;
  isHighPrior?: boolean;
}

export function Audio({ mediaInfo, callback, isHighPrior }: Props) {
  const { fileInfo, id: Id, metaInfo } = mediaInfo.mediaInfo;

  const audioRef = useRef<HTMLAudioElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);

  const [blobUrl, setBlobUrl] = useState<string | null>(
    () => blobUrlCache.get(fileInfo.filePath) ?? null
  );

  const fetchPromise = useMemo(() => {
    const cached = fetchCache.get(fileInfo.filePath);
    if (cached) return cached;

    const promise = fetch(fileInfo.filePath).then(r => {
      if (!r.ok) throw new Error(`Failed to fetch audio: ${r.status}`);
      return r.blob();
    });
    fetchCache.set(fileInfo.filePath, promise);
    return promise;
  }, [fileInfo.filePath]);

  useEffect(() => {
    const controller = new AbortController();

    if (blobUrlCache.has(fileInfo.filePath)) {
      setBlobUrl(blobUrlCache.get(fileInfo.filePath)!);
      return;
    }

    fetchPromise
      .then(blob => {
        if (controller.signal.aborted) return;
        const url = URL.createObjectURL(blob);
        blobUrlCache.set(fileInfo.filePath, url);
        setBlobUrl(url);
      })
      .catch(err => {
        if (!controller.signal.aborted) {
          console.warn("Failed to fetch audio blob:", err);
        }
      });

    return () => {
      controller.abort();
      const url = blobUrlCache.get(fileInfo.filePath);
      if (url) {
        URL.revokeObjectURL(url);
        blobUrlCache.delete(fileInfo.filePath);
      }
    };
  }, [fileInfo.filePath, fetchPromise]);

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

  const isFreezeRequired = mediaInfo.mediaInfo.metaInfo.isFreezeRequired;

  const freeze = useCallback(() => {
    if (isFreezeRequired) {
      SignalRContext.invoke("ObsFreeze");
    }
  }, [isFreezeRequired]);

  const unfreeze = useCallback(() => {
    if (isFreezeRequired) {
      SignalRContext.invoke("ObsUnfreeze");
    }
  }, [isFreezeRequired]);

  const setupAudioContext = useCallback(() => {
    if (!audioRef.current) return;

    try {
      // Создаем AudioContext если его еще нет
      if (!audioContextRef.current) {
        const AudioContextClass =
          window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          audioContextRef.current = new AudioContextClass();
        } else {
          throw new Error("AudioContext is not supported in this browser");
        }
      }

      // Создаем источник из audio элемента
      if (!sourceNodeRef.current) {
        sourceNodeRef.current =
          audioContextRef.current.createMediaElementSource(audioRef.current);
      }

      // Создаем GainNode если его еще нет
      if (!gainNodeRef.current) {
        gainNodeRef.current = audioContextRef.current.createGain();
      }

      // Подключаем цепочку: источник -> GainNode -> выход
      sourceNodeRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(audioContextRef.current.destination);

      // Устанавливаем громкость (поддерживаем значения больше 100%)
      const volume = metaInfo.volume / 100;
      gainNodeRef.current.gain.value = volume;
    } catch (error) {
      console.warn("Failed to setup AudioContext:", error);
    }
  }, [metaInfo.volume]);

  const error = useCallback(() => {
    unmuteAll();
    unfreeze();
    callback();
    throw Error("Failed to play audio");
  }, [callback, unfreeze, unmuteAll]);

  // Очистка ресурсов при размонтировании
  useEffect(
    () => () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    },
    []
  );

  return (
    <div ref={divRef} style={{ width: "100%" }} data-testid="pyro-alert-audio">
      {mediaInfo.mediaInfo.stylesInfo.isShowLetterbox && (
        <BigTextBlockForAudio content={mediaInfo} />
      )}
      {blobUrl && (
        <audio
          id={Id}
          key={Id}
          ref={audioRef}
          controls={false}
          src={blobUrl}
          onError={e => {
            console.error(e);
            SignalRContext.invoke(
              "LogError",
              `RandomMem: failed to play AUDIO id=${Id} path=${fileInfo.filePath}`
            );
            error();
          }}
          onEnded={() => {
            unmuteAll();
            unfreeze();
            setTimeout(() => {
              callback();
            }, 1000);
          }}
          onCanPlay={event => {
            setupAudioContext();
            event.currentTarget.volume = 1.0;
            event.currentTarget?.play();
          }}
          onCanPlayThrough={() => {
            muteAll();
            freeze();
          }}
        />
      )}
    </div>
  );
}

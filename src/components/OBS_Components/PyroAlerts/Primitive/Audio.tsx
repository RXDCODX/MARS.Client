import { useCallback, useEffect, useRef } from "react";

import {
  MediaDto,
  TelegramusHubSignalRContext as SignalRContext,
} from "@/shared/api";
import { BigTextBlockForAudio } from "@/shared/Utils/BigTexts/BigTextBlockForAudio";

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
    callback();
    throw Error("Failed to play audio");
  }, [callback, unmuteAll]);

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
    <div ref={divRef} style={{ width: "100%" }}>
      <BigTextBlockForAudio content={mediaInfo} />
      <audio
        id={Id}
        key={Id}
        ref={audioRef}
        controls={false}
        onError={e => {
          console.log(
            "%c" + e,
            "color: #7289DA; -webkit-text-stroke: 2px black; font-size: 72px; font-weight: bold;"
          );
          error();
        }}
        onEnded={() => {
          unmuteAll();
          setTimeout(() => {
            callback();
          }, 1000);
        }}
        onCanPlay={event => {
          // Настраиваем AudioContext и GainNode
          setupAudioContext();

          // Устанавливаем базовую громкость на 1.0, так как реальная громкость контролируется GainNode
          event.currentTarget.volume = 1.0;
          event.currentTarget?.play();
        }}
        onCanPlayThrough={() => muteAll()}
      >
        <source src={fileInfo.filePath} />
      </audio>
    </div>
  );
}

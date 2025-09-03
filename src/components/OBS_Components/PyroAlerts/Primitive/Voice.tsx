import { useCallback, useEffect, useRef, useState } from "react";
import { Textfit } from "react-textfit";

import { TelegramusHubSignalRContext as SignalRContext } from "@/shared/api";
import { MediaDto } from "@/shared/api";

import styles from "./Media.module.scss";

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

interface Props {
  mediaInfo: MediaDto;
  callback: () => void;
  isHighPrior?: boolean;
}

export function Voice({ mediaInfo, callback, isHighPrior }: Props) {
  const { metaInfo, fileInfo, textInfo } = mediaInfo.mediaInfo;
  const bellSrc = import.meta.env.VITE_BASE_PATH + "Alerts/bell.wav";
  const voiceSrc = fileInfo.filePath;
  const imageSrc = import.meta.env.VITE_BASE_PATH + textInfo.text;

  const [isBellPlayed, setIsBellPlayed] = useState(false);
  const bellAudioRef = useRef<HTMLAudioElement>(null);
  const voiceAudioRef = useRef<HTMLAudioElement>(null);
  const bellAudioContextRef = useRef<AudioContext | null>(null);
  const voiceAudioContextRef = useRef<AudioContext | null>(null);
  const bellGainNodeRef = useRef<GainNode | null>(null);
  const voiceGainNodeRef = useRef<GainNode | null>(null);
  const bellSourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const voiceSourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);

  const unmuteAll = useCallback(() => {
    if (isHighPrior) {
      SignalRContext.invoke("UnmuteSessions");
    }
  }, [isHighPrior]);

  const error = useCallback(() => {
    unmuteAll();
    callback();
    throw Error("Failed to play audio");
  }, [callback, unmuteAll]);

  const muteAll = useCallback(() => {
    if (isHighPrior) {
      SignalRContext.invoke("MuteAll", []);
    }
  }, [isHighPrior]);

  const setupBellAudioContext = useCallback(() => {
    if (!bellAudioRef.current) return;

    try {
      // Создаем AudioContext если его еще нет
      if (!bellAudioContextRef.current) {
        const AudioContextClass =
          window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          bellAudioContextRef.current = new AudioContextClass();
        } else {
          throw new Error("AudioContext is not supported in this browser");
        }
      }

      // Создаем источник из audio элемента
      if (!bellSourceNodeRef.current) {
        bellSourceNodeRef.current =
          bellAudioContextRef.current.createMediaElementSource(
            bellAudioRef.current
          );
      }

      // Создаем GainNode если его еще нет
      if (!bellGainNodeRef.current) {
        bellGainNodeRef.current = bellAudioContextRef.current.createGain();
      }

      // Подключаем цепочку: источник -> GainNode -> выход
      bellSourceNodeRef.current.connect(bellGainNodeRef.current);
      bellGainNodeRef.current.connect(bellAudioContextRef.current.destination);

      // Устанавливаем громкость (поддерживаем значения больше 100%)
      const volume = metaInfo.volume / 100;
      bellGainNodeRef.current.gain.value = volume;
    } catch (error) {
      console.warn("Failed to setup AudioContext for bell:", error);
    }
  }, [metaInfo.volume]);

  const setupVoiceAudioContext = useCallback(() => {
    if (!voiceAudioRef.current) return;

    try {
      // Создаем AudioContext если его еще нет
      if (!voiceAudioContextRef.current) {
        const AudioContextClass =
          window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          voiceAudioContextRef.current = new AudioContextClass();
        } else {
          throw new Error("AudioContext is not supported in this browser");
        }
      }

      // Создаем источник из audio элемента
      if (!voiceSourceNodeRef.current) {
        voiceSourceNodeRef.current =
          voiceAudioContextRef.current.createMediaElementSource(
            voiceAudioRef.current
          );
      }

      // Создаем GainNode если его еще нет
      if (!voiceGainNodeRef.current) {
        voiceGainNodeRef.current = voiceAudioContextRef.current.createGain();
      }

      // Подключаем цепочку: источник -> GainNode -> выход
      voiceSourceNodeRef.current.connect(voiceGainNodeRef.current);
      voiceGainNodeRef.current.connect(
        voiceAudioContextRef.current.destination
      );

      // Устанавливаем громкость (поддерживаем значения больше 100%)
      const volume = metaInfo.volume / 100;
      voiceGainNodeRef.current.gain.value = volume;
    } catch (error) {
      console.warn("Failed to setup AudioContext for voice:", error);
    }
  }, [metaInfo.volume]);

  // Очистка ресурсов при размонтировании
  useEffect(
    () => () => {
      if (bellAudioContextRef.current) {
        bellAudioContextRef.current.close();
      }
      if (voiceAudioContextRef.current) {
        voiceAudioContextRef.current.close();
      }
    },
    []
  );

  return (
    <>
      {!isBellPlayed && (
        <audio
          ref={bellAudioRef}
          autoPlay
          src={bellSrc}
          onCanPlay={e => {
            // Настраиваем AudioContext и GainNode
            setupBellAudioContext();

            // Устанавливаем базовую громкость на 1.0, так как реальная громкость контролируется GainNode
            e.currentTarget.volume = 1.0;
          }}
          onEnded={() => setIsBellPlayed(true)}
          onError={() => error()}
          onErrorCapture={() => error()}
          onCanPlayThrough={muteAll}
        />
      )}
      {isBellPlayed && (
        <audio
          ref={voiceAudioRef}
          autoPlay
          src={voiceSrc}
          onCanPlay={e => {
            // Настраиваем AudioContext и GainNode
            setupVoiceAudioContext();

            // Устанавливаем базовую громкость на 1.0, так как реальная громкость контролируется GainNode
            e.currentTarget.volume = 1.0;
          }}
          onEnded={() => {
            unmuteAll();
            callback();
          }}
          onError={() => error()}
          onErrorCapture={() => error()}
        />
      )}
      {
        <div className={styles.container}>
          <div className={styles.block}>
            <Textfit forceSingleModeWidth max={2000} min={1}>
              всем тихо
            </Textfit>
          </div>
          <div className={styles.block_image}>
            <img src={import.meta.env.VITE_BASE_PATH + "Alerts/mute.png"} />
          </div>
          <div className={styles.block}>
            <Textfit forceSingleModeWidth max={2000} min={1}>
              Сейчас говорит <img className="emote" src={imageSrc} />
              {metaInfo.displayName}
            </Textfit>
          </div>
        </div>
      }
    </>
  );
}

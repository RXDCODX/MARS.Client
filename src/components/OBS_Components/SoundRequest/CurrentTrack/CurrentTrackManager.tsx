import { useCallback, useEffect, useMemo, useState } from "react";

import { TunaMusicData, TunaMusicDTO } from "@/shared/api/generated/Api";

import { SignalRContext } from ".";
import CurrentTrack from "./CurrentTrack";

const defaultValue: TunaMusicData & { isDefaultValue: boolean } = {
  album_url: "",
  artists: [],
  cover: "",
  duration: 0,
  progress: 0,
  status: "",
  title: "Not Playing",
  isDefaultValue: true,
};

interface TrackInfo {
  track: TunaMusicData & { isDefaultValue: boolean };
  count: number;
  shouldAnimate: boolean;
}

export default function CurrentTrackManager() {
  const [counter, setCounter] = useState(0);
  const [track, setTrack] = useState<TrackInfo>({
    track: defaultValue,
    count: counter,
    shouldAnimate: false,
  });

  const changeTrack = useCallback(
    (data: TunaMusicData) => {
      // Сначала запускаем анимацию
      setCounter(prev => prev + 1);
      setTrack({
        track: { ...data, isDefaultValue: false },
        count: counter,
        shouldAnimate: true,
      });

      // Через время анимации меняем трек
      setTimeout(() => {
        setTrack(prev => ({
          ...prev,
          shouldAnimate: false,
        }));
      }, 3500); // Общее время анимации (слайды + NOW PLAYING + финальная анимация)
    },
    [counter]
  );

  const trackKey = useMemo(
    () =>
      `${track.track.artists.join(", ")}-${track.track.title}-${track.count}`,
    [track.track.artists, track.track.title, track.count]
  );

  SignalRContext.useSignalREffect(
    "TunaMusicInfo",
    (data: TunaMusicDTO) => {
      // Проверяем, изменился ли трек
      const isNewTrack =
        data.data.artists.join(", ") !== track.track.artists.join(", ") ||
        data.data.title !== track.track.title;

      if (isNewTrack) {
        changeTrack(data.data);
        return;
      }

      // Если трек тот же, просто обновляем данные без анимации
      setTrack(prev => ({
        ...prev,
        track: { ...data.data, isDefaultValue: false },
      }));
    },
    [track.track.artists, track.track.title, changeTrack]
  );

  useEffect(() => {
    console.log(counter);
  }, [counter]);

  return (
    !track.track.isDefaultValue &&
    track.track.status !== "stopped" && (
      <CurrentTrack
        track={track.track}
        key={trackKey}
        shouldAnimate={track.shouldAnimate}
      />
    )
  );
}

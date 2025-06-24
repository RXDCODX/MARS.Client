import { useCallback, useState } from "react";
import { SignalRContext } from ".";
import {
  TunaMusicData,
  TunaMusicDTO,
} from "../../../shared/api/generated/baza";
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
}

export default function CurrentTrackManager() {
  const [counter, setCounter] = useState(0);
  const [track, setTrack] = useState<TrackInfo>({
    track: defaultValue,
    count: counter,
  });

  const changeTrack = useCallback(
    (data: TunaMusicData) => {
      setTrack({ track: { ...data, isDefaultValue: false }, count: counter });
    },
    [counter],
  );

  SignalRContext.useSignalREffect(
    "TunaMusicInfo",
    (data: TunaMusicDTO) => {
      if (data.data.artists.join(", ") !== track.track.artists.join(", ")) {
        setCounter((prev) => prev + 1);
        changeTrack(data.data);
        return;
      }

      if (data.data.title !== track.track.title) {
        setCounter((prev) => prev + 1);
        changeTrack(data.data);
        return;
      }

      setTrack((prev) => ({
        ...prev,
        track: { ...data.data, isDefaultValue: false },
      }));
    },
    [],
  );

  return track.track.isDefaultValue ? null : (
    <CurrentTrack track={track.track} key={track.count} />
  );
}

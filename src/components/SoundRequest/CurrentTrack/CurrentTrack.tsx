import { useState } from "react";
import {
  TunaMusicData,
  TunaMusicDTO,
} from "../../../shared/api/generated/baza";
import { SignalRContext } from ".";
import styles from "./CurrentTrack.module.scss";

const defaultValue: TunaMusicData = {
  album_url: "",
  artists: [],
  cover: "",
  duration: 0,
  progress: 0,
  status: "",
  title: "Not Playing",
};

export default function CurrentTrack() {
  const [track, setTrack] = useState<TunaMusicData>(defaultValue);

  SignalRContext.useSignalREffect(
    "TunaMusicInfo",
    (data: TunaMusicDTO) => {
      setTrack(data.data);
    },
    [],
  );

  const formatTime = (timeInMs: number) => {
    const totalSeconds = Math.floor(timeInMs / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = Math.floor(totalSeconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const progressPercent =
    track.duration > 0 ? (track.progress / track.duration) * 100 : 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.coverContainer}>
          {track.cover ? (
            <img src={track.cover} alt="Album cover" className={styles.cover} />
          ) : (
            <div className={styles.coverPlaceholder}>
              <span className={styles.musicIcon}>🎵</span>
            </div>
          )}
        </div>

        <div className={styles.trackInfo}>
          <h3 className={styles.title}> {track.title}</h3>
          <p className={styles.artists}>
            {track.artists.join(", ") || "Unknown Artist"}
          </p>

          <div className={styles.progressContainer}>
            <div
              className={styles.progressBar}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className={styles.timeInfo}>
            <span>{formatTime(track.progress)}</span>
            <span>{formatTime(track.duration - track.progress)}</span>
            <span>{formatTime(track.duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

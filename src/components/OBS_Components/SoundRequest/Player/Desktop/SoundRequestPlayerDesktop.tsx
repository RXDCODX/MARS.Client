import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Square,
  Video,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button } from "react-bootstrap";

import { useSoundRequestPlayer } from "../hooks";
import { formatDuration } from "../utils";
import { ElasticSlider } from "./ElasticSlider";
import styles from "./SoundRequestPlayerDesktop.module.scss";

function parseIsoDurationToSeconds(duration?: string): number {
  if (!duration) return 0;
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const h = parseInt(match[1] || "0");
  const m = parseInt(match[2] || "0");
  const s = parseInt(match[3] || "0");
  return h * 3600 + m * 60 + s;
}

export function SoundRequestPlayerDesktop() {
  const {
    playerState,
    queue,
    loading,
    volume,
    isPlaying,
    history,
    // handlePlayNext, // пока не используется в десктоп-версии
    handleTogglePlayPause,
    handleStop,
    handleSkip,
    handleVolumeChange,
    handleMute,
    handlePlayTrackFromQueue,
  } = useSoundRequestPlayer();

  const current = playerState?.currentTrack || null;
  const durationSec = parseIsoDurationToSeconds(
    playerState?.currentTrackDuration || "PT0S"
  );

  const [progress, setProgress] = useState(0); // 0..1
  const startTimeRef = useRef<number>(0);
  const pausedAtRef = useRef<number>(0);
  const wasPausedRef = useRef<boolean>(false);
  const rafRef = useRef<number | null>(null);

  // Reset/start progress when track changes
  useEffect(() => {
    if (!current || !durationSec) {
      setProgress(0);
      return;
    }
    startTimeRef.current = Date.now();
    wasPausedRef.current = false;
    pausedAtRef.current = 0;
    setProgress(0);
  }, [current, current?.id, durationSec]);

  // Drive progress similar to CurrentTrack
  useEffect(() => {
    if (!current || !durationSec) return;

    const loop = () => {
      const elapsedSec = (Date.now() - startTimeRef.current) / 1000;
      const pr = Math.min(elapsedSec / durationSec, 1);
      setProgress(pr);
      if (pr < 1 && isPlaying) {
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    if (isPlaying) {
      if (wasPausedRef.current) {
        const pauseDelta = Date.now() - pausedAtRef.current;
        startTimeRef.current += pauseDelta;
        wasPausedRef.current = false;
      }
      rafRef.current = requestAnimationFrame(loop);
    } else {
      if (!wasPausedRef.current) {
        wasPausedRef.current = true;
        pausedAtRef.current = Date.now();
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [isPlaying, current, current?.id, durationSec]);

  // Build lists: sticky current + rest of queue
  const queueWithoutCurrent = useMemo(() => {
    const currentId = current?.id;
    return queue.filter(x => x.id !== currentId);
  }, [queue, current?.id]);

  const handlePrev = useCallback(() => {
    const prev = history?.[0];
    if (prev?.id) handlePlayTrackFromQueue(prev.id);
  }, [handlePlayTrackFromQueue, history]);

  const progressStyle = {
    "--track-progress": `${Math.round(progress * 100)}%`,
  } as CSSProperties;

  // Обработчики для синхронизации hover между левой и правой колонками
  const handleItemHover = useCallback(
    (trackId: string | undefined, isEnter: boolean) => {
      if (!trackId) return;

      const items = document.querySelectorAll(`[data-track-id="${trackId}"]`);
      items.forEach(item => {
        if (isEnter) {
          item.classList.add(styles.pairHovered);
        } else {
          item.classList.remove(styles.pairHovered);
        }
      });
    },
    []
  );

  return (
    <div className={styles.root}>
      <div className={styles.container1}>
        {/* Верхний блок 9 частей высоты: 7:3 по ширине */}
        <div className={styles.topSplit}>
          <div className={styles.leftCol}>
            {current && (
              <div
                className={`${styles.item} ${styles.sticky} ${styles.current}`}
                data-track-id={current.id}
                onMouseEnter={() => handleItemHover(current.id, true)}
                onMouseLeave={() => handleItemHover(current.id, false)}
              >
                <div className={styles.thumb}>
                  {current.artworkUrl ? (
                    <img src={current.artworkUrl} alt="art" />
                  ) : (
                    <div className={styles.thumbPlaceholder} />
                  )}
                </div>
                <div className={styles.itemBody}>
                  <div className={styles.itemTitle}>{current.trackName}</div>
                  <div className={styles.itemMeta}>
                    <a
                      href={current.url}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.itemLink}
                      title={current.url}
                    >
                      {current.url}
                    </a>
                    <span className={styles.itemDuration}>
                      {formatDuration(
                        playerState?.currentTrackDuration || "PT0S"
                      )}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div className={styles.scrollList}>
              {queueWithoutCurrent.map(q => (
                <div
                  key={q.id}
                  className={styles.item}
                  data-track-id={q.id}
                  onMouseEnter={() => handleItemHover(q.id, true)}
                  onMouseLeave={() => handleItemHover(q.id, false)}
                >
                  <div className={styles.thumb}>
                    {q.artworkUrl ? (
                      <img src={q.artworkUrl} alt="art" />
                    ) : (
                      <div className={styles.thumbPlaceholder} />
                    )}
                  </div>
                  <div className={styles.itemBody}>
                    <div className={styles.itemTitle}>{q.trackName}</div>
                    <div className={styles.itemMeta}>
                      <a
                        href={q.url}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.itemLink}
                        title={q.url}
                      >
                        {q.url}
                      </a>
                      <span className={styles.itemDuration}>
                        {formatDuration(q.duration)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.rightCol}>
            {current && (
              <div
                className={`${styles.userRow} ${styles.sticky} ${styles.current}`}
                data-track-id={current.id}
                onMouseEnter={() => handleItemHover(current.id, true)}
                onMouseLeave={() => handleItemHover(current.id, false)}
              >
                <div className={styles.avatar}>
                  {current.requestedByTwitchUser?.profileImageUrl ? (
                    <img
                      src={current.requestedByTwitchUser.profileImageUrl}
                      alt="avatar"
                    />
                  ) : (
                    <div className={styles.avatarPlaceholder} />
                  )}
                </div>
                <div className={styles.userBody}>
                  <div className={styles.userName}>
                    {current.requestedByTwitchUser?.displayName || "Неизвестно"}
                  </div>
                  <div className={styles.userMeta}>
                    {current.lastTimePlays
                      ? new Date(current.lastTimePlays).toLocaleString()
                      : ""}
                  </div>
                </div>
              </div>
            )}
            <div className={styles.scrollList}>
              {queueWithoutCurrent.map(q => (
                <div
                  key={q.id}
                  className={styles.userRow}
                  data-track-id={q.id}
                  onMouseEnter={() => handleItemHover(q.id, true)}
                  onMouseLeave={() => handleItemHover(q.id, false)}
                >
                  <div className={styles.avatar}>
                    {q.requestedByTwitchUser?.profileImageUrl ? (
                      <img
                        src={q.requestedByTwitchUser.profileImageUrl}
                        alt="avatar"
                      />
                    ) : (
                      <div className={styles.avatarPlaceholder} />
                    )}
                  </div>
                  <div className={styles.userBody}>
                    <div className={styles.userName}>
                      {q.requestedByTwitchUser?.displayName ??
                        q.requestedByTwitchUser?.userLogin ??
                        "Неизвестно"}
                    </div>
                    <div className={styles.userMeta}>
                      {q.lastTimePlays
                        ? new Date(q.lastTimePlays).toLocaleString()
                        : ""}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Нижний блок 1 часть высоты — тулбар с прогресс-заливкой */}
      <div className={styles.container3}>
        <div className={styles.toolbar} style={progressStyle}>
          <div className={styles.toolbarInner}>
            <div className={styles.controlButtons}>
              <Button
                variant="dark"
                className={styles.tbBtn}
                onClick={handlePrev}
                disabled={loading || !history?.length}
                title="Предыдущий"
              >
                <SkipBack />
              </Button>

              <Button
                variant={isPlaying ? "warning" : "primary"}
                className={styles.tbBtn}
                onClick={handleTogglePlayPause}
                disabled={loading}
                title={isPlaying ? "Пауза" : "Воспроизвести"}
              >
                {isPlaying ? <Pause /> : <Play />}
              </Button>

              <Button
                variant="danger"
                className={styles.tbBtn}
                onClick={handleStop}
                disabled={loading}
                title="Стоп"
              >
                <Square />
              </Button>

              <Button
                variant="secondary"
                className={styles.tbBtn}
                onClick={handleSkip}
                disabled={loading}
                title="Следующий"
              >
                <SkipForward />
              </Button>

              <Button
                variant={playerState?.isMuted ? "secondary" : "primary"}
                className={styles.tbBtn}
                onClick={handleMute}
                disabled={loading}
                title={playerState?.isMuted ? "Звук выкл." : "Звук вкл."}
              >
                {playerState?.isMuted ? <VolumeX /> : <Volume2 />}
              </Button>

              <div className={styles.extraButtons}>
                <Button
                  variant="outline-secondary"
                  className={styles.tbBtn}
                  disabled
                  title="Видео в главном плеере (скоро)"
                >
                  <Video />
                </Button>
              </div>
            </div>

            <div className={styles.volumeWrap}>
              <ElasticSlider
                value={volume}
                onChange={handleVolumeChange}
                min={0}
                max={100}
                step={1}
                disabled={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

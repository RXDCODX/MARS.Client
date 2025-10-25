import { useCallback, useMemo } from "react";

import { useSoundRequestPlayer } from "../hooks";
import { PlayerToolbar } from "./PlayerToolbar";
import styles from "./SoundRequestPlayerDesktop.module.scss";
import { TrackItem } from "./TrackItem";
import { UserItem } from "./UserItem";
import { useTrackProgress } from "./useTrackProgress";

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

  const current = playerState?.currentQueueItem?.track || null;
  const durationSec = parseIsoDurationToSeconds(current?.duration || "PT0S");

  const progress = useTrackProgress({
    durationSec,
    isPlaying: isPlaying ?? false,
    trackId: current?.id,
  });

  // Build lists: sticky current + rest of queue
  const queueWithoutCurrent = useMemo(() => {
    const currentId = current?.id;
    return queue.filter(x => x.track?.id !== currentId);
  }, [queue, current?.id]);

  const handlePrev = useCallback(() => {
    const prev = history?.[0];
    if (prev?.id) handlePlayTrackFromQueue(prev.id);
  }, [handlePlayTrackFromQueue, history]);

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
              <TrackItem
                track={current}
                isCurrent
                isPlaying={isPlaying ?? false}
                onMouseEnter={() => handleItemHover(current.id, true)}
                onMouseLeave={() => handleItemHover(current.id, false)}
              />
            )}
            <div className={styles.scrollList}>
              {queueWithoutCurrent.map(q =>
                q.track ? (
                  <TrackItem
                    key={q.id}
                    track={q.track}
                    onMouseEnter={() => handleItemHover(q.track?.id, true)}
                    onMouseLeave={() => handleItemHover(q.track?.id, false)}
                  />
                ) : null
              )}
            </div>
          </div>

          <div className={styles.rightCol}>
            {current && (
              <UserItem
                key={
                  playerState?.currentQueueItem?.requestedByTwitchId +
                  "_" +
                  current.id
                }
                user={
                  playerState?.currentQueueItem?.requestedByTwitchUser ??
                  undefined
                }
                lastTimePlays={current.lastTimePlays}
                trackId={current.id}
                isCurrent
                onMouseEnter={() => handleItemHover(current.id, true)}
                onMouseLeave={() => handleItemHover(current.id, false)}
              />
            )}
            <div className={styles.scrollList}>
              {queueWithoutCurrent.map(q =>
                q.track ? (
                  <UserItem
                    key={q.id}
                    user={q.requestedByTwitchUser ?? undefined}
                    lastTimePlays={q.track.lastTimePlays}
                    trackId={q.track.id}
                    onMouseEnter={() => handleItemHover(q.track?.id, true)}
                    onMouseLeave={() => handleItemHover(q.track?.id, false)}
                  />
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Нижний блок 1 часть высоты — тулбар с прогресс-заливкой */}
      <div className={styles.container3}>
        <PlayerToolbar
          isPlaying={isPlaying ?? false}
          isMuted={playerState?.isMuted ?? false}
          volume={volume}
          loading={loading}
          hasPrevious={!!history?.length}
          progress={progress}
          onPrev={handlePrev}
          onTogglePlayPause={handleTogglePlayPause}
          onStop={handleStop}
          onSkip={handleSkip}
          onMute={handleMute}
          onVolumeChange={handleVolumeChange}
        />
      </div>
    </div>
  );
}

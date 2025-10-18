import {
  Pause,
  Play,
  SkipForward,
  Square,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button, Card } from "react-bootstrap";

import { useSoundRequestPlayer } from "../hooks";
import {
  formatDuration,
  getAuthorsString,
  getRequestedByString,
} from "../utils";
import styles from "./SoundRequestPlayerDesktop.module.scss";

/**
 * Десктопный плеер для управления SoundRequest
 */
export function SoundRequestPlayerDesktop() {
  const {
    playerState,
    queue,
    loading,
    volume,
    isPlaying,
    handleTogglePlayPause,
    handleStop,
    handleSkip,
    handleVolumeChange,
    handleMute,
    handleRemoveFromQueue,
  } = useSoundRequestPlayer();

  return (
    <div className={styles.container}>
      {/* Текущий трек */}
      <Card className={styles.currentTrackCard}>
        <Card.Body>
          <h5 className={styles.title}>Сейчас играет</h5>
          {playerState?.currentTrack ? (
            <div className={styles.currentTrack}>
              <div className={styles.trackInfo}>
                <h6 className={styles.trackName}>
                  {playerState.currentTrack.trackName}
                </h6>
                <p className={styles.trackAuthor}>
                  {getAuthorsString(playerState.currentTrack.authors)}
                </p>
                {playerState.currentTrackRequestedByDisplayName && (
                  <p className={styles.requestedBy}>
                    Запросил:{" "}
                    {getRequestedByString(
                      playerState.currentTrackRequestedByDisplayName
                    )}
                  </p>
                )}
              </div>
              <div className={styles.duration}>
                {formatDuration(playerState.currentTrackDuration || "PT0S")}
              </div>
            </div>
          ) : (
            <p className={styles.noTrack}>Нет активного трека</p>
          )}

          {/* Элементы управления */}
          <div className={styles.controls}>
            <div className={styles.playbackControls}>
              <Button
                variant={isPlaying ? "warning" : "primary"}
                size="lg"
                onClick={handleTogglePlayPause}
                disabled={loading}
                className={styles.controlButton}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </Button>
              <Button
                variant="danger"
                size="lg"
                onClick={handleStop}
                disabled={loading}
                className={styles.controlButton}
              >
                <Square size={24} />
              </Button>
              <Button
                variant="info"
                size="lg"
                onClick={handleSkip}
                disabled={loading}
                className={styles.controlButton}
              >
                <SkipForward size={24} />
              </Button>
            </div>

            {/* Громкость */}
            <div className={styles.volumeControls}>
              <Button
                variant={playerState?.isMuted ? "secondary" : "primary"}
                onClick={handleMute}
                disabled={loading}
                className={styles.muteButton}
              >
                {playerState?.isMuted ? (
                  <VolumeX size={20} />
                ) : (
                  <Volume2 size={20} />
                )}
              </Button>
              <div className={styles.volumeSlider}>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  onChange={e => handleVolumeChange(Number(e.target.value))}
                  disabled={loading}
                  className={styles.volumeInput}
                />
                <span className={styles.volumeValue}>{volume}%</span>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Очередь */}
      <Card className={styles.queueCard}>
        <Card.Body>
          <h5 className={styles.title}>Очередь ({queue.length})</h5>
          {queue.length > 0 ? (
            <div className={styles.queueList}>
              {queue.map((item, index) => (
                <div key={item.id} className={styles.queueItem}>
                  <div className={styles.queueItemInfo}>
                    <span className={styles.queueNumber}>{index + 1}</span>
                    <div className={styles.queueTrackInfo}>
                      <h6 className={styles.queueTrackName}>
                        {item.requestedTrack.trackName}
                      </h6>
                      <p className={styles.queueTrackAuthor}>
                        {getAuthorsString(item.requestedTrack.authors)}
                      </p>
                      <p className={styles.queueRequestedBy}>
                        {getRequestedByString(item.twitchDisplayName)}
                      </p>
                    </div>
                  </div>
                  <div className={styles.queueItemActions}>
                    <span className={styles.queueDuration}>
                      {formatDuration(item.requestedTrack.duration)}
                    </span>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveFromQueue(item.id)}
                      disabled={loading}
                    >
                      Удалить
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.emptyQueue}>Очередь пуста</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

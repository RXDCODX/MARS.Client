import {
  ChevronDown,
  ChevronUp,
  Pause,
  Play,
  SkipForward,
  Square,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

import { useSoundRequestPlayer } from "../hooks";
import {
  formatDuration,
  getAuthorsString,
  getRequestedByString,
} from "../utils";
import styles from "./SoundRequestPlayerMobile.module.scss";

/**
 * Мобильный плеер для управления SoundRequest
 */
export function SoundRequestPlayerMobile() {
  const [showQueue, setShowQueue] = useState(false);

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
                <div className={styles.duration}>
                  {formatDuration(playerState.currentTrackDuration || "PT0S")}
                </div>
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
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </Button>
              <Button
                variant="danger"
                size="lg"
                onClick={handleStop}
                disabled={loading}
                className={styles.controlButton}
              >
                <Square size={20} />
              </Button>
              <Button
                variant="info"
                size="lg"
                onClick={handleSkip}
                disabled={loading}
                className={styles.controlButton}
              >
                <SkipForward size={20} />
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
                  <VolumeX size={18} />
                ) : (
                  <Volume2 size={18} />
                )}
              </Button>
              <div className={styles.volumeSlider}>
                <Form.Range
                  min={0}
                  max={100}
                  value={volume}
                  onChange={e => handleVolumeChange(Number(e.target.value))}
                  disabled={loading}
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
          <div
            className={styles.queueHeader}
            onClick={() => setShowQueue(!showQueue)}
          >
            <h5 className={styles.title}>Очередь ({queue.length})</h5>
            <Button variant="link" className={styles.toggleButton}>
              {showQueue ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </div>

          {showQueue && (
            <div className={styles.queueList}>
              {queue.length > 0 ? (
                queue.map((item, index) => (
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
                ))
              ) : (
                <p className={styles.emptyQueue}>Очередь пуста</p>
              )}
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

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
import { Button, Card, Carousel, Form } from "react-bootstrap";
import ReactPlayer from "react-player";

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
    nextFiveOrders,
    displayedVideos,
    handleTogglePlayPause,
    handleStop,
    handleSkip,
    handlePlayNext,
    handleVolumeChange,
    handleMute,
    handleRemoveFromQueue,
    handlePlayTrackFromQueue,
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
                {playerState.currentTrackRequestedByTwitchUser?.displayName && (
                  <p className={styles.requestedBy}>
                    Запросил:{" "}
                    {getRequestedByString(
                      playerState.currentTrackRequestedByTwitchUser.displayName
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
              <Button
                variant="secondary"
                size="lg"
                onClick={handlePlayNext}
                disabled={loading}
                className={styles.controlButton}
              >
                Далее
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

      {/* Видео и карусель */}
      <Card className={styles.queueCard}>
        <Card.Body>
          <div
            className={styles.queueHeader}
            onClick={() => setShowQueue(!showQueue)}
          >
            <h5 className={styles.title}>Видео ({displayedVideos.length})</h5>
            <Button variant="link" className={styles.toggleButton}>
              {showQueue ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </div>

          {showQueue && (
            <Carousel interval={null} indicators={displayedVideos.length > 1}>
              {displayedVideos.map(video => (
                <Carousel.Item key={video.id}>
                  <div style={{ width: "100%", height: 220 }}>
                    {playerState?.currentTrack?.id === video.id ? (
                      <ReactPlayer
                        key={video.url}
                        src={video.url}
                        playing={!!isPlaying}
                        volume={playerState.volume / 100}
                        muted
                        width="100%"
                        height="100%"
                      />
                    ) : (
                      <div className={styles.queueItem}>
                        <div className={styles.queueItemInfo}>
                          <div className={styles.queueTrackInfo}>
                            <h6 className={styles.queueTrackName}>
                              {video.trackName || video.title}
                            </h6>
                            <p className={styles.queueTrackAuthor}>
                              {(video.authors || []).join(", ")}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          )}
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
                          {item.trackName}
                        </h6>
                        <p className={styles.queueTrackAuthor}>
                          {getAuthorsString(item.authors)}
                        </p>
                        <p className={styles.queueRequestedBy}>
                          {getRequestedByString(
                            item.requestedByTwitchUser?.displayName
                          )}
                        </p>
                      </div>
                    </div>
                    <div className={styles.queueItemActions}>
                      <span className={styles.queueDuration}>
                        {formatDuration(item.duration)}
                      </span>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handlePlayTrackFromQueue(item.id)}
                        disabled={loading}
                      >
                        Играть
                      </Button>
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

      {/* Ближайшие 5 заказов */}
      <Card className={styles.queueCard}>
        <Card.Body>
          <div className={styles.queueHeader}>
            <h5 className={styles.title}>Ближайшие 5 заказов</h5>
          </div>
          {nextFiveOrders.length > 0 ? (
            <div className={styles.queueList}>
              {nextFiveOrders.map((item, index) => (
                <div key={item.id} className={styles.queueItem}>
                  <div className={styles.queueItemInfo}>
                    <span className={styles.queueNumber}>{index + 1}</span>
                    <div className={styles.queueTrackInfo}>
                      <h6 className={styles.queueTrackName}>
                        {item.trackName}
                      </h6>
                      <p className={styles.queueTrackAuthor}>
                        {getAuthorsString(item.authors)}
                      </p>
                      <p className={styles.queueRequestedBy}>
                        {getRequestedByString(
                          item.requestedByTwitchUser?.displayName
                        )}
                      </p>
                    </div>
                  </div>
                  <div className={styles.queueItemActions}>
                    <span className={styles.queueDuration}>
                      {formatDuration(item.duration)}
                    </span>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handlePlayTrackFromQueue(item.id)}
                      disabled={loading}
                    >
                      Играть
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.emptyQueue}>Нет ближайших заказов</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

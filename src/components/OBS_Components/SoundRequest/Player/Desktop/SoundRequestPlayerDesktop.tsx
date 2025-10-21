import {
  Pause,
  Play,
  SkipForward,
  Square,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button, Card, Carousel } from "react-bootstrap";
import ReactPlayer from "react-player";

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
    history,
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

  const [showVideo, setShowVideo] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Вычисляем индекс текущего трека в списке отображаемых видео
  const currentVideoIndex = useMemo(() => {
    if (!playerState?.currentTrack) return 0;
    const idx = displayedVideos.findIndex(
      v => v.id === playerState.currentTrack!.id
    );
    return idx >= 0 ? idx : 0;
  }, [playerState, displayedVideos]);

  // Синхронизируем карусель с текущим треком
  useEffect(() => {
    setCarouselIndex(currentVideoIndex);
  }, [currentVideoIndex]);

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
              <Button
                variant="secondary"
                size="lg"
                onClick={handlePlayNext}
                disabled={loading}
                className={styles.controlButton}
              >
                Следующий
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

      {/* Видео плеер и карусель отображаемых видео */}
      <Card className={styles.currentTrackCard}>
        <Card.Body>
          <div className={styles.videoHeader}>
            <h5 className={styles.title}>Видео</h5>
            <div>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => setShowVideo(v => !v)}
              >
                {showVideo ? "Скрыть" : "Показать"} видео
              </Button>
            </div>
          </div>

          {showVideo && displayedVideos.length > 0 ? (
            <div className={styles.videoContainer}>
              <Carousel
                activeIndex={carouselIndex}
                onSelect={i => setCarouselIndex(i ?? 0)}
                interval={null}
                indicators={displayedVideos.length > 1}
              >
                {displayedVideos.map(video => (
                  <Carousel.Item key={video.id}>
                    <div className={styles.videoSlide}>
                      {playerState?.currentTrack?.id === video.id ? (
                        <ReactPlayer
                          key={video.url}
                          src={video.url}
                          playing={!!isPlaying}
                          volume={playerState.volume / 100}
                          muted={playerState.isMuted}
                          width="100%"
                          height="100%"
                          controls={false}
                        />
                      ) : (
                        <div className={styles.videoPreview}>
                          <div className={styles.previewInfo}>
                            <div className={styles.previewTitle}>
                              {video.trackName || video.title}
                            </div>
                            <div className={styles.previewAuthor}>
                              {(video.authors || []).join(", ")}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          ) : (
            <p className={styles.noTrack}>Нет видео для отображения</p>
          )}
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
              ))}
            </div>
          ) : (
            <p className={styles.emptyQueue}>Очередь пуста</p>
          )}
        </Card.Body>
      </Card>

      {/* Ближайшие 5 заказов и статистика */}
      <Card className={styles.queueCard}>
        <Card.Body>
          <h5 className={styles.title}>Ближайшие 5 заказов</h5>
          {nextFiveOrders.length > 0 ? (
            <div className={styles.queueList}>
              {nextFiveOrders.map((item, idx) => (
                <div key={item.id} className={styles.queueItem}>
                  <div className={styles.queueItemInfo}>
                    <span className={styles.queueNumber}>{idx + 1}</span>
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

          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              История: {history.length} треков
            </div>
            <div className={styles.statItem}>Громкость: {volume}%</div>
            <div className={styles.statItem}>
              Статус:{" "}
              {isPlaying ? "Играет" : playerState?.isPaused ? "Пауза" : "Стоп"}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

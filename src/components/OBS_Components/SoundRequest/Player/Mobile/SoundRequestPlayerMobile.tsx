import {
  ChevronDown,
  ChevronUp,
  Music,
  Pause,
  Play,
  SkipForward,
  Square,
  Video,
  VideoOff,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button, Card, Carousel, Form } from "react-bootstrap";
import ReactPlayer from "react-player";
import { useShallow } from "zustand/react/shallow";

import { PlayerStateVideoStateEnum, SoundRequest } from "@/shared/api";
import { useToastModal } from "@/shared/Utils/ToastModal";

import { LiquidChrome } from "../Background";
import { useSoundRequestPlayer } from "../hooks";
import { usePlayerStore } from "../stores/usePlayerStore";
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
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { showToast } = useToastModal();
  const soundRequestApi = useMemo(() => new SoundRequest(), []);

  const {
    queue,
    displayedVideos,
    handleTogglePlayPause,
    handleStop,
    handleSkip,
    handlePlayNext,
    handleVolumeChange,
    handleMute,
    handleToggleVideoState,
    handlePlayTrackFromQueue,
    fetchQueue,
  } = useSoundRequestPlayer();

  // Получаем данные из store
  const { playerState } = usePlayerStore(
    useShallow(state => ({
      playerState: state.playerState,
    }))
  );

  // Вычисляем состояния без создания новых массивов
  const isPlaying = playerState?.state === "Playing";
  const isStopped = playerState?.state === "Stopped";

  // Volume и loading из стора с useShallow (чтобы избежать ререндеров всего компонента)
  const { volume, loading } = usePlayerStore(
    useShallow(state => ({
      volume: state.volume,
      loading: state.loading,
    }))
  );

  // Определяем иконку видео в зависимости от videoState
  const getVideoIcon = () => {
    const videoState =
      playerState?.videoState ?? PlayerStateVideoStateEnum.Video;
    switch (videoState) {
      case PlayerStateVideoStateEnum.Video:
        return <Video size={18} />;
      case PlayerStateVideoStateEnum.NoVideo:
        return <VideoOff size={18} />;
      case PlayerStateVideoStateEnum.AudioOnly:
        return <Music size={18} />;
      default:
        return <Video size={18} />;
    }
  };

  // Обработчик удаления трека из очереди
  const handleDeleteFromQueue = async (queueItemId: string) => {
    if (deletingId) return; // Предотвращаем множественные удаления

    setDeletingId(queueItemId);
    try {
      const response =
        await soundRequestApi.soundRequestQueueDelete(queueItemId);

      if (response.data.success) {
        // Обновляем очередь после успешного удаления
        await fetchQueue();
      } else {
        showToast({
          success: false,
          message: response.data.message || "Не удалось удалить трек",
        });
      }
    } catch (error) {
      console.error("Ошибка при удалении трека:", error);
      showToast({
        success: false,
        message: "Произошла ошибка при удалении трека",
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <LiquidChrome
        baseColor={[0.05, 0.05, 0.15]}
        speed={0.15}
        amplitude={0.25}
        frequencyX={2.5}
        frequencyY={2.5}
        interactive={false}
      />
      <div className={styles.container}>
        {/* Текущий трек */}
        <Card className={styles.currentTrackCard}>
        <Card.Body>
          <h5 className={styles.title}>Сейчас играет</h5>
          {playerState?.currentQueueItem?.track ? (
            <div className={styles.currentTrack}>
              <div className={styles.trackInfo}>
                <h6 className={styles.trackName}>
                  {playerState.currentQueueItem.track.trackName}
                </h6>
                <p className={styles.trackAuthor}>
                  {getAuthorsString(playerState.currentQueueItem.track.authors)}
                </p>
                {playerState.currentQueueItem.requestedByTwitchUser
                  ?.displayName && (
                  <p className={styles.requestedBy}>
                    Запросил:{" "}
                    {getRequestedByString(
                      playerState.currentQueueItem.requestedByTwitchUser
                        .displayName
                    )}
                  </p>
                )}
                <div className={styles.duration}>
                  {formatDuration(
                    playerState.currentQueueItem.track?.duration || "PT0S"
                  )}
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
                variant="secondary"
                size="lg"
                onClick={handleStop}
                disabled={loading}
                className={`${styles.controlButton} ${isStopped ? styles.stopped : ""}`}
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
              <Button
                variant={
                  playerState?.videoState === PlayerStateVideoStateEnum.Video
                    ? "primary"
                    : playerState?.videoState ===
                        PlayerStateVideoStateEnum.NoVideo
                      ? "warning"
                      : "info"
                }
                onClick={handleToggleVideoState}
                disabled={loading}
                className={styles.muteButton}
                title="Переключить режим отображения"
              >
                {getVideoIcon()}
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
              {displayedVideos.map(video => {
                // Используем queueItemId для корректного пересоздания плеера
                const queueItemId = playerState?.currentQueueItem?.id;
                const playerKey = queueItemId || video.id;

                return (
                  <Carousel.Item key={video.id}>
                    <div style={{ width: "100%", height: 220 }}>
                      {playerState?.currentQueueItem?.track?.id === video.id ? (
                        <ReactPlayer
                          key={playerKey}
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
                );
              })}
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
                queue.map((item, index) =>
                  item.track ? (
                    <div key={item.id} className={styles.queueItem}>
                      <div className={styles.queueItemInfo}>
                        <span className={styles.queueNumber}>{index + 1}</span>
                        <div className={styles.queueTrackInfo}>
                          <h6 className={styles.queueTrackName}>
                            {item.track.trackName}
                          </h6>
                          <p className={styles.queueTrackAuthor}>
                            {getAuthorsString(item.track.authors)}
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
                          {formatDuration(item.track.duration)}
                        </span>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={handlePlayTrackFromQueue}
                          disabled={loading}
                        >
                          Играть
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteFromQueue(item.id)}
                          disabled={loading || deletingId === item.id}
                        >
                          {deletingId === item.id ? "..." : "Удалить"}
                        </Button>
                      </div>
                    </div>
                  ) : null
                )
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
          {queue.length > 0 ? (
            <div className={styles.queueList}>
              {queue.map((item, index) =>
                item.track && index < 5 ? (
                  <div key={item.id} className={styles.queueItem}>
                    <div className={styles.queueItemInfo}>
                      <span className={styles.queueNumber}>{index + 1}</span>
                      <div className={styles.queueTrackInfo}>
                        <h6 className={styles.queueTrackName}>
                          {item.track.trackName}
                        </h6>
                        <p className={styles.queueTrackAuthor}>
                          {getAuthorsString(item.track.authors)}
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
                        {formatDuration(item.track.duration)}
                      </span>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={handlePlayTrackFromQueue}
                        disabled={loading}
                      >
                        Играть
                      </Button>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          ) : (
            <p className={styles.emptyQueue}>Нет ближайших заказов</p>
          )}
        </Card.Body>
      </Card>
      </div>
    </>
  );
}

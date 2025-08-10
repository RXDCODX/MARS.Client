import "./AFKScreen.scss";
import { useEffect, useRef, useState, useCallback } from "react";

// Типы для YouTube IFrame API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

// Константы с плейлистами YouTube
const PLAYLISTS = [
  "PLB6r_8YDnipME_VANRWiiBgI9-rabmmL1",
  "PLB6r_8YDnipME_VANRWiiBgI9-rabmmL1",
  "PLB6r_8YDnipME_VANRWiiBgI9-rabmmL1"
];

const AFKScreen = () => {
  const playerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<any>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [_, setCurrentPlaylist] = useState<string>("");

  // Функция для получения случайного плейлиста
  const getRandomPlaylist = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * PLAYLISTS.length);
    return PLAYLISTS[randomIndex];
  }, []);

  useEffect(() => {
    const initPlayer = async () => {
      if (playerRef.current && !playerInstanceRef.current) {
        try {
          // Загружаем YouTube IFrame API
          if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
            
            // Ждем загрузки API
            await new Promise<void>((resolve) => {
              window.onYouTubeIframeAPIReady = () => resolve();
            });
          }

          const playlistId = getRandomPlaylist();
          setCurrentPlaylist(playlistId);

          // Создаем плеер
          playerInstanceRef.current = new window.YT.Player(playerRef.current, {
            height: '100%',
            width: '100%',
            playerVars: {
              autoplay: 1,
              controls: 1,
              playsinline: 1,
              mute: isMuted ? 1 : 0,
            },
            events: {
              onReady: (event: any) => {
                console.log('YouTube player is ready');
                setHasError(false);
                
                // Загружаем плейлист с случайным индексом и позицией
                const randomIndex = Math.floor(Math.random() * 200);
                const randomStartSeconds = Math.floor(Math.random() * 60);
                
                event.target.loadPlaylist({
                  listType: 'playlist',
                  list: playlistId,
                  index: randomIndex,
                  startSeconds: randomStartSeconds
                });
                
                // Включаем перемешивание плейлиста для большей случайности
                event.target.setShuffle(true);
              },
              onStateChange: (event: any) => {
                console.log('Player state changed:', event.data);
                // Если видео закончилось, переходим к следующему
                if (event.data === window.YT.PlayerState.ENDED) {
                  event.target.nextVideo();
                }
              },
              onError: (event: any) => {
                console.error('YouTube player error:', event.data);
                setHasError(true);
                // Пытаемся перезапустить с другим плейлистом
                setTimeout(() => {
                  if (playerInstanceRef.current) {
                    const newPlaylistId = getRandomPlaylist();
                    setCurrentPlaylist(newPlaylistId);
                    const randomIndex = Math.floor(Math.random() * 200);
                    const randomStartSeconds = Math.floor(Math.random() * 60);
                    
                    playerInstanceRef.current.loadPlaylist({
                      listType: 'playlist',
                      list: newPlaylistId,
                      index: randomIndex,
                      startSeconds: randomStartSeconds
                    });
                    
                    // Включаем перемешивание для нового плейлиста
                    setTimeout(() => {
                      if (playerInstanceRef.current) {
                        playerInstanceRef.current.setShuffle(true);
                      }
                    }, 1000);
                  }
                }, 2000);
              }
            }
          });

        } catch (error) {
          console.error('Error initializing player:', error);
          setHasError(true);
        }
      }
    };

    initPlayer();

    return () => {
      if (playerInstanceRef.current) {
        playerInstanceRef.current.destroy();
        playerInstanceRef.current = null;
      }
    };
  }, [getRandomPlaylist]);

  const handleUserInteraction = useCallback(() => {
    if (isMuted && playerInstanceRef.current) {
      setIsMuted(false);
      playerInstanceRef.current.unMute();
    }
  }, [isMuted]);

  const handleRetry = useCallback(() => {
    setHasError(false);
    if (playerInstanceRef.current) {
      const newPlaylistId = getRandomPlaylist();
      setCurrentPlaylist(newPlaylistId);
      const randomIndex = Math.floor(Math.random() * 200);
      const randomStartSeconds = Math.floor(Math.random() * 60);
      
      playerInstanceRef.current.loadPlaylist({
        listType: 'playlist',
        list: newPlaylistId,
        index: randomIndex,
        startSeconds: randomStartSeconds
      });
      
      // Включаем перемешивание для нового плейлиста
      setTimeout(() => {
        if (playerInstanceRef.current) {
          playerInstanceRef.current.setShuffle(true);
        }
      }, 1000);
    }
  }, [getRandomPlaylist]);

  return (
    <div className="afk-screen-container" onClick={handleUserInteraction}>
      {hasError && (
        <div className="error-message">
          <p>Ошибка загрузки видео</p>
          <button onClick={handleRetry} className="retry-button">
            Попробовать снова
          </button>
        </div>
      )}
      <div ref={playerRef} className="youtube-player" />
    </div>
  );
};

export default AFKScreen;

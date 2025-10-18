import { SoundRequestPlayer } from "../Player/SoundRequestPlayer";

/**
 * Компонент для отображения списка треков и плеера управления SoundRequest
 * Автоматически определяет разрешение экрана и рендерит соответствующий интерфейс
 */
export function TrackList() {
  return (
    <div>
      <SoundRequestPlayer />
    </div>
  );
}

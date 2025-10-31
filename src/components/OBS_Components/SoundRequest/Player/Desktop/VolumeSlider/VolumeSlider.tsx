import { memo } from "react";
import { useShallow } from "zustand/react/shallow";

import { usePlayerActions } from "../../contexts/PlayerActionsContext";
import { usePlayerStore } from "../../stores/usePlayerStore";
import { ElasticSlider } from "../ElasticSlider";

/**
 * Обёртка над ElasticSlider для громкости
 * Подписывается напрямую на volume из стора и получает обработчик из контекста
 * Громкость можно менять всегда, поэтому disabled не нужен
 */
function VolumeSliderComponent() {
  // Подписываемся напрямую на volume из стора
  const volume = usePlayerStore(useShallow(state => state.volume));
  // Получаем обработчик напрямую из контекста
  const { handleVolumeChange } = usePlayerActions();

  return (
    <ElasticSlider
      value={volume}
      onChange={handleVolumeChange}
      min={0}
      max={100}
      step={1}
      disabled={false}
    />
  );
}

// Экспортируем мемоизированную версию
export const VolumeSlider = memo(VolumeSliderComponent);

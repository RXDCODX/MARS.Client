import { useIsMobile } from "@/shared/hooks/useMediaQuery";

import { SoundRequestPlayerDesktop } from "./Desktop/SoundRequestPlayerDesktop";
import { SoundRequestPlayerMobile } from "./Mobile/SoundRequestPlayerMobile";

/**
 * Адаптивный плеер для управления SoundRequest
 * Автоматически определяет разрешение экрана и рендерит соответствующий компонент
 */
export function SoundRequestPlayer() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <SoundRequestPlayerMobile />;
  }

  return <SoundRequestPlayerDesktop />;
}

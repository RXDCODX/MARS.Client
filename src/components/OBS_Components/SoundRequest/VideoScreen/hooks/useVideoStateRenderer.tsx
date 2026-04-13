import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import { PlayerStateVideoStateEnum } from "@/shared/api";

import { UnifiedPlayerView } from "../components";
import { useVideoScreenStore } from "../store/useVideoScreenStore";

interface UseVideoStateRendererProps {
  isMainPlayer: boolean;
}

interface VideoStateRendererResult {
  component: React.ReactElement | null;
  videoState: PlayerStateVideoStateEnum;
}

/**
 * Хук для управления рендерингом компонентов в зависимости от videoState
 * @returns объект с компонентом для рендеринга и текущим videoState
 */
export function useVideoStateRenderer({
  isMainPlayer,
}: UseVideoStateRendererProps): VideoStateRendererResult {
  useEffect(() => {
    useVideoScreenStore.getState().setIsMainPlayerContext(isMainPlayer);
  }, [isMainPlayer]);

  const playerState = useVideoScreenStore(
    useShallow(state => state.playerState)
  );
  const currentTrack = playerState?.currentQueueItem?.track ?? null;

  const videoState = playerState?.videoState ?? PlayerStateVideoStateEnum.Video;

  // Мемоизируем компонент - теперь используем единый UnifiedPlayerView
  // Используем стабильные callback'и чтобы избежать ререндера при смене videoState
  const component = useMemo(() => {
    // Если нет playerState или трека, не рендерим компонент
    if (!playerState || !currentTrack) {
      return null;
    }

    return <UnifiedPlayerView />;
  }, [currentTrack]);

  return {
    component,
    videoState,
  };
}

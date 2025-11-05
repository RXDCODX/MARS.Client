import { Button, Grid } from "@chakra-ui/react";
import { Pause, Play, SkipForward, Square } from "lucide-react";
import { memo, useCallback } from "react";
import { useShallow } from "zustand/react/shallow";

import { PlayerStateStateEnum } from "@/shared/api";

import { usePlayerStore } from "../../stores/usePlayerStore";

/**
 * Кнопки управления плеером (Play/Pause, Stop, Skip, PlayNext)
 */
function PlayerControlsComponent() {
  const { isPlaying, isStopped, loading, actions } = usePlayerStore(
    useShallow(state => ({
      isPlaying: state.playerState?.state === PlayerStateStateEnum.Playing,
      isStopped: state.playerState?.state === PlayerStateStateEnum.Stopped,
      loading: state.loading,
      actions: state.actions,
    }))
  );

  const handleTogglePlayPause = useCallback(() => {
    if (actions?.handleTogglePlayPause) {
      actions.handleTogglePlayPause();
    }
  }, [actions]);

  const handleStop = useCallback(() => {
    if (actions?.handleStop) {
      actions.handleStop();
    }
  }, [actions]);

  const handleSkip = useCallback(() => {
    if (actions?.handleSkip) {
      actions.handleSkip();
    }
  }, [actions]);

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={2} w="full">
      <Button
        onClick={handleTogglePlayPause}
        disabled={loading || !actions}
        colorScheme={isPlaying ? "orange" : "blue"}
        size="lg"
        minH="50px"
        borderRadius="md"
        title={isPlaying ? "Пауза" : "Воспроизвести"}
        _hover={{
          transform: "translateY(-2px)",
          shadow: "lg",
        }}
        _active={{
          transform: "translateY(0)",
        }}
        transition="all 0.3s ease"
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </Button>
      <Button
        onClick={handleStop}
        disabled={loading || !actions}
        colorScheme="gray"
        size="lg"
        minH="50px"
        borderRadius="md"
        title="Стоп"
        bg={isStopped ? "red.100" : undefined}
        color={isStopped ? "red.600" : undefined}
        borderColor={isStopped ? "red.300" : undefined}
        _hover={{
          transform: "translateY(-2px)",
          shadow: "lg",
          bg: isStopped ? "red.200" : undefined,
          borderColor: isStopped ? "red.400" : undefined,
        }}
        _active={{
          transform: "translateY(0)",
          bg: isStopped ? "red.300" : undefined,
        }}
        transition="all 0.3s ease"
      >
        <Square size={20} />
      </Button>
      <Button
        onClick={handleSkip}
        disabled={loading || !actions}
        colorScheme="cyan"
        size="lg"
        minH="50px"
        borderRadius="md"
        title="Пропустить трек"
        _hover={{
          transform: "translateY(-2px)",
          shadow: "lg",
        }}
        _active={{
          transform: "translateY(0)",
        }}
        transition="all 0.3s ease"
      >
        <SkipForward size={20} />
      </Button>
    </Grid>
  );
}

export const PlayerControls = memo(PlayerControlsComponent);

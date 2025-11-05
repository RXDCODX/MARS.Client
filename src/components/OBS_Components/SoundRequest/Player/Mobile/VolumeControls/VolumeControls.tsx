import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { Music, Video, VideoOff, Volume2, VolumeX } from "lucide-react";
import { memo, useCallback, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import { PlayerStateVideoStateEnum } from "@/shared/api";

import { usePlayerStore } from "../../stores/usePlayerStore";

/**
 * Управление громкостью и режимом отображения видео
 */
function VolumeControlsComponent() {
  const { volume, isMuted, videoState, loading, actions } = usePlayerStore(
    useShallow(state => ({
      volume: state.volume,
      isMuted: state.playerState?.isMuted ?? false,
      videoState:
        state.playerState?.videoState ?? PlayerStateVideoStateEnum.Video,
      loading: state.loading,
      actions: state.actions,
    }))
  );

  const handleMute = useCallback(() => {
    if (actions?.handleMute) {
      actions.handleMute();
    }
  }, [actions]);

  const handleToggleVideoState = useCallback(() => {
    if (actions?.handleToggleVideoState) {
      actions.handleToggleVideoState();
    }
  }, [actions]);

  const handleVolumeChange = useCallback(
    (value: number) => {
      if (actions?.handleVolumeChange) {
        actions.handleVolumeChange(value);
      }
    },
    [actions]
  );

  // Определяем иконку видео в зависимости от videoState
  const videoIcon = useMemo(() => {
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
  }, [videoState]);

  // Определяем colorScheme для кнопки видео
  const videoColorScheme = useMemo(() => {
    switch (videoState) {
      case PlayerStateVideoStateEnum.Video:
        return "blue";
      case PlayerStateVideoStateEnum.NoVideo:
        return "orange";
      case PlayerStateVideoStateEnum.AudioOnly:
        return "cyan";
      default:
        return "blue";
    }
  }, [videoState]);

  return (
    <Flex
      align="center"
      gap={3}
      p={3}
      bg="gray.100"
      borderRadius="md"
      _dark={{
        bg: "gray.700",
      }}
    >
      <IconButton
        onClick={handleMute}
        disabled={loading || !actions}
        colorScheme={isMuted ? "gray" : "blue"}
        aria-label={isMuted ? "Звук выкл." : "Звук вкл."}
        title={isMuted ? "Звук выкл." : "Звук вкл."}
        size="md"
        minW="45px"
        h="45px"
        borderRadius="md"
        flexShrink={0}
        _hover={{
          transform: "translateY(-2px)",
          shadow: "md",
        }}
        _active={{
          transform: "translateY(0)",
        }}
        transition="all 0.2s ease"
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </IconButton>
      <IconButton
        onClick={handleToggleVideoState}
        disabled={loading || !actions}
        colorScheme={videoColorScheme}
        aria-label="Переключить режим отображения"
        title="Переключить режим отображения"
        size="md"
        minW="45px"
        h="45px"
        borderRadius="md"
        flexShrink={0}
        _hover={{
          transform: "translateY(-2px)",
          shadow: "md",
        }}
        _active={{
          transform: "translateY(0)",
        }}
        transition="all 0.2s ease"
      >
        {videoIcon}
      </IconButton>
      <Box flex={1} px={2}>
        <input
          type="range"
          aria-label="Громкость"
          min={0}
          max={100}
          value={volume}
          onChange={e => handleVolumeChange(Number(e.target.value))}
          disabled={loading || !actions}
          style={{
            width: "100%",
            height: "8px",
            borderRadius: "4px",
            outline: "none",
            WebkitAppearance: "none",
            background: `linear-gradient(to right, #3182ce 0%, #3182ce ${volume}%, #cbd5e0 ${volume}%, #cbd5e0 100%)`,
            cursor: loading || !actions ? "not-allowed" : "pointer",
          }}
        />
      </Box>
      <Text
        minW="45px"
        textAlign="right"
        fontWeight="semibold"
        color="blue.600"
        fontSize="sm"
        _dark={{
          color: "blue.300",
        }}
      >
        {volume}%
      </Text>
    </Flex>
  );
}

export const VolumeControls = memo(VolumeControlsComponent);

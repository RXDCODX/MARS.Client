import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  CSSProperties,
  ReactElement,
  RefObject,
} from "react";
import ReactPlayer from "react-player";

import type { PlayerState, QueueItem } from "@/shared/api";
import { PlayerStateStateEnum } from "@/shared/api";

import { useVideoScreenStore } from "../store/useVideoScreenStore";
import { parseDurationToSeconds } from "../utils/parseDuration";

export interface PlayerProgressState {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

interface UseReactCustomPlayerParams {
  track: NonNullable<QueueItem["track"]>;
  queueItemId?: string;
  playerState: PlayerState;
  isMainPlayer: boolean;
  hasUserInteracted: boolean;
  localVolume: number;
  pauseSuppressionMs?: number;
  playerView: {
    width: string | number;
    height: string | number;
    controls: boolean;
    style?: CSSProperties;
  };
}

interface UseReactCustomPlayerResult {
  playerContainerRef: RefObject<HTMLDivElement>;
  playerElement: ReactElement;
  playbackInfo: {
    isTrackPlaying: boolean;
    maxTrackTimeSeconds: number;
  };
}

export function useReactCustomPlayer({
  track,
  queueItemId,
  playerState,
  isMainPlayer,
  hasUserInteracted,
  localVolume,
  pauseSuppressionMs = 0,
  playerView,
}: UseReactCustomPlayerParams): UseReactCustomPlayerResult {
  const signalRIsTrackPlaying =
    playerState.state === PlayerStateStateEnum.Playing;
  const [localPlaybackOverride, setLocalPlaybackOverride] = useState<
    boolean | null
  >(null);

  const isTrackPlaying =
    localPlaybackOverride === null
      ? signalRIsTrackPlaying
      : localPlaybackOverride;

  const playerRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const progressAppliedRef = useRef<boolean>(false);
  const ignorePauseUntilRef = useRef<number>(0);
  const isBufferingRef = useRef<boolean>(false);
  const volumeTrackingCleanupRef = useRef<(() => void) | null>(null);

  const playerKey = queueItemId || track.url;
  const shouldMute = !hasUserInteracted || playerState.isMuted;
  const maxTrackTimeSeconds = useMemo(
    () => parseDurationToSeconds(track.duration),
    [track.duration]
  );

  useEffect(() => {
    progressAppliedRef.current = false;
    setLocalPlaybackOverride(null);
  }, [queueItemId]);

  useEffect(() => {
    if (
      localPlaybackOverride !== null &&
      localPlaybackOverride === signalRIsTrackPlaying
    ) {
      setLocalPlaybackOverride(null);
    }
  }, [localPlaybackOverride, signalRIsTrackPlaying]);

  useEffect(
    () => () => {
      if (volumeTrackingCleanupRef.current) {
        volumeTrackingCleanupRef.current();
        volumeTrackingCleanupRef.current = null;
      }
    },
    [playerKey]
  );

  const resolveMediaElement = useCallback((): HTMLMediaElement | null => {
    const playerInstance = playerRef.current as
      | {
          getInternalPlayer?: () => unknown;
        }
      | HTMLMediaElement
      | null;

    if (!playerInstance) {
      return null;
    }

    if (playerInstance instanceof HTMLMediaElement) {
      return playerInstance;
    }

    if (typeof playerInstance.getInternalPlayer === "function") {
      const internalPlayer = playerInstance.getInternalPlayer();
      if (internalPlayer instanceof HTMLMediaElement) {
        return internalPlayer;
      }
    }

    const mediaFromDom =
      playerContainerRef.current?.querySelector("video, audio");

    if (mediaFromDom instanceof HTMLMediaElement) {
      return mediaFromDom;
    }

    return null;
  }, []);

  const setupVolumeTracking = useCallback(() => {
    if (volumeTrackingCleanupRef.current) {
      volumeTrackingCleanupRef.current();
      volumeTrackingCleanupRef.current = null;
    }

    const mediaElement = resolveMediaElement();
    if (!mediaElement) {
      return;
    }

    const handleVolumeChange = () => {
      const newVolume = mediaElement.volume;
      if (typeof newVolume === "number" && newVolume >= 0 && newVolume <= 1) {
        useVideoScreenStore.getState().setLocalVolume(newVolume * 100);
      }
    };

    mediaElement.addEventListener("volumechange", handleVolumeChange);

    volumeTrackingCleanupRef.current = () => {
      mediaElement.removeEventListener("volumechange", handleVolumeChange);
    };
  }, [resolveMediaElement]);

  const handleReady = useCallback(() => {
    const savedProgressSeconds = parseDurationToSeconds(
      playerState.currentTrackProgress
    );

    if (savedProgressSeconds > 0 && !progressAppliedRef.current) {
      const mediaElement = resolveMediaElement();

      if (mediaElement) {
        mediaElement.currentTime = savedProgressSeconds;
        progressAppliedRef.current = true;

        console.log(
          `[useReactCustomPlayer] Восстановлен прогресс: ${savedProgressSeconds}s для трека ${track.trackName}`
        );
      }
    }

    setupVolumeTracking();
  }, [
    playerState.currentTrackProgress,
    resolveMediaElement,
    setupVolumeTracking,
    track.trackName,
  ]);

  const handleEnded = useCallback(() => {
    setLocalPlaybackOverride(false);

    if (isMainPlayer) {
      void useVideoScreenStore.getState().notifyEnded(track);
    }
  }, [isMainPlayer, track]);

  const handleStart = useCallback(() => {
    if (isMainPlayer) {
      void useVideoScreenStore.getState().notifyStarted(track);
    }
  }, [isMainPlayer, track]);

  const handleError = useCallback(() => {
    if (isMainPlayer) {
      void useVideoScreenStore.getState().notifyError(track);
    }
  }, [isMainPlayer, track]);

  const handleProgress = useCallback(
    (state: PlayerProgressState) => {
      if (isMainPlayer) {
        void useVideoScreenStore.getState().reportProgress(state.playedSeconds);
      }
    },
    [isMainPlayer]
  );

  const handlePlay = useCallback(() => {
    ignorePauseUntilRef.current = Date.now() + pauseSuppressionMs;
    setLocalPlaybackOverride(true);

    if (isMainPlayer) {
      void useVideoScreenStore
        .getState()
        .syncPlaybackState(PlayerStateStateEnum.Playing);
    }
  }, [isMainPlayer, pauseSuppressionMs]);

  const handlePlaying = useCallback(() => {
    isBufferingRef.current = false;
    ignorePauseUntilRef.current = Date.now() + pauseSuppressionMs;
    setLocalPlaybackOverride(true);

    if (isMainPlayer) {
      void useVideoScreenStore
        .getState()
        .syncPlaybackState(PlayerStateStateEnum.Playing);
    }
  }, [isMainPlayer, pauseSuppressionMs]);

  const handleWaiting = useCallback(() => {
    isBufferingRef.current = true;
  }, []);

  const handlePause = useCallback(() => {
    if (isBufferingRef.current) {
      return;
    }

    setLocalPlaybackOverride(false);

    if (Date.now() < ignorePauseUntilRef.current) {
      return;
    }

    if (isMainPlayer) {
      void useVideoScreenStore
        .getState()
        .syncPlaybackState(PlayerStateStateEnum.Paused);
    }
  }, [isMainPlayer]);

  const playerProps = useMemo(
    () => ({
      playing: isTrackPlaying,
      volume: localVolume / 100,
      muted: !isMainPlayer || shouldMute,
      onEnded: handleEnded,
      onStart: handleStart,
      onError: handleError,
      onProgress: handleProgress,
      onPlay: handlePlay,
      onPlaying: handlePlaying,
      onWaiting: handleWaiting,
      onPause: handlePause,
      onReady: handleReady,
    }),
    [
      handleEnded,
      handleError,
      handlePause,
      handlePlay,
      handlePlaying,
      handleProgress,
      handleReady,
      handleStart,
      handleWaiting,
      isMainPlayer,
      isTrackPlaying,
      localVolume,
      shouldMute,
    ]
  );

  const playerElement = useMemo(
    () => (
      <ReactPlayer
        ref={playerRef}
        key={playerKey}
        src={track.url}
        {...playerProps}
        width={playerView.width}
        height={playerView.height}
        controls={playerView.controls}
        style={playerView.style}
      />
    ),
    [
      playerKey,
      playerProps,
      playerView.controls,
      playerView.height,
      playerView.style,
      playerView.width,
      track.url,
    ]
  );

  return {
    playerContainerRef,
    playerElement,
    playbackInfo: {
      isTrackPlaying,
      maxTrackTimeSeconds,
    },
  };
}
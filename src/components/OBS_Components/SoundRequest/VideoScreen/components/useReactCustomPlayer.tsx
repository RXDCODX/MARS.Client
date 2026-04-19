import type {
  CSSProperties,
  ReactElement,
  RefObject,
  SyntheticEvent,
} from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactPlayer from "react-player";

import type { PlayerState, QueueItem } from "@/shared/api";
import { PlayerStateStateEnum } from "@/shared/api";

import { useVideoScreenStore } from "../store/useVideoScreenStore";
import { parseDurationToSeconds } from "../utils/parseDuration";

export interface UseReactCustomPlayerParams {
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
    currentSecondProgress: number;
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
  const playerKey = queueItemId || track.url;
  const signalRIsTrackPlaying =
    playerState.state === PlayerStateStateEnum.Playing;
  const [localPlaybackOverrideState, setLocalPlaybackOverrideState] = useState<{
    key: string;
    value: boolean | null;
  }>({ key: playerKey, value: null });
  const localPlaybackOverride =
    localPlaybackOverrideState.key === playerKey
      ? localPlaybackOverrideState.value
      : null;
  const effectiveLocalPlaybackOverride =
    localPlaybackOverride === signalRIsTrackPlaying
      ? null
      : localPlaybackOverride;

  const isTrackPlaying =
    effectiveLocalPlaybackOverride === null
      ? signalRIsTrackPlaying
      : effectiveLocalPlaybackOverride;

  const playerRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const progressAppliedRef = useRef<boolean>(false);
  const ignorePauseUntilRef = useRef<number>(0);
  const isBufferingRef = useRef<boolean>(false);
  const volumeTrackingCleanupRef = useRef<(() => void) | null>(null);

  const shouldMute = !hasUserInteracted || playerState.isMuted;
  const maxTrackTimeSeconds = useMemo(
    () => parseDurationToSeconds(track.duration),
    [track.duration]
  );
  const [currentSecondProgress, setCurrentSecondProgress] = useState<number>(0);

  useEffect(() => {
    progressAppliedRef.current = false;
  }, [playerKey]);

  useEffect(() => {
    if (isMainPlayer) {
      useVideoScreenStore.getState().registerTimeGetter(() => {
        const player = playerRef.current;
        if (player && typeof player.currentTime === "number") {
          return player.currentTime;
        }
        return 0;
      });

      return () => {
        useVideoScreenStore.getState().registerTimeGetter(null);
      };
    }
  }, [isMainPlayer]);

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
      }
    }

    setupVolumeTracking();
  }, [
    playerState.currentTrackProgress,
    resolveMediaElement,
    setupVolumeTracking,
  ]);

  const handleEnded = useCallback(() => {
    setLocalPlaybackOverrideState({ key: playerKey, value: false });

    if (isMainPlayer) {
      void useVideoScreenStore.getState().notifyEnded(track);
    }
  }, [isMainPlayer, playerKey, track]);

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
    (state: SyntheticEvent<HTMLVideoElement, Event>) => {
      const playedSeconds = state.currentTarget.currentTime;

      if (isMainPlayer) {
        void useVideoScreenStore.getState().reportProgress(playedSeconds);
        setCurrentSecondProgress(playedSeconds);
      }
    },
    [isMainPlayer]
  );

  const handlePlay = useCallback(() => {
    ignorePauseUntilRef.current = Date.now() + pauseSuppressionMs;
    setLocalPlaybackOverrideState({ key: playerKey, value: true });

    if (isMainPlayer) {
      void useVideoScreenStore
        .getState()
        .syncPlaybackState(PlayerStateStateEnum.Playing);
    }
  }, [isMainPlayer, pauseSuppressionMs, playerKey]);

  const handlePlaying = useCallback(() => {
    isBufferingRef.current = false;
    ignorePauseUntilRef.current = Date.now() + pauseSuppressionMs;
    setLocalPlaybackOverrideState({ key: playerKey, value: true });

    if (isMainPlayer) {
      void useVideoScreenStore
        .getState()
        .syncPlaybackState(PlayerStateStateEnum.Playing);
    }
  }, [isMainPlayer, pauseSuppressionMs, playerKey]);

  const handleWaiting = useCallback(() => {
    isBufferingRef.current = true;
  }, []);

  const handlePause = useCallback(() => {
    if (isBufferingRef.current) {
      return;
    }

    setLocalPlaybackOverrideState({ key: playerKey, value: false });

    if (Date.now() < ignorePauseUntilRef.current) {
      return;
    }

    if (isMainPlayer) {
      void useVideoScreenStore
        .getState()
        .syncPlaybackState(PlayerStateStateEnum.Paused);
    }
  }, [isMainPlayer, playerKey]);

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
      currentSecondProgress,
    },
  };
}

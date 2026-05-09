import {
  ApiMediaInfo,
  MediaFileInfoTypeEnum,
  MediaMetaInfoPriorityEnum,
} from "@/shared/api";

export const mediaInfoFileTypes: MediaFileInfoTypeEnum[] = [
  MediaFileInfoTypeEnum.Image,
  MediaFileInfoTypeEnum.Audio,
  MediaFileInfoTypeEnum.Video,
  MediaFileInfoTypeEnum.Gif,
];

export const mediaInfoPriorities: MediaMetaInfoPriorityEnum[] = [
  MediaMetaInfoPriorityEnum.Low,
  MediaMetaInfoPriorityEnum.Normal,
  MediaMetaInfoPriorityEnum.High,
];

export function createDefaultMediaInfo(
  overrides?: Partial<ApiMediaInfo>
): ApiMediaInfo {
  return {
    id: crypto.randomUUID(),
    textInfo: {
      text: "",
      textColor: "#ffffff",
      triggerWord: "",
      keyWordsColor: "#f7c948",
      keyWordSybmolDelimiter: "#",
    },
    fileInfo: {
      fileName: "",
      filePath: "",
      extension: "",
      isLocalFile: true,
      type: MediaFileInfoTypeEnum.Image,
    },
    positionInfo: {
      xCoordinate: 0,
      yCoordinate: 0,
      width: 960,
      height: 540,
      rotation: 0,
      randomCoordinates: false,
      isRotated: false,
      isResizeRequires: false,
      isProportion: true,
      isHorizontalCenter: true,
      isVerticallCenter: true,
      isUseOriginalWidthAndHeight: false,
    },
    metaInfo: {
      displayName: "",
      duration: 15,
      isLooped: false,
      priority: MediaMetaInfoPriorityEnum.Normal,
      twitchGuid: undefined,
      twitchPointsCost: 0,
      vip: false,
      volume: 100,
    },
    stylesInfo: {
      isBorder: false,
      isShowLetterbox: false,
    },
    ...overrides,
  };
}

export function updateMediaInfoValue(
  source: ApiMediaInfo,
  path: string,
  value: unknown
): ApiMediaInfo {
  const keys = path.split(".");
  const next = { ...source } as Record<string, unknown>;
  let current: Record<string, unknown> = next;

  for (let index = 0; index < keys.length - 1; index += 1) {
    const key = keys[index];
    current[key] = { ...(current[key] as Record<string, unknown>) };
    current = current[key] as Record<string, unknown>;
  }

  current[keys[keys.length - 1]] = value;

  return next as unknown as ApiMediaInfo;
}

export function formatMediaDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}с`;
  }

  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;

  return `${minutes}м ${rest.toString().padStart(2, "0")}с`;
}

export function formatMediaRewardId(rewardId?: string): string {
  if (!rewardId) {
    return "Не привязана";
  }

  return `${rewardId.slice(0, 8)}…${rewardId.slice(-6)}`;
}

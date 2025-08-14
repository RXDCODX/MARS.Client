/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ApiMediaInfo {
  /** @format uuid */
  id: string;
  textInfo: MediaTextInfo;
  fileInfo: MediaFileInfo;
  positionInfo: MediaPositionInfo;
  metaInfo: MediaMetaInfo;
  stylesInfo: MediaStylesInfo;
}

export interface CommandInfo {
  name: string;
  description: string;
  isAdminCommand: boolean;
  parameters: CommandParameterInfo[];
  availablePlatforms: (
    | "None"
    | "Api"
    | "Telegram"
    | "Twitch"
    | "Discord"
    | "Vk"
  )[];
}

export interface CommandParameterInfo {
  name: string;
  description: string;
  type: string;
  required: boolean;
  defaultValue?: string;
}

export interface MediaFileInfo {
  type:
    | "None"
    | "Image"
    | "Audio"
    | "Video"
    | "TelegramSticker"
    | "Voice"
    | "Gif";
  filePath: string;
  isLocalFile: boolean;
  fileName: string;
  extension: string;
}

export interface MediaMetaInfo {
  /** @format int32 */
  twitchPointsCost: number;
  /** @format uuid */
  twitchGuid?: string;
  vip: boolean;
  displayName: string;
  isLooped: boolean;
  /** @format int32 */
  duration: number;
  priority: "Low" | "Normal" | "High";
  /** @format int32 */
  volume: number;
}

export interface MediaPositionInfo {
  isProportion: boolean;
  isResizeRequires: boolean;
  /** @format int32 */
  height: number;
  /** @format int32 */
  width: number;
  isRotated: boolean;
  /** @format int32 */
  rotation: number;
  /** @format int32 */
  xCoordinate: number;
  /** @format int32 */
  yCoordinate: number;
  randomCoordinates: boolean;
  isVerticallCenter: boolean;
  isHorizontalCenter: boolean;
  isUseOriginalWidthAndHeight: boolean;
}

export interface MediaStylesInfo {
  isBorder: boolean;
}

export interface MediaTextInfo {
  keyWordsColor?: string;
  triggerWord?: string;
  text?: string;
  textColor?: string;
  keyWordSybmolDelimiter?: string;
}

export interface Move {
  characterName: string;
  command: string;
  isFromStance: boolean;
  stanceCode: string;
  stanceName?: string;
  heatEngage: boolean;
  heatSmash: boolean;
  powerCrush: boolean;
  throw: boolean;
  homing: boolean;
  tornado: boolean;
  heatBurst: boolean;
  requiresHeat: boolean;
  hitLevel?: string;
  damage?: string;
  startUpFrame?: string;
  blockFrame?: string;
  hitFrame?: string;
  counterHitFrame?: string;
  notes?: string[];
}

export interface MovePending {
  characterName: string;
  command: string;
  isFromStance: boolean;
  stanceCode: string;
  stanceName?: string;
  heatEngage: boolean;
  heatSmash: boolean;
  powerCrush: boolean;
  throw: boolean;
  homing: boolean;
  tornado: boolean;
  heatBurst: boolean;
  requiresHeat: boolean;
  hitLevel?: string;
  damage?: string;
  startUpFrame?: string;
  blockFrame?: string;
  hitFrame?: string;
  counterHitFrame?: string;
  notes?: string[];
}

export interface MovePendingDto {
  characterName: string;
  command: string;
  isFromStance: boolean;
  stanceCode: string;
  stanceName?: string;
  heatEngage: boolean;
  heatSmash: boolean;
  powerCrush: boolean;
  throw: boolean;
  homing: boolean;
  tornado: boolean;
  heatBurst: boolean;
  requiresHeat: boolean;
  hitLevel?: string;
  damage?: string;
  startUpFrame?: string;
  blockFrame?: string;
  hitFrame?: string;
  counterHitFrame?: string;
  notes?: string[];
  isNew: boolean;
}

export interface ParseRequest {
  source: "None" | "Wavu" | "Tekkendocs";
  characterNames?: string[];
  /** @format int32 */
  requestDelaySeconds?: number;
  /** @format int32 */
  characterDelaySeconds?: number;
  useStagingService?: boolean;
  parseMoves?: boolean;
  /** @format int32 */
  maxRetries?: number;
  /** @format int32 */
  httpTimeoutSeconds?: number;
}

export interface ParseResult {
  success: boolean;
  parsedCharacters: string[];
  message: string;
}

export interface ServiceInfo {
  name: string;
  displayName: string;
  description: string;
  status: "Running" | "Stopped" | "Starting" | "Stopping" | "Error" | "Unknown";
  /** @format date-time */
  startTime?: string;
  /** @format date-time */
  lastActivity?: string;
  isEnabled: boolean;
  configuration: Record<string, any>;
}

export interface ServiceLog {
  /** @format date-time */
  timestamp: string;
  level: string;
  message: string;
  exception?: string;
}

export interface TekkenCharacter {
  /** @minLength 1 */
  name: string;
  displayName: string;
  /** @maxLength 300 */
  linkToImage?: string;
  /** @maxLength 200 */
  pageUrl: string;
  /** @format byte */
  image?: string;
  /** @maxLength 20 */
  imageExtension?: string;
  /** @format byte */
  avatarImage?: string;
  /** @maxLength 20 */
  avatarImageExtension?: string;
  /** @format byte */
  fullBodyImage?: string;
  /** @maxLength 20 */
  fullBodyImageExtension?: string;
  movelist?: Move[];
  /** @format date-time */
  lastUpdateTime: string;
  description?: string;
  strengths?: string[];
  weaknesess?: string[];
}

export interface TekkenCharacterPendingDto {
  /** @minLength 1 */
  name: string;
  /** @maxLength 300 */
  linkToImage?: string;
  /** @maxLength 200 */
  pageUrl: string;
  /** @format byte */
  image?: string;
  /** @maxLength 20 */
  imageExtension?: string;
  /** @format byte */
  avatarImage?: string;
  /** @maxLength 20 */
  avatarImageExtension?: string;
  /** @format byte */
  fullBodyImage?: string;
  /** @maxLength 20 */
  fullBodyImageExtension?: string;
  movelist?: MovePending[];
  /** @format date-time */
  lastUpdateTime: string;
  description?: string;
  strengths?: string[];
  weaknesess?: string[];
  isNew: boolean;
}

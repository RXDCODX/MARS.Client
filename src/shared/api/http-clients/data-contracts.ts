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

export interface CinemaQueueStatistics {
  /** @format int32 */
  totalItems: number;
  /** @format int32 */
  pendingItems: number;
  /** @format int32 */
  inProgressItems: number;
  /** @format int32 */
  completedItems: number;
  /** @format int32 */
  cancelledItems: number;
  /** @format int32 */
  postponedItems: number;
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

export interface CreateCustomRewardsRequest {
  title?: string;
  prompt?: string;
  /** @format int32 */
  cost: number;
  isEnabled: boolean;
  backgroundColor?: string;
  isUserInputRequired: boolean;
  isMaxPerStreamEnabled: boolean;
  /** @format int32 */
  maxPerStream?: number;
  isMaxPerUserPerStreamEnabled: boolean;
  /** @format int32 */
  maxPerUserPerStream?: number;
  isGlobalCooldownEnabled: boolean;
  /** @format int32 */
  globalCooldownSeconds?: number;
  shouldRedemptionsSkipRequestQueue: boolean;
}

export interface CreateMediaItemRequest {
  title: string;
  description?: string;
  mediaUrl: string;
  /** @format int32 */
  priority: number;
  /** @format date-time */
  scheduledFor?: string;
  addedBy?: string;
  twitchUserId?: string;
  twitchUsername?: string;
  notes?: string;
}

export interface CreateMemeOrderDto {
  /** @minLength 1 */
  filePath: string;
  /** @format int32 */
  memeTypeId?: number;
}

export interface CreateMemeTypeDto {
  /**
   * @minLength 1
   * @maxLength 50
   */
  name: string;
  /** @minLength 1 */
  folderPath: string;
}

export interface CreateUserRequest {
  twitchId?: string;
  /** @format int64 */
  telegramId?: number;
  ltmidV2: string;
  lTokenV2: string;
  ltuidV2: string;
}

export interface CustomReward {
  broadcasterId?: string;
  broadcasterLogin?: string;
  broadcasterName?: string;
  id?: string;
  title?: string;
  prompt?: string;
  /** @format int32 */
  cost: number;
  image?: Image;
  defaultImage?: DefaultImage;
  backgroundColor?: string;
  isEnabled: boolean;
  isUserInputRequired: boolean;
  maxPerStreamSetting?: MaxPerStreamSetting;
  maxPerUserPerStreamSetting?: MaxPerUserPerStreamSetting;
  globalCooldownSetting?: GlobalCooldownSetting;
  isPaused: boolean;
  isInStock: boolean;
  shouldRedemptionsSkipQueue: boolean;
  /** @format int32 */
  redemptionsRedeemedCurrentStream?: number;
  cooldownExpiresAt?: string;
}

export interface DailyAutoMarkupUser {
  /** @format uuid */
  id: string;
  twitchId?: string;
  /** @format int64 */
  telegramId?: number;
  /** @format date-time */
  createdAt?: string;
  ltmidV2: string;
  lTokenV2: string;
  ltuidV2: string;
  /** @format date-time */
  lastAutoMarkup: string;
}

export interface DefaultImage {
  url1x?: string;
  url2x?: string;
  url4x?: string;
}

export interface GetCustomRewardRedemptionResponse {
  data?: RewardRedemption[];
  pagination?: Pagination;
}

export interface GlobalCooldownSetting {
  isEnabled: boolean;
  /** @format int32 */
  globalCooldownSeconds: number;
}

export interface Image {
  url1x?: string;
  url2x?: string;
  url4x?: string;
}

export interface MaxPerStreamSetting {
  isEnabled: boolean;
  /** @format int32 */
  maxPerStream: number;
}

export interface MaxPerUserPerStreamSetting {
  isEnabled: boolean;
  /** @format int32 */
  maxPerUserPerStream: number;
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

export interface MediaItemDto {
  /** @format uuid */
  id: string;
  title: string;
  description?: string;
  mediaUrl: string;
  status: "Pending" | "InProgress" | "Completed" | "Cancelled" | "Postponed";
  /** @format int32 */
  priority: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  scheduledFor?: string;
  addedBy?: string;
  twitchUserId?: string;
  twitchUsername?: string;
  notes?: string;
  isNext: boolean;
  /** @format date-time */
  lastModified?: string;
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

export interface MemeOrderDto {
  /** @format uuid */
  id: string;
  /** @format int32 */
  order: number;
  /** @minLength 1 */
  filePath: string;
  /** @format int32 */
  memeTypeId?: number;
  type?: MemeTypeDto;
}

export interface MemeTypeDto {
  /** @format int32 */
  id: number;
  /**
   * @minLength 1
   * @maxLength 50
   */
  name: string;
  /** @minLength 1 */
  folderPath: string;
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

export interface Pagination {
  cursor?: string;
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

export interface ProblemDetails {
  type?: string;
  title?: string;
  /** @format int32 */
  status?: number;
  detail?: string;
  instance?: string;
  [key: string]: any;
}

export interface Reward {
  id?: string;
  title?: string;
  prompt?: string;
  /** @format int32 */
  cost: number;
}

export interface RewardRedemption {
  broadcasterId?: string;
  broadcasterLogin?: string;
  broadcasterName?: string;
  id?: string;
  userId?: string;
  userLogin?: string;
  userName?: string;
  userInput?: string;
  status: "UNFULFILLED" | "FULFILLED" | "CANCELED";
  /** @format date-time */
  redeemedAt: string;
  reward?: Reward;
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

export interface UpdateCustomRewardRedemptionStatusRequest {
  status: "UNFULFILLED" | "FULFILLED" | "CANCELED";
}

export interface UpdateCustomRewardRequest {
  broadcasterId?: string;
  title?: string;
  prompt?: string;
  /** @format int32 */
  cost?: number;
  isEnabled?: boolean;
  backgroundColor?: string;
  isUserInputRequired?: boolean;
  isMaxPerStreamEnabled?: boolean;
  /** @format int32 */
  maxPerStream?: number;
  isMaxPerUserPerStreamEnabled?: boolean;
  /** @format int32 */
  maxPerUserPerStream?: number;
  isGlobalCooldownEnabled?: boolean;
  /** @format int32 */
  globalCooldownSeconds?: number;
  isPaused?: boolean;
  shouldRedemptionsSkipRequestQueue?: boolean;
}

export interface UpdateMediaItemRequest {
  title?: string;
  description?: string;
  mediaUrl?: string;
  status?: "Pending" | "InProgress" | "Completed" | "Cancelled" | "Postponed";
  /** @format int32 */
  priority?: number;
  /** @format date-time */
  scheduledFor?: string;
  notes?: string;
  isNext?: boolean;
}

export interface UpdateMemeTypeDto {
  /**
   * @minLength 1
   * @maxLength 50
   */
  name: string;
  /** @minLength 1 */
  folderPath: string;
}

export interface UpdateUserRequest {
  twitchId?: string;
  /** @format int64 */
  telegramId?: number;
  ltmidV2?: string;
  lTokenV2?: string;
  ltuidV2?: string;
}

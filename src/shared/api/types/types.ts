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
  fileInfo: MediaFileInfo;
  /** @format uuid */
  id: string;
  metaInfo: MediaMetaInfo;
  positionInfo: MediaPositionInfo;
  stylesInfo: MediaStylesInfo;
  textInfo: MediaTextInfo;
}

export interface CinemaQueueStatistics {
  /** @format int32 */
  cancelledItems: number;
  /** @format int32 */
  completedItems: number;
  /** @format int32 */
  inProgressItems: number;
  /** @format int32 */
  pendingItems: number;
  /** @format int32 */
  postponedItems: number;
  /** @format int32 */
  totalItems: number;
}

export enum CinemaQueueStatusDetailParamsEnum {
  Pending = "Pending",
  InProgress = "InProgress",
  Completed = "Completed",
  Cancelled = "Cancelled",
  Postponed = "Postponed",
}

export enum CinemaQueueStatusDetailParamsStatusEnum {
  Pending = "Pending",
  InProgress = "InProgress",
  Completed = "Completed",
  Cancelled = "Cancelled",
  Postponed = "Postponed",
}

export interface CommandInfo {
  availablePlatforms: CommandInfoAvailablePlatformsEnum[];
  description: string;
  isAdminCommand: boolean;
  name: string;
  parameters: CommandParameterInfo[];
}

export enum CommandInfoAvailablePlatformsEnum {
  None = "None",
  Api = "Api",
  Telegram = "Telegram",
  Twitch = "Twitch",
  Discord = "Discord",
  Vk = "Vk",
}

export interface CommandParameterInfo {
  defaultValue?: string;
  description: string;
  name: string;
  required: boolean;
  type: string;
}

export enum CommandsAdminPlatformDetailParamsEnum {
  None = "None",
  Api = "Api",
  Telegram = "Telegram",
  Twitch = "Twitch",
  Discord = "Discord",
  Vk = "Vk",
}

export enum CommandsAdminPlatformDetailParamsPlatformEnum {
  None = "None",
  Api = "Api",
  Telegram = "Telegram",
  Twitch = "Twitch",
  Discord = "Discord",
  Vk = "Vk",
}

export enum CommandsAdminPlatformInfoListParamsEnum {
  None = "None",
  Api = "Api",
  Telegram = "Telegram",
  Twitch = "Twitch",
  Discord = "Discord",
  Vk = "Vk",
}

export enum CommandsAdminPlatformInfoListParamsPlatformEnum {
  None = "None",
  Api = "Api",
  Telegram = "Telegram",
  Twitch = "Twitch",
  Discord = "Discord",
  Vk = "Vk",
}

export enum CommandsUserPlatformDetailParamsEnum {
  None = "None",
  Api = "Api",
  Telegram = "Telegram",
  Twitch = "Twitch",
  Discord = "Discord",
  Vk = "Vk",
}

export enum CommandsUserPlatformDetailParamsPlatformEnum {
  None = "None",
  Api = "Api",
  Telegram = "Telegram",
  Twitch = "Twitch",
  Discord = "Discord",
  Vk = "Vk",
}

export enum CommandsUserPlatformInfoListParamsEnum {
  None = "None",
  Api = "Api",
  Telegram = "Telegram",
  Twitch = "Twitch",
  Discord = "Discord",
  Vk = "Vk",
}

export enum CommandsUserPlatformInfoListParamsPlatformEnum {
  None = "None",
  Api = "Api",
  Telegram = "Telegram",
  Twitch = "Twitch",
  Discord = "Discord",
  Vk = "Vk",
}

export interface CreateCustomRewardsRequest {
  backgroundColor?: string;
  /** @format int32 */
  cost: number;
  /** @format int32 */
  globalCooldownSeconds?: number;
  isEnabled: boolean;
  isGlobalCooldownEnabled: boolean;
  isMaxPerStreamEnabled: boolean;
  isMaxPerUserPerStreamEnabled: boolean;
  isUserInputRequired: boolean;
  /** @format int32 */
  maxPerStream?: number;
  /** @format int32 */
  maxPerUserPerStream?: number;
  prompt?: string;
  shouldRedemptionsSkipRequestQueue: boolean;
  title?: string;
}

export interface CreateMediaItemRequest {
  addedBy?: string;
  description?: string;
  mediaUrl: string;
  notes?: string;
  /** @format int32 */
  priority: number;
  /** @format date-time */
  scheduledFor?: string;
  title: string;
  twitchUserId?: string;
  twitchUsername?: string;
}

export interface CreateMemeOrderDto {
  /** @minLength 1 */
  filePath: string;
  /** @format int32 */
  memeTypeId?: number;
}

export interface CreateMemeTypeDto {
  /** @minLength 1 */
  folderPath: string;
  /**
   * @minLength 1
   * @maxLength 50
   */
  name: string;
}

export interface CreateUserRequest {
  lTokenV2: string;
  ltmidV2: string;
  ltuidV2: string;
  /** @format int64 */
  telegramId?: number;
  twitchId?: string;
}

export interface CustomReward {
  backgroundColor?: string;
  broadcasterId?: string;
  broadcasterLogin?: string;
  broadcasterName?: string;
  cooldownExpiresAt?: string;
  /** @format int32 */
  cost: number;
  defaultImage?: DefaultImage;
  globalCooldownSetting?: GlobalCooldownSetting;
  id?: string;
  image?: Image;
  isEnabled: boolean;
  isInStock: boolean;
  isPaused: boolean;
  isUserInputRequired: boolean;
  maxPerStreamSetting?: MaxPerStreamSetting;
  maxPerUserPerStreamSetting?: MaxPerUserPerStreamSetting;
  prompt?: string;
  /** @format int32 */
  redemptionsRedeemedCurrentStream?: number;
  shouldRedemptionsSkipQueue: boolean;
  title?: string;
}

export interface DailyAutoMarkupUser {
  lTokenV2: string;
  ltmidV2: string;
  ltuidV2: string;
  /** @format date-time */
  createdAt?: string;
  /** @format uuid */
  id: string;
  /** @format date-time */
  lastAutoMarkup: string;
  /** @format int64 */
  telegramId?: number;
  twitchId?: string;
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
  /** @format int32 */
  globalCooldownSeconds: number;
  isEnabled: boolean;
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
  extension: string;
  fileName: string;
  filePath: string;
  isLocalFile: boolean;
  type: MediaFileInfoTypeEnum;
}

export enum MediaFileInfoTypeEnum {
  None = "None",
  Image = "Image",
  Audio = "Audio",
  Video = "Video",
  TelegramSticker = "TelegramSticker",
  Voice = "Voice",
  Gif = "Gif",
}

export interface MediaItemDto {
  addedBy?: string;
  /** @format date-time */
  createdAt: string;
  description?: string;
  /** @format uuid */
  id: string;
  isNext: boolean;
  /** @format date-time */
  lastModified?: string;
  mediaUrl: string;
  notes?: string;
  /** @format int32 */
  priority: number;
  /** @format date-time */
  scheduledFor?: string;
  status: MediaItemDtoStatusEnum;
  title: string;
  twitchUserId?: string;
  twitchUsername?: string;
}

export enum MediaItemDtoStatusEnum {
  Pending = "Pending",
  InProgress = "InProgress",
  Completed = "Completed",
  Cancelled = "Cancelled",
  Postponed = "Postponed",
}

export interface MediaMetaInfo {
  displayName: string;
  /** @format int32 */
  duration: number;
  isLooped: boolean;
  priority: MediaMetaInfoPriorityEnum;
  /** @format uuid */
  twitchGuid?: string;
  /** @format int32 */
  twitchPointsCost: number;
  vip: boolean;
  /** @format int32 */
  volume: number;
}

export enum MediaMetaInfoPriorityEnum {
  Low = "Low",
  Normal = "Normal",
  High = "High",
}

export interface MediaPositionInfo {
  /** @format int32 */
  height: number;
  isHorizontalCenter: boolean;
  isProportion: boolean;
  isResizeRequires: boolean;
  isRotated: boolean;
  isUseOriginalWidthAndHeight: boolean;
  isVerticallCenter: boolean;
  randomCoordinates: boolean;
  /** @format int32 */
  rotation: number;
  /** @format int32 */
  width: number;
  /** @format int32 */
  xCoordinate: number;
  /** @format int32 */
  yCoordinate: number;
}

export interface MediaStylesInfo {
  isBorder: boolean;
}

export interface MediaTextInfo {
  keyWordSybmolDelimiter?: string;
  keyWordsColor?: string;
  text?: string;
  textColor?: string;
  triggerWord?: string;
}

export interface MemeOrderDto {
  /** @minLength 1 */
  filePath: string;
  /** @format uuid */
  id: string;
  /** @format int32 */
  memeTypeId?: number;
  /** @format int32 */
  order: number;
  type?: MemeTypeDto;
}

export interface MemeTypeDto {
  /** @minLength 1 */
  folderPath: string;
  /** @format int32 */
  id: number;
  /**
   * @minLength 1
   * @maxLength 50
   */
  name: string;
}

export interface Move {
  blockFrame?: string;
  characterName: string;
  command: string;
  counterHitFrame?: string;
  damage?: string;
  heatBurst: boolean;
  heatEngage: boolean;
  heatSmash: boolean;
  hitFrame?: string;
  hitLevel?: string;
  homing: boolean;
  isFromStance: boolean;
  notes?: string[];
  powerCrush: boolean;
  requiresHeat: boolean;
  stanceCode: string;
  stanceName?: string;
  startUpFrame?: string;
  throw: boolean;
  tornado: boolean;
}

export interface MovePending {
  blockFrame?: string;
  characterName: string;
  command: string;
  counterHitFrame?: string;
  damage?: string;
  heatBurst: boolean;
  heatEngage: boolean;
  heatSmash: boolean;
  hitFrame?: string;
  hitLevel?: string;
  homing: boolean;
  isFromStance: boolean;
  notes?: string[];
  powerCrush: boolean;
  requiresHeat: boolean;
  stanceCode: string;
  stanceName?: string;
  startUpFrame?: string;
  throw: boolean;
  tornado: boolean;
}

export interface MovePendingDto {
  blockFrame?: string;
  characterName: string;
  command: string;
  counterHitFrame?: string;
  damage?: string;
  heatBurst: boolean;
  heatEngage: boolean;
  heatSmash: boolean;
  hitFrame?: string;
  hitLevel?: string;
  homing: boolean;
  isFromStance: boolean;
  isNew: boolean;
  notes?: string[];
  powerCrush: boolean;
  requiresHeat: boolean;
  stanceCode: string;
  stanceName?: string;
  startUpFrame?: string;
  throw: boolean;
  tornado: boolean;
}

export interface Pagination {
  cursor?: string;
}

export interface ParseRequest {
  /** @format int32 */
  characterDelaySeconds?: number;
  characterNames?: string[];
  /** @format int32 */
  httpTimeoutSeconds?: number;
  /** @format int32 */
  maxRetries?: number;
  parseMoves?: boolean;
  /** @format int32 */
  requestDelaySeconds?: number;
  source: ParseRequestSourceEnum;
  useStagingService?: boolean;
}

export enum ParseRequestSourceEnum {
  None = "None",
  Wavu = "Wavu",
  Tekkendocs = "Tekkendocs",
}

export interface ParseResult {
  message: string;
  parsedCharacters: string[];
  success: boolean;
}

export interface ProblemDetails {
  detail?: string;
  instance?: string;
  /** @format int32 */
  status?: number;
  title?: string;
  type?: string;
  [key: string]: any;
}

export interface Reward {
  /** @format int32 */
  cost: number;
  id?: string;
  prompt?: string;
  title?: string;
}

export interface RewardRedemption {
  broadcasterId?: string;
  broadcasterLogin?: string;
  broadcasterName?: string;
  id?: string;
  /** @format date-time */
  redeemedAt: string;
  reward?: Reward;
  status: RewardRedemptionStatusEnum;
  userId?: string;
  userInput?: string;
  userLogin?: string;
  userName?: string;
}

export enum RewardRedemptionStatusEnum {
  UNFULFILLED = "UNFULFILLED",
  FULFILLED = "FULFILLED",
  CANCELED = "CANCELED",
}

export interface ServiceInfo {
  configuration: Record<string, any>;
  description: string;
  displayName: string;
  isEnabled: boolean;
  /** @format date-time */
  lastActivity?: string;
  name: string;
  /** @format date-time */
  startTime?: string;
  status: ServiceInfoStatusEnum;
}

export enum ServiceInfoStatusEnum {
  Running = "Running",
  Stopped = "Stopped",
  Starting = "Starting",
  Stopping = "Stopping",
  Error = "Error",
  Unknown = "Unknown",
}

export interface ServiceLog {
  exception?: string;
  level: string;
  message: string;
  /** @format date-time */
  timestamp: string;
}

export interface TekkenCharacter {
  /** @format byte */
  avatarImage?: string;
  /** @maxLength 20 */
  avatarImageExtension?: string;
  description?: string;
  displayName: string;
  /** @format byte */
  fullBodyImage?: string;
  /** @maxLength 20 */
  fullBodyImageExtension?: string;
  /** @format byte */
  image?: string;
  /** @maxLength 20 */
  imageExtension?: string;
  /** @format date-time */
  lastUpdateTime: string;
  /** @maxLength 300 */
  linkToImage?: string;
  movelist?: Move[];
  /** @minLength 1 */
  name: string;
  /** @maxLength 200 */
  pageUrl: string;
  strengths?: string[];
  weaknesess?: string[];
}

export interface TekkenCharacterPendingDto {
  /** @format byte */
  avatarImage?: string;
  /** @maxLength 20 */
  avatarImageExtension?: string;
  description?: string;
  /** @format byte */
  fullBodyImage?: string;
  /** @maxLength 20 */
  fullBodyImageExtension?: string;
  /** @format byte */
  image?: string;
  /** @maxLength 20 */
  imageExtension?: string;
  isNew: boolean;
  /** @format date-time */
  lastUpdateTime: string;
  /** @maxLength 300 */
  linkToImage?: string;
  movelist?: MovePending[];
  /** @minLength 1 */
  name: string;
  /** @maxLength 200 */
  pageUrl: string;
  strengths?: string[];
  weaknesess?: string[];
}

export interface UpdateCustomRewardRedemptionStatusRequest {
  status: UpdateCustomRewardRedemptionStatusRequestStatusEnum;
}

export enum UpdateCustomRewardRedemptionStatusRequestStatusEnum {
  UNFULFILLED = "UNFULFILLED",
  FULFILLED = "FULFILLED",
  CANCELED = "CANCELED",
}

export interface UpdateCustomRewardRequest {
  backgroundColor?: string;
  broadcasterId?: string;
  /** @format int32 */
  cost?: number;
  /** @format int32 */
  globalCooldownSeconds?: number;
  isEnabled?: boolean;
  isGlobalCooldownEnabled?: boolean;
  isMaxPerStreamEnabled?: boolean;
  isMaxPerUserPerStreamEnabled?: boolean;
  isPaused?: boolean;
  isUserInputRequired?: boolean;
  /** @format int32 */
  maxPerStream?: number;
  /** @format int32 */
  maxPerUserPerStream?: number;
  prompt?: string;
  shouldRedemptionsSkipRequestQueue?: boolean;
  title?: string;
}

export interface UpdateMediaItemRequest {
  description?: string;
  isNext?: boolean;
  mediaUrl?: string;
  notes?: string;
  /** @format int32 */
  priority?: number;
  /** @format date-time */
  scheduledFor?: string;
  status: UpdateMediaItemRequestStatusEnum;
  title?: string;
}

export enum UpdateMediaItemRequestStatusEnum {
  Pending = "Pending",
  InProgress = "InProgress",
  Completed = "Completed",
  Cancelled = "Cancelled",
  Postponed = "Postponed",
}

export interface UpdateMemeTypeDto {
  /** @minLength 1 */
  folderPath: string;
  /**
   * @minLength 1
   * @maxLength 50
   */
  name: string;
}

export interface UpdateUserRequest {
  lTokenV2?: string;
  ltmidV2?: string;
  ltuidV2?: string;
  /** @format int64 */
  telegramId?: number;
  twitchId?: string;
}

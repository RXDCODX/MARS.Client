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

/**
 * Обобщенный результат операции
 * @template TData - Тип данных, возвращаемых в поле data
 */
export interface OperationResult<TData = any> {
  /** Флаг успешности операции */
  success: boolean;
  /** Сообщение о результате операции */
  message?: string;
  /** Данные результата операции */
  data?: TData;
}

export interface ApiMediaInfo {
  /** @format uuid */
  id: string;
  textInfo: MediaTextInfo;
  fileInfo: MediaFileInfo;
  positionInfo: MediaPositionInfo;
  metaInfo: MediaMetaInfo;
  stylesInfo: MediaStylesInfo;
}

export interface AutoMessageDto {
  /** @format uuid */
  id: string;
  message: string;
}

export interface BaseTrackInfo {
  /** @format uuid */
  id: string;
  trackName: string;
  authors?: string[];
  /** @format date-span */
  duration: string;
  /** @format uri */
  url: string;
  /** @format date-time */
  lastTimePlays: string;
  artworkUrl?: string;
  videoId?: string;
  isDeleted: boolean;
  /** @format int32 */
  queueOrder?: number;
  /** @maxLength 50 */
  requestedByTwitchId?: string;
  requestedByTwitchUser?: TwitchUser;
  title: string;
}

export interface ChannelRewardDefinition {
  title: string;
  /** @format int32 */
  cost: number;
  isEnabled: boolean;
  prompt?: string;
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

export interface ChannelRewardRecord {
  /** @format uuid */
  id: string;
  /** @minLength 1 */
  title: string;
  /** @format int32 */
  cost: number;
  isEnabled: boolean;
  prompt?: string;
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
  isDeleted: boolean;
  twitchRewardId?: string;
  /** @format uuid */
  mediaInfoId?: string;
}

export interface CinemaMediaItemDto {
  /** @format uuid */
  id: string;
  title?: string;
  description?: string;
  mediaUrl: string;
  status: CinemaMediaItemDtoStatusEnum;
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
  availablePlatforms: CommandInfoAvailablePlatformsEnum[];
  visibility: CommandInfoVisibilityEnum;
}

export interface CommandParameterInfo {
  name: string;
  description: string;
  type: string;
  required: boolean;
  defaultValue?: string;
}

export interface CreateAutoMessageRequest {
  message: string;
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
  title?: string;
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
  /** @maxLength 50 */
  twitchId?: string;
  twitchUser?: TwitchUser;
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

export interface FollowerInfo {
  /** @minLength 1 */
  userId: string;
  twitchUser?: TwitchUser;
}

export interface GetCustomRewardRedemptionResponse {
  data?: RewardRedemption[];
  pagination?: Pagination;
}

export interface GetCustomRewardsResponse {
  data?: CustomReward[];
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

export interface Log {
  /** @format uuid */
  id: string;
  /** @format date-time */
  whenLogged: string;
  message: string;
  stackTrace?: string;
  logLevel: LogLogLevelEnum;
}

export interface LogResponse {
  logs: Log[];
  /** @format int32 */
  totalCount: number;
  /** @format int32 */
  page: number;
  /** @format int32 */
  pageSize: number;
  /** @format int32 */
  totalPages: number;
}

export interface LogsStatistics {
  /** @format int32 */
  totalLogs: number;
  /** @format int32 */
  warningLogs: number;
  /** @format int32 */
  errorLogs: number;
  /** @format int32 */
  criticalLogs: number;
  /** @format date-time */
  oldestLogDate?: string;
  /** @format date-time */
  newestLogDate?: string;
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
  type: MediaFileInfoTypeEnum;
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
  priority: MediaMetaInfoPriorityEnum;
  /** @format int32 */
  volume: number;
}

export interface MediaMetadata {
  title: string;
  description?: string;
  imageUrl?: string;
  sourceUrl?: string;
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
  source: ParseRequestSourceEnum;
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

export interface PlayerState {
  /** @format uuid */
  id: string;
  /** @format uuid */
  currentTrackId?: string;
  /** @format uuid */
  nextTrackId?: string;
  /** @format date-span */
  currentTrackProgress?: string;
  state: PlayerStateStateEnum;
  isMuted: boolean;
  /** @format float */
  volume: number;
  /** @maxLength 50 */
  currentTrackRequestedBy?: string;
  currentTrackRequestedByTwitchUser?: TwitchUser;
  currentTrack?: BaseTrackInfo;
  nextTrack?: BaseTrackInfo;
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

export interface RateLimiterInfo {
  /** @format int32 */
  availablePerSecond: number;
  /** @format int32 */
  availablePerMinute: number;
  /** @format date-span */
  timeToResetSecond: string;
  /** @format date-span */
  timeToResetMinute: string;
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
  status: RewardRedemptionStatusEnum;
  /** @format date-time */
  redeemedAt: string;
  reward?: Reward;
}

export interface ServiceInfo {
  name: string;
  displayName: string;
  description: string;
  status: ServiceInfoStatusEnum;
  /** @format date-time */
  startTime?: string;
  /** @format date-time */
  lastActivity?: string;
  isEnabled: boolean;
}

export interface ServiceLog {
  /** @format date-time */
  timestamp: string;
  level: string;
  message: string;
  exception?: string;
}

export interface StreamArchiveConfig {
  /** @format uuid */
  id: string;
  /** @format int64 */
  telegramChannelId: number;
  fileNameFormat: string;
  /** @format date-span */
  checkSpan: string;
  folderPath: string;
  isConvertFile: boolean;
  fileConvertType: StreamArchiveConfigFileConvertTypeEnum;
}

export interface SupplementRequest {
  source: SupplementRequestSourceEnum;
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

export interface TwitchUser {
  /**
   * @minLength 1
   * @maxLength 50
   */
  twitchId: string;
  /**
   * @minLength 1
   * @maxLength 100
   */
  userLogin: string;
  /**
   * @minLength 1
   * @maxLength 100
   */
  displayName: string;
  /** @maxLength 500 */
  profileImageUrl?: string;
  /** @maxLength 20 */
  chatColor?: string;
  isModerator: boolean;
  isVip: boolean;
  /** @format date-time */
  followedAt?: string;
  /** @format date-time */
  lastUpdated: string;
  /** @format date-time */
  createdAt: string;
  isSimpleUser: boolean;
}

export interface UpdateAutoMessageRequest {
  message?: string;
}

export interface UpdateCustomRewardDto {
  title?: string;
  /** @format int32 */
  cost?: number;
  isEnabled?: boolean;
  prompt?: string;
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
  shouldRedemptionsSkipRequestQueue?: boolean;
}

export interface UpdateCustomRewardRedemptionStatusRequest {
  status: UpdateCustomRewardRedemptionStatusRequestStatusEnum;
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
  status: UpdateMediaItemRequestStatusEnum;
  /** @format int32 */
  priority?: number;
  /** @format date-time */
  scheduledFor?: string;
  notes?: string;
  isNext?: boolean;
}

export interface UpdateMemeOrderDto {
  /** @minLength 1 */
  filePath: string;
  /** @format int32 */
  memeTypeId?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  order: number;
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

export interface ValidateFolderRequest {
  folderPath: string;
}

export interface ValidateFolderResponse {
  exists: boolean;
  accessible: boolean;
  /** @format int32 */
  videoFilesCount: number;
  sampleFiles: string[];
}

export enum CinemaMediaItemDtoStatusEnum {
  Pending = "Pending",
  InProgress = "InProgress",
  Completed = "Completed",
  Cancelled = "Cancelled",
  Postponed = "Postponed",
}

export enum CommandInfoAvailablePlatformsEnum {
  None = "None",
  Api = "Api",
  Telegram = "Telegram",
  Twitch = "Twitch",
  Discord = "Discord",
  Vk = "Vk",
  All = "All",
}

export enum CommandInfoVisibilityEnum {
  None = "None",
  FullList = "FullList",
  ShortList = "ShortList",
  All = "All",
}

export enum LogLogLevelEnum {
  Trace = "Trace",
  Debug = "Debug",
  Information = "Information",
  Warning = "Warning",
  Error = "Error",
  Critical = "Critical",
  None = "None",
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

export enum MediaMetaInfoPriorityEnum {
  Low = "Low",
  Normal = "Normal",
  High = "High",
}

export enum ParseRequestSourceEnum {
  None = "None",
  Wavu = "Wavu",
  Tekkendocs = "Tekkendocs",
}

export enum PlayerStateStateEnum {
  Stopped = "Stopped",
  Playing = "Playing",
  Paused = "Paused",
  SwitchingTrack = "SwitchingTrack",
  WaitingForTrack = "WaitingForTrack",
}

export enum RewardRedemptionStatusEnum {
  UNFULFILLED = "UNFULFILLED",
  FULFILLED = "FULFILLED",
  CANCELED = "CANCELED",
}

export enum ServiceInfoStatusEnum {
  Running = "Running",
  Stopped = "Stopped",
  Starting = "Starting",
  Stopping = "Stopping",
  Error = "Error",
  Unknown = "Unknown",
}

export enum StreamArchiveConfigFileConvertTypeEnum {
  None = "None",
  Mp4 = "Mp4",
  Webm = "Webm",
  Mkv = "Mkv",
  Avi = "Avi",
  Mov = "Mov",
}

export enum SupplementRequestSourceEnum {
  None = "None",
  Wavu = "Wavu",
  Tekkendocs = "Tekkendocs",
}

export enum UpdateCustomRewardRedemptionStatusRequestStatusEnum {
  UNFULFILLED = "UNFULFILLED",
  FULFILLED = "FULFILLED",
  CANCELED = "CANCELED",
}

export enum UpdateMediaItemRequestStatusEnum {
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

export enum CinemaQueueStatusDetailParamsEnum {
  Pending = "Pending",
  InProgress = "InProgress",
  Completed = "Completed",
  Cancelled = "Cancelled",
  Postponed = "Postponed",
}

export enum CommandsUserPlatformDetailParamsPlatformEnum {
  None = "None",
  Api = "Api",
  Telegram = "Telegram",
  Twitch = "Twitch",
  Discord = "Discord",
  Vk = "Vk",
  All = "All",
}

export enum CommandsUserPlatformDetailParamsEnum {
  None = "None",
  Api = "Api",
  Telegram = "Telegram",
  Twitch = "Twitch",
  Discord = "Discord",
  Vk = "Vk",
  All = "All",
}

export enum CommandsAdminPlatformDetailParamsPlatformEnum {
  None = "None",
  Api = "Api",
  Telegram = "Telegram",
  Twitch = "Twitch",
  Discord = "Discord",
  Vk = "Vk",
  All = "All",
}

export enum CommandsAdminPlatformDetailParamsEnum {
  None = "None",
  Api = "Api",
  Telegram = "Telegram",
  Twitch = "Twitch",
  Discord = "Discord",
  Vk = "Vk",
  All = "All",
}

export enum CommandsUserPlatformInfoListParamsPlatformEnum {
  None = "None",
  Api = "Api",
  Telegram = "Telegram",
  Twitch = "Twitch",
  Discord = "Discord",
  Vk = "Vk",
  All = "All",
}

export enum CommandsUserPlatformInfoListParamsEnum {
  None = "None",
  Api = "Api",
  Telegram = "Telegram",
  Twitch = "Twitch",
  Discord = "Discord",
  Vk = "Vk",
  All = "All",
}

export enum CommandsAdminPlatformInfoListParamsPlatformEnum {
  None = "None",
  Api = "Api",
  Telegram = "Telegram",
  Twitch = "Twitch",
  Discord = "Discord",
  Vk = "Vk",
  All = "All",
}

export enum CommandsAdminPlatformInfoListParamsEnum {
  None = "None",
  Api = "Api",
  Telegram = "Telegram",
  Twitch = "Twitch",
  Discord = "Discord",
  Vk = "Vk",
  All = "All",
}

export enum FramedataSupplementCreate2ParamsSourceEnum {
  None = "None",
  Wavu = "Wavu",
  Tekkendocs = "Tekkendocs",
}

export enum FramedataSupplementCreate2ParamsEnum {
  None = "None",
  Wavu = "Wavu",
  Tekkendocs = "Tekkendocs",
}

export enum LogsListParamsLogLevelEnum {
  Trace = "Trace",
  Debug = "Debug",
  Information = "Information",
  Warning = "Warning",
  Error = "Error",
  Critical = "Critical",
  None = "None",
}

export enum LogsByLevelDetailParamsLogLevelEnum {
  Trace = "Trace",
  Debug = "Debug",
  Information = "Information",
  Warning = "Warning",
  Error = "Error",
  Critical = "Critical",
  None = "None",
}

export enum LogsByLevelDetailParamsEnum {
  Trace = "Trace",
  Debug = "Debug",
  Information = "Information",
  Warning = "Warning",
  Error = "Error",
  Critical = "Critical",
  None = "None",
}
// ========================================
// SignalR-специфичные типы
// ========================================

export interface AutoArtImage {
  artist: any;
  /** @format int32 */
  byteSize: number;
  dominantColor?: string;
  extension?: string;
  /** @format int32 */
  favorites: number;
  /** @format int32 */
  height: number;
  /** @format int32 */
  imageID: number;
  isNsfw: boolean;
  likedAt: any;
  previewURL?: string;
  signature?: string;
  source?: string;
  /** @format date-time */
  uploadedAt: string;
  url?: string;
  /** @format int32 */
  width: number;
}

export interface ChatMessage {
  badgeInfo?: StringStringKeyValuePair[];
  badges?: StringStringKeyValuePair[];
  /** @format int32 */
  bits: number;
  /** @format double */
  bitsInDollars: number;
  botUsername?: string;
  channel?: string;
  chatReply?: ChatReply;
  cheerBadge?: CheerBadge;
  color: any;
  colorHex?: string;
  customRewardId?: string;
  displayName?: string;
  emoteReplacedMessage?: string;
  emoteSet?: EmoteSet;
  id?: string;
  isBroadcaster: boolean;
  isFirstMessage: boolean;
  isHighlighted: boolean;
  isMe: boolean;
  isModerator: boolean;
  isPartner: boolean;
  isSkippingSubMode: boolean;
  isStaff: boolean;
  isSubscriber: boolean;
  isTurbo: boolean;
  isVip: boolean;
  message?: string;
  noisy: ChatMessageNoisyEnum;
  rawIrcMessage?: string;
  roomId?: string;
  /** @format int32 */
  subscribedMonthCount: number;
  tmiSentTs?: string;
  userId?: string;
  userType: ChatMessageUserTypeEnum;
  username?: string;
}

export interface ChatReply {
  parentDisplayName?: string;
  parentMsgBody?: string;
  parentMsgId?: string;
  parentUserId?: string;
  parentUserLogin?: string;
}

export interface CheerBadge {
  /** @format int32 */
  cheerAmount: number;
  color: CheerBadgeColorEnum;
}

export interface Emote {
  /** @format int32 */
  endIndex: number;
  id?: string;
  imageUrl?: string;
  name?: string;
  /** @format int32 */
  startIndex: number;
}

export interface EmoteSet {
  emotes?: Emote[];
  rawEmoteSetString?: string;
}

export interface GaoAlertDto {
  /** @format uuid */
  id: string;
  isJustText: boolean;
  justText?: string;
  twitchUser?: User;
}

export interface Host {
  hostCoolDown: HostCoolDown;
  hostGreetings: HostAutoHello;
  isPrivated: boolean;
  /** @format int64 */
  orderCount: number;
  twitchId: string;
  twitchUser?: TwitchUser;
  waifuBrideId?: string;
  waifuRollId?: string;
  /** @format date-time */
  whenOrdered: string;
  /** @format date-time */
  whenPrivated?: string;
}

export interface HostAutoHello {
  /** @format uuid */
  guid: string;
  host?: Host;
  hostId: string;
  /** @format date-time */
  time: string;
}

export interface HostCoolDown {
  /** @format uuid */
  guid: string;
  host?: Host;
  hostId: string;
  /** @format date-time */
  time: string;
}

export interface LogMessageDto {
  category: string;
  connectionId?: string;
  /** @format int32 */
  eventId?: number;
  exception?: string;
  id: string;
  logLevel: string;
  message: string;
  source?: string;
  stackTrace?: string;
  /** @format date-time */
  timestamp: string;
}

export interface MediaDto {
  mediaInfo: MediaInfo;
  /** @format date-time */
  uploadStartTime: string;
}

export interface MediaInfo {
  fileInfo: MediaFileInfo;
  /** @format uuid */
  id: string;
  metaInfo: MediaMetaInfo;
  positionInfo: MediaPositionInfo;
  stylesInfo: MediaStylesInfo;
  textInfo: MediaTextInfo;
}

export interface PrizeType {
  id: string;
  image: string;
  text: string;
}

export interface ScoreboardColorsDto {
  backgroundColor: string;
  borderColor: string;
  fightModeColor: string;
  mainColor: string;
  playerNamesColor: string;
  scoreColor: string;
  tournamentTitleColor: string;
}

export interface ScoreboardDto {
  player1: ScoreboardPlayerDto;
  player2: ScoreboardPlayerDto;
  /** @format int32 */
  animationDuration: number;
  colors: ScoreboardColorsDto;
  isVisible: boolean;
  layout?: ScoreboardLayoutDto;
  meta: ScoreboardMetaDto;
}

export interface ScoreboardLayoutDto {
  /** @format int32 */
  flagSize: number;
  /** @format int32 */
  headerHeight: number;
  /** @format int32 */
  headerLeft: number;
  /** @format int32 */
  headerTop: number;
  /** @format int32 */
  headerWidth: number;
  /** @format int32 */
  padding: number;
  /** @format int32 */
  playerBarHeight: number;
  /** @format int32 */
  playerBarWidth: number;
  /** @format int32 */
  playersLeft: number;
  /** @format int32 */
  playersRight: number;
  /** @format int32 */
  playersTop: number;
  /** @format int32 */
  scoreSize: number;
  showFlags: boolean;
  showHeader: boolean;
  showSponsors: boolean;
  showTags: boolean;
  /** @format int32 */
  spacing: number;
}

export interface ScoreboardMetaDto {
  fightRule: string;
  title: string;
}

export interface ScoreboardPlayerDto {
  final: string;
  flag: string;
  name: string;
  /** @format int32 */
  score: number;
  sponsor: string;
  tag: string;
}

export interface StringStringKeyValuePair {
  key?: string;
  value?: string;
}

export interface TunaMusicDTO {
  data: TunaMusicData;
  hostname?: string;
  timestamp?: string;
}

export interface TunaMusicData {
  album_url: string;
  artists: string[];
  cover: string;
  /** @format int64 */
  duration: number;
  /** @format uuid */
  id: string;
  /** @format int64 */
  progress: number;
  status: string;
  title: string;
}

export interface User {
  broadcasterType?: string;
  /** @format date-time */
  createdAt: string;
  description?: string;
  displayName?: string;
  email?: string;
  id?: string;
  login?: string;
  offlineImageUrl?: string;
  profileImageUrl?: string;
  type?: string;
  /** @format int64 */
  viewCount: number;
}

export interface Waifu {
  /** @format int64 */
  age: number;
  anime?: string;
  /**
   * @minLength 1
   * @maxLength 200
   */
  imageUrl: string;
  isAdded: boolean;
  isMerged: boolean;
  isPrivated: boolean;
  /** @format date-time */
  lastOrder: string;
  manga?: string;
  /**
   * @minLength 1
   * @maxLength 200
   */
  name: string;
  /** @format int32 */
  orderCount: number;
  /**
   * @minLength 1
   * @maxLength 20
   */
  shikiId: string;
  /** @format date-time */
  whenAdded: string;
}

export type TunaMusicDtoRoot = object;

export enum ChatMessageNoisyEnum {
  NotSet = "NotSet",
  True = "True",
  False = "False",
}

export enum ChatMessageUserTypeEnum {
  Viewer = "Viewer",
  Moderator = "Moderator",
  GlobalModerator = "GlobalModerator",
  Broadcaster = "Broadcaster",
  Admin = "Admin",
  Staff = "Staff",
}

export enum CheerBadgeColorEnum {
  Gray = "Gray",
  Purple = "Purple",
  Green = "Green",
  Blue = "Blue",
  Red = "Red",
}

export enum TelegramusMakeScreenParticlesCreateParamsParticlesEnum {
  Confetty = "Confetty",
  Fireworks = "Fireworks",
}

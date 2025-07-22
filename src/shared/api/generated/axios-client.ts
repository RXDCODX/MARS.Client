/** Generate by swagger-axios-codegen */

/** Generate by swagger-axios-codegen */
/* eslint-disable */
// @ts-nocheck
import axiosStatic, {
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";

export interface IRequestOptions extends AxiosRequestConfig {
  /**
   * show loading status
   */
  loading?: boolean;
  /**
   * display error message
   */
  showError?: boolean;
  /**
   * indicates whether Authorization credentials are required for the request
   * @default true
   */
  withAuthorization?: boolean;
}

export interface IRequestConfig {
  method?: any;
  headers?: any;
  url?: any;
  data?: any;
  params?: any;
}

// Add options interface
export interface ServiceOptions {
  axios?: AxiosInstance;
  /** only in axios interceptor config*/
  loading: boolean;
  showError: boolean;
}

// Add default options
export const serviceOptions: ServiceOptions = {};

// Instance selector
export function axios(
  configs: IRequestConfig,
  resolve: (p: any) => void,
  reject: (p: any) => void,
): Promise<any> {
  if (serviceOptions.axios) {
    return serviceOptions.axios
      .request(configs)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  } else {
    throw new Error("please inject yourself instance like axios  ");
  }
}

export function getConfigs(
  method: string,
  contentType: string,
  url: string,
  options: any,
): IRequestConfig {
  const configs: IRequestConfig = {
    loading: serviceOptions.loading,
    showError: serviceOptions.showError,
    ...options,
    method,
    url,
  };
  configs.headers = {
    ...options.headers,
    "Content-Type": contentType,
  };
  return configs;
}

export const basePath = "";

export interface IList<T> extends Array<T> {}
export interface List<T> extends Array<T> {}
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export interface Dictionary<TValue> extends IDictionary<TValue> {}

export interface IListResult<T> {
  items?: T[];
}

export class ListResultDto<T> implements IListResult<T> {
  items?: T[];
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount?: number;
  items?: T[];
}

export class PagedResultDto<T = any> implements IPagedResult<T> {
  totalCount?: number;
  items?: T[];
}

// customer definition
// empty

/** BaseTrackInfo */
export interface BaseTrackInfo {
  /**  */
  id: string;

  /**  */
  trackName: string;

  /**  */
  authors?: string[];

  /**  */
  featAuthors?: string[];

  /**  */
  duration: string;

  /**  */
  genre?: string[];

  /**  */
  url: string;

  /**  */
  lastTimePlays: Date;

  /**  */
  domain: EnumBaseTrackInfoDomain;

  /**  */
  yandexSpecificInfo?: CombinedYandexSpecificInfoTypes;

  /**  */
  title: string;
}

/** ChatMessage */
export interface ChatMessage {
  /**  */
  badges?: StringStringKeyValuePair[];

  /**  */
  botUsername?: string;

  /**  */
  color: CombinedColorTypes;

  /**  */
  colorHex?: string;

  /**  */
  displayName?: string;

  /**  */
  emoteSet?: CombinedEmoteSetTypes;

  /**  */
  isTurbo: boolean;

  /**  */
  userId?: string;

  /**  */
  username?: string;

  /**  */
  userType: EnumChatMessageUserType;

  /**  */
  rawIrcMessage?: string;

  /**  */
  badgeInfo?: StringStringKeyValuePair[];

  /**  */
  bits: number;

  /**  */
  bitsInDollars: number;

  /**  */
  channel?: string;

  /**  */
  cheerBadge?: CombinedCheerBadgeTypes;

  /**  */
  customRewardId?: string;

  /**  */
  emoteReplacedMessage?: string;

  /**  */
  id?: string;

  /**  */
  isBroadcaster: boolean;

  /**  */
  isFirstMessage: boolean;

  /**  */
  isHighlighted: boolean;

  /**  */
  isMe: boolean;

  /**  */
  isModerator: boolean;

  /**  */
  isSkippingSubMode: boolean;

  /**  */
  isSubscriber: boolean;

  /**  */
  isVip: boolean;

  /**  */
  isStaff: boolean;

  /**  */
  isPartner: boolean;

  /**  */
  message?: string;

  /**  */
  noisy: EnumChatMessageNoisy;

  /**  */
  roomId?: string;

  /**  */
  subscribedMonthCount: number;

  /**  */
  tmiSentTs?: string;

  /**  */
  chatReply?: CombinedChatReplyTypes;
}

/** ChatReply */
export interface ChatReply {
  /**  */
  parentDisplayName?: string;

  /**  */
  parentMsgBody?: string;

  /**  */
  parentMsgId?: string;

  /**  */
  parentUserId?: string;

  /**  */
  parentUserLogin?: string;
}

/** CheerBadge */
export interface CheerBadge {
  /**  */
  cheerAmount: number;

  /**  */
  color: EnumCheerBadgeColor;
}

/** Color */
export interface Color {
  /**  */
  r: number;

  /**  */
  g: number;

  /**  */
  b: number;

  /**  */
  a: number;

  /**  */
  isKnownColor: boolean;

  /**  */
  isEmpty: boolean;

  /**  */
  isNamedColor: boolean;

  /**  */
  isSystemColor: boolean;

  /**  */
  name: string;
}

/** Emote */
export interface Emote {
  /**  */
  id?: string;

  /**  */
  name?: string;

  /**  */
  startIndex: number;

  /**  */
  endIndex: number;

  /**  */
  imageUrl?: string;
}

/** EmoteSet */
export interface EmoteSet {
  /**  */
  emotes?: Emote[];

  /**  */
  rawEmoteSetString?: string;
}

/** Host */
export interface Host {
  /**  */
  name?: string;

  /**  */
  twitchId: string;

  /**  */
  whenOrdered: Date;

  /**  */
  waifuBrideId?: string;

  /**  */
  isPrivated: boolean;

  /**  */
  orderCount: string;

  /**  */
  waifuRollId?: string;

  /**  */
  whenPrivated?: Date;

  /**  */
  hostGreetings: CombinedHostGreetingsTypes;

  /**  */
  hostCoolDown: CombinedHostCoolDownTypes;
}

/** HostAutoHello */
export interface HostAutoHello {
  /**  */
  guid: string;

  /**  */
  hostId: string;

  /**  */
  host?: CombinedHostTypes;

  /**  */
  time: Date;
}

/** HostCoolDown */
export interface HostCoolDown {
  /**  */
  guid: string;

  /**  */
  hostId: string;

  /**  */
  host?: CombinedHostTypes;

  /**  */
  time: Date;
}

/** Image */
export interface Image {
  /**  */
  signature?: string;

  /**  */
  extension?: string;

  /**  */
  imageID: number;

  /**  */
  favorites: number;

  /**  */
  dominantColor?: string;

  /**  */
  source?: string;

  /**  */
  artist?: any | null;

  /**  */
  uploadedAt: Date;

  /**  */
  likedAt?: any | null;

  /**  */
  isNsfw: boolean;

  /**  */
  width: number;

  /**  */
  height: number;

  /**  */
  byteSize: number;

  /**  */
  url?: string;

  /**  */
  previewURL?: string;
}

/** MediaDto */
export interface MediaDto {
  /**  */
  mediaInfo: CombinedMediaInfoTypes;

  /**  */
  uploadStartTime: Date;
}

/** MediaFileInfo */
export interface MediaFileInfo {
  /**  */
  type: EnumMediaFileInfoType;

  /**  */
  filePath: string;

  /**  */
  isLocalFile: boolean;

  /**  */
  fileName: string;

  /**  */
  extension: string;
}

/** MediaInfo */
export interface MediaInfo {
  /**  */
  id: string;

  /**  */
  textInfo: CombinedTextInfoTypes;

  /**  */
  fileInfo: CombinedFileInfoTypes;

  /**  */
  positionInfo: CombinedPositionInfoTypes;

  /**  */
  metaInfo: CombinedMetaInfoTypes;

  /**  */
  stylesInfo: CombinedStylesInfoTypes;
}

/** MediaMetaInfo */
export interface MediaMetaInfo {
  /**  */
  twitchPointsCost: number;

  /**  */
  twitchGuid?: string;

  /**  */
  vip: boolean;

  /**  */
  displayName: string;

  /**  */
  isLooped: boolean;

  /**  */
  duration: number;

  /**  */
  priority: EnumMediaMetaInfoPriority;
}

/** MediaPositionInfo */
export interface MediaPositionInfo {
  /**  */
  isProportion: boolean;

  /**  */
  isResizeRequires: boolean;

  /**  */
  height: number;

  /**  */
  width: number;

  /**  */
  isRotated: boolean;

  /**  */
  rotation: number;

  /**  */
  xCoordinate: number;

  /**  */
  yCoordinate: number;

  /**  */
  randomCoordinates: boolean;

  /**  */
  isVerticallCenter: boolean;

  /**  */
  isHorizontalCenter: boolean;

  /**  */
  isUseOriginalWidthAndHeight: boolean;
}

/** MediaStylesInfo */
export interface MediaStylesInfo {
  /**  */
  isBorder: boolean;
}

/** MediaTextInfo */
export interface MediaTextInfo {
  /**  */
  keyWordsColor?: string;

  /**  */
  triggerWord?: string;

  /**  */
  text?: string;

  /**  */
  textColor?: string;

  /**  */
  keyWordSybmolDelimiter?: string;
}

/** PlayerState */
export interface PlayerState {
  /**  */
  id: string;

  /**  */
  currentTrack?: CombinedCurrentTrackTypes;

  /**  */
  nextTrack?: CombinedNextTrackTypes;

  /**  */
  currentTrackDuration?: string;

  /**  */
  isPaused: boolean;

  /**  */
  isMuted: boolean;

  /**  */
  isStoped: boolean;

  /**  */
  volume: number;
}

/** PrizeType */
export interface PrizeType {
  /**  */
  id: string;

  /**  */
  image: string;

  /**  */
  text: string;
}

/** Root */
export interface Root {}

/** ServiceInfo */
export interface ServiceInfo {
  /**  */
  name: string;

  /**  */
  displayName: string;

  /**  */
  description: string;

  /**  */
  status: EnumServiceInfoStatus;

  /**  */
  startTime?: Date;

  /**  */
  lastActivity?: Date;

  /**  */
  isEnabled: boolean;

  /**  */
  configuration: object;
}

/** ServiceLog */
export interface ServiceLog {
  /**  */
  timestamp: Date;

  /**  */
  level: string;

  /**  */
  message: string;

  /**  */
  exception?: string;
}

/** StringStringKeyValuePair */
export interface StringStringKeyValuePair {
  /**  */
  key?: string;

  /**  */
  value?: string;
}

/** TunaMusicDTO */
export interface TunaMusicDTO {
  /**  */
  data: CombinedDataTypes;

  /**  */
  hostname?: string;

  /**  */
  timestamp?: string;
}

/** TunaMusicData */
export interface TunaMusicData {
  /**  */
  cover: string;

  /**  */
  title: string;

  /**  */
  artists: string[];

  /**  */
  status: string;

  /**  */
  progress: string;

  /**  */
  duration: string;

  /**  */
  album_url: string;
}

/** UserRequestedTrack */
export interface UserRequestedTrack {
  /**  */
  id: string;

  /**  */
  twitchDisplayName?: string;

  /**  */
  twitchId: string;

  /**  */
  order: number;

  /**  */
  requestedTrackId: string;

  /**  */
  requestedTrack: CombinedRequestedTrackTypes;
}

/** Waifu */
export interface Waifu {
  /**  */
  shikiId: string;

  /**  */
  name: string;

  /**  */
  age: string;

  /**  */
  anime?: string;

  /**  */
  manga?: string;

  /**  */
  whenAdded: Date;

  /**  */
  lastOrder: Date;

  /**  */
  orderCount: number;

  /**  */
  isPrivated: boolean;

  /**  */
  imageUrl: string;

  /**  */
  isMerged: boolean;

  /**  */
  isAdded: boolean;
}

/** YandexTrackAdditionalInfo */
export interface YandexTrackAdditionalInfo {
  /**  */
  artworkUrl?: string;

  /**  */
  mp3TrackUrl?: string;
}
export enum EnumBaseTrackInfoDomain {
  "None" = "None",
  "Youtube" = "Youtube",
  "SoundCloud" = "SoundCloud",
  "YandexMusic" = "YandexMusic",
  "VkMusic" = "VkMusic",
}
export type CombinedYandexSpecificInfoTypes = YandexTrackAdditionalInfo;
export type CombinedColorTypes = Color;
export type CombinedEmoteSetTypes = EmoteSet;
export enum EnumChatMessageUserType {
  "Viewer" = "Viewer",
  "Moderator" = "Moderator",
  "GlobalModerator" = "GlobalModerator",
  "Broadcaster" = "Broadcaster",
  "Admin" = "Admin",
  "Staff" = "Staff",
}
export type CombinedCheerBadgeTypes = CheerBadge;
export enum EnumChatMessageNoisy {
  "NotSet" = "NotSet",
  "True" = "True",
  "False" = "False",
}
export type CombinedChatReplyTypes = ChatReply;
export enum EnumCheerBadgeColor {
  "Gray" = "Gray",
  "Purple" = "Purple",
  "Green" = "Green",
  "Blue" = "Blue",
  "Red" = "Red",
}
export type CombinedHostGreetingsTypes = HostAutoHello;
export type CombinedHostCoolDownTypes = HostCoolDown;
export type CombinedHostTypes = Host;
export type CombinedMediaInfoTypes = MediaInfo;
export enum EnumMediaFileInfoType {
  "None" = "None",
  "Image" = "Image",
  "Audio" = "Audio",
  "Video" = "Video",
  "TelegramSticker" = "TelegramSticker",
  "Voice" = "Voice",
  "Gif" = "Gif",
}
export type CombinedTextInfoTypes = MediaTextInfo;
export type CombinedFileInfoTypes = MediaFileInfo;
export type CombinedPositionInfoTypes = MediaPositionInfo;
export type CombinedMetaInfoTypes = MediaMetaInfo;
export type CombinedStylesInfoTypes = MediaStylesInfo;
export enum EnumMediaMetaInfoPriority {
  "Low" = "Low",
  "Normal" = "Normal",
  "High" = "High",
}
export type CombinedCurrentTrackTypes = BaseTrackInfo;
export type CombinedNextTrackTypes = BaseTrackInfo;
export enum EnumServiceInfoStatus {
  "Running" = "Running",
  "Stopped" = "Stopped",
  "Starting" = "Starting",
  "Stopping" = "Stopping",
  "Error" = "Error",
  "Unknown" = "Unknown",
}
export type CombinedDataTypes = TunaMusicData;
export type CombinedRequestedTrackTypes = BaseTrackInfo;

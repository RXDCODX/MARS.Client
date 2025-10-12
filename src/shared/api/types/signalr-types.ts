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

export interface BaseTrackInfo {
  artworkUrl?: string;
  authors?: string[];
  /** @format date-span */
  duration: string;
  /** @format uuid */
  id: string;
  /** @format date-time */
  lastTimePlays: string;
  title: string;
  trackName: string;
  url: string;
  videoId?: string;
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

export enum CheerBadgeColorEnum {
  Gray = "Gray",
  Purple = "Purple",
  Green = "Green",
  Blue = "Blue",
  Red = "Red",
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
  name?: string;
  /** @format int64 */
  orderCount: number;
  twitchId: string;
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

export interface PlayerState {
  currentTrack?: BaseTrackInfo;
  /** @format date-span */
  currentTrackDuration?: string;
  /** @format uuid */
  id: string;
  isMuted: boolean;
  isPaused: boolean;
  isStoped: boolean;
  nextTrack?: BaseTrackInfo;
  /** @format int32 */
  volume: number;
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

export enum TelegramusMakeScreenParticlesCreateParamsParticlesEnum {
  Confetty = "Confetty",
  Fireworks = "Fireworks",
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

export type TunaMusicDtoRoot = object;

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

export interface UserRequestedTrack {
  /** @format uuid */
  id: string;
  /** @format int32 */
  order: number;
  requestedTrack: BaseTrackInfo;
  /** @format uuid */
  requestedTrackId: string;
  twitchDisplayName?: string;
  twitchId: string;
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

/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface BaseTrackInfo {
    authors: string[] | undefined;
    /** @format date-span */
    duration: string;
    featAuthors: string[] | undefined;
    genre: string[] | undefined;
    /** @format uuid */
    id: string;
    /** @format date-time */
    lastTimePlays: string;
    title: string;
    trackName: string;
    url: string;
}

export interface ChatMessage {
    badgeInfo: StringStringKeyValuePair[] | undefined;
    badges: StringStringKeyValuePair[] | undefined;
    /** @format int32 */
    bits: number;
    /** @format double */
    bitsInDollars: number;
    botUsername: string | undefined;
    channel: string | undefined;
    chatReply: ChatReply | undefined;
    cheerBadge: CheerBadge | undefined;
    color: Color;
    colorHex: string | undefined;
    customRewardId: string | undefined;
    displayName: string | undefined;
    emoteReplacedMessage: string | undefined;
    emoteSet: EmoteSet | undefined;
    id: string | undefined;
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
    message: string | undefined;
    noisy: ChatMessageNoisyEnum;
    rawIrcMessage: string | undefined;
    roomId: string | undefined;
    /** @format int32 */
    subscribedMonthCount: number;
    tmiSentTs: string | undefined;
    userId: string | undefined;
    userType: ChatMessageUserTypeEnum;
    username: string | undefined;
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
    parentDisplayName: string | undefined;
    parentMsgBody: string | undefined;
    parentMsgId: string | undefined;
    parentUserId: string | undefined;
    parentUserLogin: string | undefined;
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

export interface Color {
    /** @format int32 */
    a: number;
    /** @format int32 */
    b: number;
    /** @format int32 */
    g: number;
    isEmpty: boolean;
    isKnownColor: boolean;
    isNamedColor: boolean;
    isSystemColor: boolean;
    name: string;
    /** @format int32 */
    r: number;
}

export interface Emote {
    /** @format int32 */
    endIndex: number;
    id: string | undefined;
    imageUrl: string | undefined;
    name: string | undefined;
    /** @format int32 */
    startIndex: number;
}

export interface EmoteSet {
    emotes: Emote[] | undefined;
    rawEmoteSetString: string | undefined;
}

export interface Host {
    hostCoolDown: HostCoolDown;
    hostGreetings: HostAutoHello;
    isPrivated: boolean;
    name: string | undefined;
    /** @format int64 */
    orderCount: number;
    twitchId: string;
    waifuBrideId: string | undefined;
    waifuRollId: string | undefined;
    /** @format date-time */
    whenOrdered: string;
    /** @format date-time */
    whenPrivated: string | undefined;
}

export interface HostAutoHello {
    /** @format uuid */
    guid: string;
    host: Host | undefined;
    hostId: string;
    /** @format date-time */
    time: string;
}

export interface HostCoolDown {
    /** @format uuid */
    guid: string;
    host: Host | undefined;
    hostId: string;
    /** @format date-time */
    time: string;
}

export interface Image {
    artist: any;
    /** @format int32 */
    byteSize: number;
    dominantColor: string | undefined;
    extension: string | undefined;
    /** @format int32 */
    favorites: number;
    /** @format int32 */
    height: number;
    /** @format int32 */
    imageID: number;
    isNsfw: boolean;
    likedAt: any;
    previewURL: string | undefined;
    signature: string | undefined;
    source: string | undefined;
    /** @format date-time */
    uploadedAt: string;
    url: string | undefined;
    /** @format int32 */
    width: number;
}

export enum MakeScreenParticlesCreateParamsParticlesEnum {
    Confetty = "Confetty",
    Fireworks = "Fireworks",
}

export interface MediaDto {
    mediaInfo: MediaInfo;
    /** @format date-time */
    uploadStartTime: string;
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

export interface MediaInfo {
    fileInfo: MediaFileInfo;
    /** @format uuid */
    id: string;
    metaInfo: MediaMetaInfo;
    positionInfo: MediaPositionInfo;
    stylesInfo: MediaStylesInfo;
    textInfo: MediaTextInfo;
}

export interface MediaMetaInfo {
    displayName: string;
    /** @format int32 */
    duration: number;
    isLooped: boolean;
    priority: MediaMetaInfoPriorityEnum;
    /** @format uuid */
    twitchGuid: string | undefined;
    /** @format int32 */
    twitchPointsCost: number;
    vip: boolean;
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
    keyWordSybmolDelimiter: string | undefined;
    keyWordsColor: string | undefined;
    text: string | undefined;
    textColor: string | undefined;
    triggerWord: string | undefined;
}

export interface PrizeType {
    id: string;
    image: string;
    text: string;
}

export type Root = object;

export interface StringStringKeyValuePair {
    key: string | undefined;
    value: string | undefined;
}

export interface TunaMusicDTO {
    data: TunaMusicData;
    hostname: string | undefined;
    timestamp: string | undefined;
}

export interface TunaMusicData {
    album_url: string;
    artists: string[];
    cover: string;
    /** @format int64 */
    duration: number;
    /** @format int64 */
    progress: number;
    status: string;
    title: string;
}

export interface Waifu {
    /** @format int64 */
    age: number;
    anime: string | undefined;
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
    manga: string | undefined;
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

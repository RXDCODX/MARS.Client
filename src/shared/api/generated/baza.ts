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

export type ChatMessage = TwitchLibMessage & {
    badgeInfo: StringStringKeyValuePair[] | undefined;
    /** @format int32 */
    bits: number;
    /** @format double */
    bitsInDollars: number;
    channel: string | undefined;
    chatReply: ChatReply | undefined;
    cheerBadge: CheerBadge | undefined;
    customRewardId: string | undefined;
    emoteReplacedMessage: string | undefined;
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
    isVip: boolean;
    message: string | undefined;
    noisy: ChatMessageNoisyEnum;
    roomId: string | undefined;
    /** @format int32 */
    subscribedMonthCount: number;
    tmiSentTs: string | undefined;
};

export enum ChatMessageNoisyEnum {
    NotSet = "NotSet",
    True = "True",
    False = "False",
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

export type PrizeType = PrizeTypeAbstract & object;

export interface PrizeTypeAbstract {
    id: string;
    image: string;
    text: string;
}

export interface StringStringKeyValuePair {
    key: string | undefined;
    value: string | undefined;
}

export enum TelegramusHubMakeScreenParticlesCreateParamsParticlesEnum {
    Confetty = "Confetty",
    Fireworks = "Fireworks",
}

export interface TwitchLibMessage {
    badges: StringStringKeyValuePair[] | undefined;
    botUsername: string | undefined;
    color: Color;
    colorHex: string | undefined;
    displayName: string | undefined;
    emoteSet: EmoteSet | undefined;
    isTurbo: boolean;
    rawIrcMessage: string | undefined;
    userId: string | undefined;
    userType: TwitchLibMessageUserTypeEnum;
    username: string | undefined;
}

export type TwitchLibMessageBuilder = TwitchLibMessage & object;

export enum TwitchLibMessageUserTypeEnum {
    Viewer = "Viewer",
    Moderator = "Moderator",
    GlobalModerator = "GlobalModerator",
    Broadcaster = "Broadcaster",
    Admin = "Admin",
    Staff = "Staff",
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

export type WhisperMessage = TwitchLibMessage & {
    message: string | undefined;
    messageId: string | undefined;
    threadId: string | undefined;
};

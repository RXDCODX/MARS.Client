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

export interface Assembly {
  /** @deprecated */
  codeBase: string | undefined;
  customAttributes: CustomAttributeData[];
  definedTypes: TypeInfo[];
  entryPoint: MethodInfo | undefined;
  /** @deprecated */
  escapedCodeBase: string;
  exportedTypes: Type[];
  fullName: string | undefined;
  /** @deprecated */
  globalAssemblyCache: boolean;
  /** @format int64 */
  hostContext: number;
  imageRuntimeVersion: string;
  isCollectible: boolean;
  isDynamic: boolean;
  isFullyTrusted: boolean;
  location: string;
  manifestModule: Module;
  modules: Module[];
  reflectionOnly: boolean;
  securityRuleSet: AssemblySecurityRuleSetEnum;
}

export enum AssemblySecurityRuleSetEnum {
  None = "None",
  Level1 = "Level1",
  Level2 = "Level2",
}

export interface BaseTrackInfo {
  authors: string[] | undefined;
  domain: BaseTrackInfoDomainEnum;
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
  yandexSpecificInfo: YandexTrackAdditionalInfo | undefined;
}

export enum BaseTrackInfoDomainEnum {
  None = "None",
  Youtube = "Youtube",
  SoundCloud = "SoundCloud",
  YandexMusic = "YandexMusic",
  VkMusic = "VkMusic",
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
  defaultValue: string | undefined;
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

export interface ConstructorInfo {
  attributes: ConstructorInfoAttributesEnum;
  callingConvention: ConstructorInfoCallingConventionEnum;
  containsGenericParameters: boolean;
  customAttributes: CustomAttributeData[];
  declaringType: Type | undefined;
  isAbstract: boolean;
  isAssembly: boolean;
  isCollectible: boolean;
  isConstructedGenericMethod: boolean;
  isConstructor: boolean;
  isFamily: boolean;
  isFamilyAndAssembly: boolean;
  isFamilyOrAssembly: boolean;
  isFinal: boolean;
  isGenericMethod: boolean;
  isGenericMethodDefinition: boolean;
  isHideBySig: boolean;
  isPrivate: boolean;
  isPublic: boolean;
  isSecurityCritical: boolean;
  isSecuritySafeCritical: boolean;
  isSecurityTransparent: boolean;
  isSpecialName: boolean;
  isStatic: boolean;
  isVirtual: boolean;
  memberType: ConstructorInfoMemberTypeEnum;
  /** @format int32 */
  metadataToken: number;
  methodHandle: RuntimeMethodHandle;
  methodImplementationFlags: ConstructorInfoMethodImplementationFlagsEnum;
  module: Module;
  name: string;
  reflectedType: Type | undefined;
}

export enum ConstructorInfoAttributesEnum {
  PrivateScope = "PrivateScope",
  Private = "Private",
  FamANDAssem = "FamANDAssem",
  Assembly = "Assembly",
  Family = "Family",
  FamORAssem = "FamORAssem",
  Public = "Public",
  MemberAccessMask = "MemberAccessMask",
  UnmanagedExport = "UnmanagedExport",
  Static = "Static",
  Final = "Final",
  Virtual = "Virtual",
  HideBySig = "HideBySig",
  NewSlot = "NewSlot",
  CheckAccessOnOverride = "CheckAccessOnOverride",
  Abstract = "Abstract",
  SpecialName = "SpecialName",
  RTSpecialName = "RTSpecialName",
  PinvokeImpl = "PinvokeImpl",
  HasSecurity = "HasSecurity",
  RequireSecObject = "RequireSecObject",
  ReservedMask = "ReservedMask",
}

export enum ConstructorInfoCallingConventionEnum {
  Standard = "Standard",
  VarArgs = "VarArgs",
  Any = "Any",
  HasThis = "HasThis",
  ExplicitThis = "ExplicitThis",
}

export enum ConstructorInfoMemberTypeEnum {
  Constructor = "Constructor",
  Event = "Event",
  Field = "Field",
  Method = "Method",
  Property = "Property",
  TypeInfo = "TypeInfo",
  Custom = "Custom",
  NestedType = "NestedType",
  All = "All",
}

export enum ConstructorInfoMethodImplementationFlagsEnum {
  IL = "IL",
  Native = "Native",
  OPTIL = "OPTIL",
  CodeTypeMask = "CodeTypeMask",
  ManagedMask = "ManagedMask",
  NoInlining = "NoInlining",
  ForwardRef = "ForwardRef",
  Synchronized = "Synchronized",
  NoOptimization = "NoOptimization",
  PreserveSig = "PreserveSig",
  AggressiveInlining = "AggressiveInlining",
  AggressiveOptimization = "AggressiveOptimization",
  InternalCall = "InternalCall",
  MaxMethodImplVal = "MaxMethodImplVal",
}

export interface CustomAttributeData {
  attributeType: Type;
  constructor: ConstructorInfo;
  constructorArguments: CustomAttributeTypedArgument[];
  namedArguments: CustomAttributeNamedArgument[];
}

export interface CustomAttributeNamedArgument {
  isField: boolean;
  memberInfo: MemberInfo;
  memberName: string;
  typedValue: CustomAttributeTypedArgument;
}

export interface CustomAttributeTypedArgument {
  argumentType: Type;
  value: any;
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

export interface EventInfo {
  addMethod: MethodInfo | undefined;
  attributes: EventInfoAttributesEnum;
  customAttributes: CustomAttributeData[];
  declaringType: Type | undefined;
  eventHandlerType: Type | undefined;
  isCollectible: boolean;
  isMulticast: boolean;
  isSpecialName: boolean;
  memberType: EventInfoMemberTypeEnum;
  /** @format int32 */
  metadataToken: number;
  module: Module;
  name: string;
  raiseMethod: MethodInfo | undefined;
  reflectedType: Type | undefined;
  removeMethod: MethodInfo | undefined;
}

export enum EventInfoAttributesEnum {
  None = "None",
  SpecialName = "SpecialName",
  RTSpecialName = "RTSpecialName",
}

export enum EventInfoMemberTypeEnum {
  Constructor = "Constructor",
  Event = "Event",
  Field = "Field",
  Method = "Method",
  Property = "Property",
  TypeInfo = "TypeInfo",
  Custom = "Custom",
  NestedType = "NestedType",
  All = "All",
}

export interface Exception {
  data: Record<string, any>;
  /** @format int32 */
  hResult: number;
  helpLink: string | undefined;
  innerException: Exception | undefined;
  message: string;
  source: string | undefined;
  stackTrace: string | undefined;
  targetSite: MethodBase | undefined;
}

export interface FieldInfo {
  attributes: FieldInfoAttributesEnum;
  customAttributes: CustomAttributeData[];
  declaringType: Type | undefined;
  fieldHandle: RuntimeFieldHandle;
  fieldType: Type;
  isAssembly: boolean;
  isCollectible: boolean;
  isFamily: boolean;
  isFamilyAndAssembly: boolean;
  isFamilyOrAssembly: boolean;
  isInitOnly: boolean;
  isLiteral: boolean;
  /** @deprecated */
  isNotSerialized: boolean;
  isPinvokeImpl: boolean;
  isPrivate: boolean;
  isPublic: boolean;
  isSecurityCritical: boolean;
  isSecuritySafeCritical: boolean;
  isSecurityTransparent: boolean;
  isSpecialName: boolean;
  isStatic: boolean;
  memberType: FieldInfoMemberTypeEnum;
  /** @format int32 */
  metadataToken: number;
  module: Module;
  name: string;
  reflectedType: Type | undefined;
}

export enum FieldInfoAttributesEnum {
  PrivateScope = "PrivateScope",
  Private = "Private",
  FamANDAssem = "FamANDAssem",
  Assembly = "Assembly",
  Family = "Family",
  FamORAssem = "FamORAssem",
  Public = "Public",
  FieldAccessMask = "FieldAccessMask",
  Static = "Static",
  InitOnly = "InitOnly",
  Literal = "Literal",
  NotSerialized = "NotSerialized",
  HasFieldRVA = "HasFieldRVA",
  SpecialName = "SpecialName",
  RTSpecialName = "RTSpecialName",
  HasFieldMarshal = "HasFieldMarshal",
  PinvokeImpl = "PinvokeImpl",
  HasDefault = "HasDefault",
  ReservedMask = "ReservedMask",
}

export enum FieldInfoMemberTypeEnum {
  Constructor = "Constructor",
  Event = "Event",
  Field = "Field",
  Method = "Method",
  Property = "Property",
  TypeInfo = "TypeInfo",
  Custom = "Custom",
  NestedType = "NestedType",
  All = "All",
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

export type ICustomAttributeProvider = object;

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

export type IntPtr = object;

export interface JoinQueueRequest {
  playerId: string;
}

export interface LeaveQueueRequest {
  playerId: string;
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

export interface MemberInfo {
  customAttributes: CustomAttributeData[];
  declaringType: Type | undefined;
  isCollectible: boolean;
  memberType: MemberInfoMemberTypeEnum;
  /** @format int32 */
  metadataToken: number;
  module: Module;
  name: string;
  reflectedType: Type | undefined;
}

export enum MemberInfoMemberTypeEnum {
  Constructor = "Constructor",
  Event = "Event",
  Field = "Field",
  Method = "Method",
  Property = "Property",
  TypeInfo = "TypeInfo",
  Custom = "Custom",
  NestedType = "NestedType",
  All = "All",
}

export interface MethodBase {
  attributes: MethodBaseAttributesEnum;
  callingConvention: MethodBaseCallingConventionEnum;
  containsGenericParameters: boolean;
  customAttributes: CustomAttributeData[];
  declaringType: Type | undefined;
  isAbstract: boolean;
  isAssembly: boolean;
  isCollectible: boolean;
  isConstructedGenericMethod: boolean;
  isConstructor: boolean;
  isFamily: boolean;
  isFamilyAndAssembly: boolean;
  isFamilyOrAssembly: boolean;
  isFinal: boolean;
  isGenericMethod: boolean;
  isGenericMethodDefinition: boolean;
  isHideBySig: boolean;
  isPrivate: boolean;
  isPublic: boolean;
  isSecurityCritical: boolean;
  isSecuritySafeCritical: boolean;
  isSecurityTransparent: boolean;
  isSpecialName: boolean;
  isStatic: boolean;
  isVirtual: boolean;
  memberType: MethodBaseMemberTypeEnum;
  /** @format int32 */
  metadataToken: number;
  methodHandle: RuntimeMethodHandle;
  methodImplementationFlags: MethodBaseMethodImplementationFlagsEnum;
  module: Module;
  name: string;
  reflectedType: Type | undefined;
}

export enum MethodBaseAttributesEnum {
  PrivateScope = "PrivateScope",
  Private = "Private",
  FamANDAssem = "FamANDAssem",
  Assembly = "Assembly",
  Family = "Family",
  FamORAssem = "FamORAssem",
  Public = "Public",
  MemberAccessMask = "MemberAccessMask",
  UnmanagedExport = "UnmanagedExport",
  Static = "Static",
  Final = "Final",
  Virtual = "Virtual",
  HideBySig = "HideBySig",
  NewSlot = "NewSlot",
  CheckAccessOnOverride = "CheckAccessOnOverride",
  Abstract = "Abstract",
  SpecialName = "SpecialName",
  RTSpecialName = "RTSpecialName",
  PinvokeImpl = "PinvokeImpl",
  HasSecurity = "HasSecurity",
  RequireSecObject = "RequireSecObject",
  ReservedMask = "ReservedMask",
}

export enum MethodBaseCallingConventionEnum {
  Standard = "Standard",
  VarArgs = "VarArgs",
  Any = "Any",
  HasThis = "HasThis",
  ExplicitThis = "ExplicitThis",
}

export enum MethodBaseMemberTypeEnum {
  Constructor = "Constructor",
  Event = "Event",
  Field = "Field",
  Method = "Method",
  Property = "Property",
  TypeInfo = "TypeInfo",
  Custom = "Custom",
  NestedType = "NestedType",
  All = "All",
}

export enum MethodBaseMethodImplementationFlagsEnum {
  IL = "IL",
  Native = "Native",
  OPTIL = "OPTIL",
  CodeTypeMask = "CodeTypeMask",
  ManagedMask = "ManagedMask",
  NoInlining = "NoInlining",
  ForwardRef = "ForwardRef",
  Synchronized = "Synchronized",
  NoOptimization = "NoOptimization",
  PreserveSig = "PreserveSig",
  AggressiveInlining = "AggressiveInlining",
  AggressiveOptimization = "AggressiveOptimization",
  InternalCall = "InternalCall",
  MaxMethodImplVal = "MaxMethodImplVal",
}

export interface MethodInfo {
  attributes: MethodInfoAttributesEnum;
  callingConvention: MethodInfoCallingConventionEnum;
  containsGenericParameters: boolean;
  customAttributes: CustomAttributeData[];
  declaringType: Type | undefined;
  isAbstract: boolean;
  isAssembly: boolean;
  isCollectible: boolean;
  isConstructedGenericMethod: boolean;
  isConstructor: boolean;
  isFamily: boolean;
  isFamilyAndAssembly: boolean;
  isFamilyOrAssembly: boolean;
  isFinal: boolean;
  isGenericMethod: boolean;
  isGenericMethodDefinition: boolean;
  isHideBySig: boolean;
  isPrivate: boolean;
  isPublic: boolean;
  isSecurityCritical: boolean;
  isSecuritySafeCritical: boolean;
  isSecurityTransparent: boolean;
  isSpecialName: boolean;
  isStatic: boolean;
  isVirtual: boolean;
  memberType: MethodInfoMemberTypeEnum;
  /** @format int32 */
  metadataToken: number;
  methodHandle: RuntimeMethodHandle;
  methodImplementationFlags: MethodInfoMethodImplementationFlagsEnum;
  module: Module;
  name: string;
  reflectedType: Type | undefined;
  returnParameter: ParameterInfo;
  returnType: Type;
  returnTypeCustomAttributes: ICustomAttributeProvider;
}

export enum MethodInfoAttributesEnum {
  PrivateScope = "PrivateScope",
  Private = "Private",
  FamANDAssem = "FamANDAssem",
  Assembly = "Assembly",
  Family = "Family",
  FamORAssem = "FamORAssem",
  Public = "Public",
  MemberAccessMask = "MemberAccessMask",
  UnmanagedExport = "UnmanagedExport",
  Static = "Static",
  Final = "Final",
  Virtual = "Virtual",
  HideBySig = "HideBySig",
  NewSlot = "NewSlot",
  CheckAccessOnOverride = "CheckAccessOnOverride",
  Abstract = "Abstract",
  SpecialName = "SpecialName",
  RTSpecialName = "RTSpecialName",
  PinvokeImpl = "PinvokeImpl",
  HasSecurity = "HasSecurity",
  RequireSecObject = "RequireSecObject",
  ReservedMask = "ReservedMask",
}

export enum MethodInfoCallingConventionEnum {
  Standard = "Standard",
  VarArgs = "VarArgs",
  Any = "Any",
  HasThis = "HasThis",
  ExplicitThis = "ExplicitThis",
}

export enum MethodInfoMemberTypeEnum {
  Constructor = "Constructor",
  Event = "Event",
  Field = "Field",
  Method = "Method",
  Property = "Property",
  TypeInfo = "TypeInfo",
  Custom = "Custom",
  NestedType = "NestedType",
  All = "All",
}

export enum MethodInfoMethodImplementationFlagsEnum {
  IL = "IL",
  Native = "Native",
  OPTIL = "OPTIL",
  CodeTypeMask = "CodeTypeMask",
  ManagedMask = "ManagedMask",
  NoInlining = "NoInlining",
  ForwardRef = "ForwardRef",
  Synchronized = "Synchronized",
  NoOptimization = "NoOptimization",
  PreserveSig = "PreserveSig",
  AggressiveInlining = "AggressiveInlining",
  AggressiveOptimization = "AggressiveOptimization",
  InternalCall = "InternalCall",
  MaxMethodImplVal = "MaxMethodImplVal",
}

export interface Module {
  assembly: Assembly;
  customAttributes: CustomAttributeData[];
  fullyQualifiedName: string;
  /** @format int32 */
  mdStreamVersion: number;
  /** @format int32 */
  metadataToken: number;
  moduleHandle: ModuleHandle;
  /** @format uuid */
  moduleVersionId: string;
  name: string;
  scopeName: string;
}

export interface ModuleHandle {
  /** @format int32 */
  mdStreamVersion: number;
}

export interface MoveRequest {
  fromX: string;
  /** @format int32 */
  fromY: number;
  toX: string;
  /** @format int32 */
  toY: number;
}

export interface MuteRequest {
  processNames: string[];
}

export interface ParameterInfo {
  attributes: ParameterInfoAttributesEnum;
  customAttributes: CustomAttributeData[];
  defaultValue: any;
  hasDefaultValue: boolean;
  isIn: boolean;
  isLcid: boolean;
  isOptional: boolean;
  isOut: boolean;
  isRetval: boolean;
  member: MemberInfo;
  /** @format int32 */
  metadataToken: number;
  name: string | undefined;
  parameterType: Type;
  /** @format int32 */
  position: number;
  rawDefaultValue: any;
}

export enum ParameterInfoAttributesEnum {
  None = "None",
  In = "In",
  Out = "Out",
  Lcid = "Lcid",
  Retval = "Retval",
  Optional = "Optional",
  HasDefault = "HasDefault",
  HasFieldMarshal = "HasFieldMarshal",
  Reserved3 = "Reserved3",
  Reserved4 = "Reserved4",
  ReservedMask = "ReservedMask",
}

export interface PlayerState {
  currentTrack: BaseTrackInfo | undefined;
  /** @format date-span */
  currentTrackDuration: string | undefined;
  /** @format uuid */
  id: string;
  isMuted: boolean;
  isPaused: boolean;
  isStoped: boolean;
  nextTrack: BaseTrackInfo | undefined;
  /** @format int32 */
  volume: number;
}

export interface PrizeType {
  id: string;
  image: string;
  text: string;
}

export interface PropertyInfo {
  attributes: PropertyInfoAttributesEnum;
  canRead: boolean;
  canWrite: boolean;
  customAttributes: CustomAttributeData[];
  declaringType: Type | undefined;
  getMethod: MethodInfo | undefined;
  isCollectible: boolean;
  isSpecialName: boolean;
  memberType: PropertyInfoMemberTypeEnum;
  /** @format int32 */
  metadataToken: number;
  module: Module;
  name: string;
  propertyType: Type;
  reflectedType: Type | undefined;
  setMethod: MethodInfo | undefined;
}

export enum PropertyInfoAttributesEnum {
  None = "None",
  SpecialName = "SpecialName",
  RTSpecialName = "RTSpecialName",
  HasDefault = "HasDefault",
  Reserved2 = "Reserved2",
  Reserved3 = "Reserved3",
  Reserved4 = "Reserved4",
  ReservedMask = "ReservedMask",
}

export enum PropertyInfoMemberTypeEnum {
  Constructor = "Constructor",
  Event = "Event",
  Field = "Field",
  Method = "Method",
  Property = "Property",
  TypeInfo = "TypeInfo",
  Custom = "Custom",
  NestedType = "NestedType",
  All = "All",
}

export type Root = object;

export interface RuntimeFieldHandle {
  value: IntPtr;
}

export interface RuntimeMethodHandle {
  value: IntPtr;
}

export interface RuntimeTypeHandle {
  value: IntPtr;
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
  meta: ScoreboardMetaDto;
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

export interface ServiceInfo {
  configuration: Record<string, any>;
  description: string;
  displayName: string;
  isEnabled: boolean;
  /** @format date-time */
  lastActivity: string | undefined;
  name: string;
  /** @format date-time */
  startTime: string | undefined;
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
  exception: string | undefined;
  level: string;
  message: string;
  /** @format date-time */
  timestamp: string;
}

export interface StringStringKeyValuePair {
  key: string | undefined;
  value: string | undefined;
}

export interface StructLayoutAttribute {
  typeId: any;
  value: StructLayoutAttributeValueEnum;
}

export enum StructLayoutAttributeValueEnum {
  Sequential = "Sequential",
  Explicit = "Explicit",
  Auto = "Auto",
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

export interface Type {
  assembly: Assembly;
  assemblyQualifiedName: string | undefined;
  attributes: TypeAttributesEnum;
  baseType: Type | undefined;
  containsGenericParameters: boolean;
  customAttributes: CustomAttributeData[];
  declaringMethod: MethodBase | undefined;
  declaringType: Type | undefined;
  fullName: string | undefined;
  genericParameterAttributes: TypeGenericParameterAttributesEnum;
  /** @format int32 */
  genericParameterPosition: number;
  genericTypeArguments: Type[];
  /** @format uuid */
  guid: string;
  hasElementType: boolean;
  isAbstract: boolean;
  isAnsiClass: boolean;
  isArray: boolean;
  isAutoClass: boolean;
  isAutoLayout: boolean;
  isByRef: boolean;
  isByRefLike: boolean;
  isCOMObject: boolean;
  isClass: boolean;
  isCollectible: boolean;
  isConstructedGenericType: boolean;
  isContextful: boolean;
  isEnum: boolean;
  isExplicitLayout: boolean;
  isFunctionPointer: boolean;
  isGenericMethodParameter: boolean;
  isGenericParameter: boolean;
  isGenericType: boolean;
  isGenericTypeDefinition: boolean;
  isGenericTypeParameter: boolean;
  isImport: boolean;
  isInterface: boolean;
  isLayoutSequential: boolean;
  isMarshalByRef: boolean;
  isNested: boolean;
  isNestedAssembly: boolean;
  isNestedFamANDAssem: boolean;
  isNestedFamORAssem: boolean;
  isNestedFamily: boolean;
  isNestedPrivate: boolean;
  isNestedPublic: boolean;
  isNotPublic: boolean;
  isPointer: boolean;
  isPrimitive: boolean;
  isPublic: boolean;
  isSZArray: boolean;
  isSealed: boolean;
  isSecurityCritical: boolean;
  isSecuritySafeCritical: boolean;
  isSecurityTransparent: boolean;
  /** @deprecated */
  isSerializable: boolean;
  isSignatureType: boolean;
  isSpecialName: boolean;
  isTypeDefinition: boolean;
  isUnicodeClass: boolean;
  isUnmanagedFunctionPointer: boolean;
  isValueType: boolean;
  isVariableBoundArray: boolean;
  isVisible: boolean;
  memberType: TypeMemberTypeEnum;
  /** @format int32 */
  metadataToken: number;
  module: Module;
  name: string;
  namespace: string | undefined;
  reflectedType: Type | undefined;
  structLayoutAttribute: StructLayoutAttribute | undefined;
  typeHandle: RuntimeTypeHandle;
  typeInitializer: ConstructorInfo | undefined;
  underlyingSystemType: Type;
}

export enum TypeAttributesEnum {
  NotPublic = "NotPublic",
  Public = "Public",
  NestedPublic = "NestedPublic",
  NestedPrivate = "NestedPrivate",
  NestedFamily = "NestedFamily",
  NestedAssembly = "NestedAssembly",
  NestedFamANDAssem = "NestedFamANDAssem",
  VisibilityMask = "VisibilityMask",
  SequentialLayout = "SequentialLayout",
  ExplicitLayout = "ExplicitLayout",
  LayoutMask = "LayoutMask",
  Interface = "Interface",
  Abstract = "Abstract",
  Sealed = "Sealed",
  SpecialName = "SpecialName",
  RTSpecialName = "RTSpecialName",
  Import = "Import",
  Serializable = "Serializable",
  WindowsRuntime = "WindowsRuntime",
  UnicodeClass = "UnicodeClass",
  AutoClass = "AutoClass",
  StringFormatMask = "StringFormatMask",
  HasSecurity = "HasSecurity",
  ReservedMask = "ReservedMask",
  BeforeFieldInit = "BeforeFieldInit",
  CustomFormatMask = "CustomFormatMask",
}

export enum TypeGenericParameterAttributesEnum {
  None = "None",
  Covariant = "Covariant",
  Contravariant = "Contravariant",
  VarianceMask = "VarianceMask",
  ReferenceTypeConstraint = "ReferenceTypeConstraint",
  NotNullableValueTypeConstraint = "NotNullableValueTypeConstraint",
  DefaultConstructorConstraint = "DefaultConstructorConstraint",
  SpecialConstraintMask = "SpecialConstraintMask",
  AllowByRefLike = "AllowByRefLike",
}

export interface TypeInfo {
  assembly: Assembly;
  assemblyQualifiedName: string | undefined;
  attributes: TypeInfoAttributesEnum;
  baseType: Type | undefined;
  containsGenericParameters: boolean;
  customAttributes: CustomAttributeData[];
  declaredConstructors: ConstructorInfo[];
  declaredEvents: EventInfo[];
  declaredFields: FieldInfo[];
  declaredMembers: MemberInfo[];
  declaredMethods: MethodInfo[];
  declaredNestedTypes: TypeInfo[];
  declaredProperties: PropertyInfo[];
  declaringMethod: MethodBase | undefined;
  declaringType: Type | undefined;
  fullName: string | undefined;
  genericParameterAttributes: TypeInfoGenericParameterAttributesEnum;
  /** @format int32 */
  genericParameterPosition: number;
  genericTypeArguments: Type[];
  genericTypeParameters: Type[];
  /** @format uuid */
  guid: string;
  hasElementType: boolean;
  implementedInterfaces: Type[];
  isAbstract: boolean;
  isAnsiClass: boolean;
  isArray: boolean;
  isAutoClass: boolean;
  isAutoLayout: boolean;
  isByRef: boolean;
  isByRefLike: boolean;
  isCOMObject: boolean;
  isClass: boolean;
  isCollectible: boolean;
  isConstructedGenericType: boolean;
  isContextful: boolean;
  isEnum: boolean;
  isExplicitLayout: boolean;
  isFunctionPointer: boolean;
  isGenericMethodParameter: boolean;
  isGenericParameter: boolean;
  isGenericType: boolean;
  isGenericTypeDefinition: boolean;
  isGenericTypeParameter: boolean;
  isImport: boolean;
  isInterface: boolean;
  isLayoutSequential: boolean;
  isMarshalByRef: boolean;
  isNested: boolean;
  isNestedAssembly: boolean;
  isNestedFamANDAssem: boolean;
  isNestedFamORAssem: boolean;
  isNestedFamily: boolean;
  isNestedPrivate: boolean;
  isNestedPublic: boolean;
  isNotPublic: boolean;
  isPointer: boolean;
  isPrimitive: boolean;
  isPublic: boolean;
  isSZArray: boolean;
  isSealed: boolean;
  isSecurityCritical: boolean;
  isSecuritySafeCritical: boolean;
  isSecurityTransparent: boolean;
  /** @deprecated */
  isSerializable: boolean;
  isSignatureType: boolean;
  isSpecialName: boolean;
  isTypeDefinition: boolean;
  isUnicodeClass: boolean;
  isUnmanagedFunctionPointer: boolean;
  isValueType: boolean;
  isVariableBoundArray: boolean;
  isVisible: boolean;
  memberType: TypeInfoMemberTypeEnum;
  /** @format int32 */
  metadataToken: number;
  module: Module;
  name: string;
  namespace: string | undefined;
  reflectedType: Type | undefined;
  structLayoutAttribute: StructLayoutAttribute | undefined;
  typeHandle: RuntimeTypeHandle;
  typeInitializer: ConstructorInfo | undefined;
  underlyingSystemType: Type;
}

export enum TypeInfoAttributesEnum {
  NotPublic = "NotPublic",
  Public = "Public",
  NestedPublic = "NestedPublic",
  NestedPrivate = "NestedPrivate",
  NestedFamily = "NestedFamily",
  NestedAssembly = "NestedAssembly",
  NestedFamANDAssem = "NestedFamANDAssem",
  VisibilityMask = "VisibilityMask",
  SequentialLayout = "SequentialLayout",
  ExplicitLayout = "ExplicitLayout",
  LayoutMask = "LayoutMask",
  Interface = "Interface",
  Abstract = "Abstract",
  Sealed = "Sealed",
  SpecialName = "SpecialName",
  RTSpecialName = "RTSpecialName",
  Import = "Import",
  Serializable = "Serializable",
  WindowsRuntime = "WindowsRuntime",
  UnicodeClass = "UnicodeClass",
  AutoClass = "AutoClass",
  StringFormatMask = "StringFormatMask",
  HasSecurity = "HasSecurity",
  ReservedMask = "ReservedMask",
  BeforeFieldInit = "BeforeFieldInit",
  CustomFormatMask = "CustomFormatMask",
}

export enum TypeInfoGenericParameterAttributesEnum {
  None = "None",
  Covariant = "Covariant",
  Contravariant = "Contravariant",
  VarianceMask = "VarianceMask",
  ReferenceTypeConstraint = "ReferenceTypeConstraint",
  NotNullableValueTypeConstraint = "NotNullableValueTypeConstraint",
  DefaultConstructorConstraint = "DefaultConstructorConstraint",
  SpecialConstraintMask = "SpecialConstraintMask",
  AllowByRefLike = "AllowByRefLike",
}

export enum TypeInfoMemberTypeEnum {
  Constructor = "Constructor",
  Event = "Event",
  Field = "Field",
  Method = "Method",
  Property = "Property",
  TypeInfo = "TypeInfo",
  Custom = "Custom",
  NestedType = "NestedType",
  All = "All",
}

export enum TypeMemberTypeEnum {
  Constructor = "Constructor",
  Event = "Event",
  Field = "Field",
  Method = "Method",
  Property = "Property",
  TypeInfo = "TypeInfo",
  Custom = "Custom",
  NestedType = "NestedType",
  All = "All",
}

export interface UserRequestedTrack {
  /** @format uuid */
  id: string;
  /** @format int32 */
  order: number;
  requestedTrack: BaseTrackInfo;
  /** @format uuid */
  requestedTrackId: string;
  twitchDisplayName: string | undefined;
  twitchId: string;
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

export interface YandexTrackAdditionalInfo {
  mp3TrackUrl: string | undefined;
  artworkUrl: string | undefined;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Telegramus Open Api v3
 * @version v1
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Info
   * @name EndpointsList
   * @request GET:/-/{controller}/endpoints
   */
  endpointsList = (controller: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/-/${controller}/endpoints`,
      method: "GET",
      ...params,
    });

  api = {
    /**
     * No description
     *
     * @tags Checkers
     * @name CheckersStartCreate
     * @request POST:/api/Checkers/start
     */
    checkersStartCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Checkers/start`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Checkers
     * @name CheckersMoveCreate
     * @request POST:/api/Checkers/move
     */
    checkersMoveCreate: (data: MoveRequest, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Checkers/move`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Checkers
     * @name CheckersStateList
     * @request GET:/api/Checkers/state
     */
    checkersStateList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Checkers/state`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Checkers
     * @name CheckersMovesDetail
     * @request GET:/api/Checkers/moves/{x}/{y}
     */
    checkersMovesDetail: (x: string, y: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Checkers/moves/${x}/${y}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Checkers
     * @name CheckersQueueJoinCreate
     * @request POST:/api/Checkers/queue/join
     */
    checkersQueueJoinCreate: (
      data: JoinQueueRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Checkers/queue/join`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Checkers
     * @name CheckersQueueLeaveCreate
     * @request POST:/api/Checkers/queue/leave
     */
    checkersQueueLeaveCreate: (
      data: LeaveQueueRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Checkers/queue/leave`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Checkers
     * @name CheckersQueueStatusList
     * @request GET:/api/Checkers/queue/status
     */
    checkersQueueStatusList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Checkers/queue/status`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Checkers
     * @name CheckersQueueNextGameList
     * @request GET:/api/Checkers/queue/next-game
     */
    checkersQueueNextGameList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Checkers/queue/next-game`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Commands
     * @name CommandsUserList
     * @request GET:/api/Commands/user
     */
    commandsUserList: (params: RequestParams = {}) =>
      this.request<string[], any>({
        path: `/api/Commands/user`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Commands
     * @name CommandsAdminList
     * @request GET:/api/Commands/admin
     */
    commandsAdminList: (params: RequestParams = {}) =>
      this.request<string[], any>({
        path: `/api/Commands/admin`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Commands
     * @name CommandsUserPlatformDetail
     * @request GET:/api/Commands/user/platform/{platform}
     */
    commandsUserPlatformDetail: (
      platform: CommandsUserPlatformDetailParamsEnum,
      params: RequestParams = {},
    ) =>
      this.request<string[], any>({
        path: `/api/Commands/user/platform/${platform}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Commands
     * @name CommandsAdminPlatformDetail
     * @request GET:/api/Commands/admin/platform/{platform}
     */
    commandsAdminPlatformDetail: (
      platform: CommandsAdminPlatformDetailParamsEnum,
      params: RequestParams = {},
    ) =>
      this.request<string[], any>({
        path: `/api/Commands/admin/platform/${platform}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Commands
     * @name CommandsUserPlatformInfoList
     * @request GET:/api/Commands/user/platform/{platform}/info
     */
    commandsUserPlatformInfoList: (
      platform: CommandsUserPlatformInfoListParamsEnum,
      params: RequestParams = {},
    ) =>
      this.request<CommandInfo[], any>({
        path: `/api/Commands/user/platform/${platform}/info`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Commands
     * @name CommandsAdminPlatformInfoList
     * @request GET:/api/Commands/admin/platform/{platform}/info
     */
    commandsAdminPlatformInfoList: (
      platform: CommandsAdminPlatformInfoListParamsEnum,
      params: RequestParams = {},
    ) =>
      this.request<CommandInfo[], any>({
        path: `/api/Commands/admin/platform/${platform}/info`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Commands
     * @name CommandsParametersList
     * @request GET:/api/Commands/{commandName}/parameters
     */
    commandsParametersList: (commandName: string, params: RequestParams = {}) =>
      this.request<CommandParameterInfo[], any>({
        path: `/api/Commands/${commandName}/parameters`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Commands
     * @name CommandsExecuteCreate
     * @request POST:/api/Commands/{commandName}/execute
     */
    commandsExecuteCreate: (
      commandName: string,
      data: string,
      params: RequestParams = {},
    ) =>
      this.request<string, any>({
        path: `/api/Commands/${commandName}/execute`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ServiceManager
     * @name ServiceManagerStatusList
     * @request GET:/api/ServiceManager/status
     */
    serviceManagerStatusList: (params: RequestParams = {}) =>
      this.request<
        Record<
          string,
          "Running" | "Stopped" | "Starting" | "Stopping" | "Error" | "Unknown"
        >,
        any
      >({
        path: `/api/ServiceManager/status`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ServiceManager
     * @name ServiceManagerServiceDetail
     * @request GET:/api/ServiceManager/service/{serviceName}
     */
    serviceManagerServiceDetail: (
      serviceName: string,
      params: RequestParams = {},
    ) =>
      this.request<ServiceInfo, any>({
        path: `/api/ServiceManager/service/${serviceName}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ServiceManager
     * @name ServiceManagerServiceStartCreate
     * @request POST:/api/ServiceManager/service/{serviceName}/start
     */
    serviceManagerServiceStartCreate: (
      serviceName: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/ServiceManager/service/${serviceName}/start`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ServiceManager
     * @name ServiceManagerServiceStopCreate
     * @request POST:/api/ServiceManager/service/{serviceName}/stop
     */
    serviceManagerServiceStopCreate: (
      serviceName: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/ServiceManager/service/${serviceName}/stop`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ServiceManager
     * @name ServiceManagerServiceRestartCreate
     * @request POST:/api/ServiceManager/service/{serviceName}/restart
     */
    serviceManagerServiceRestartCreate: (
      serviceName: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/ServiceManager/service/${serviceName}/restart`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ServiceManager
     * @name ServiceManagerServiceLogsList
     * @request GET:/api/ServiceManager/service/{serviceName}/logs
     */
    serviceManagerServiceLogsList: (
      serviceName: string,
      query?: {
        /**
         * @format int32
         * @default 100
         */
        count: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ServiceLog[], any>({
        path: `/api/ServiceManager/service/${serviceName}/logs`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ServiceManager
     * @name ServiceManagerServiceActiveCreate
     * @request POST:/api/ServiceManager/service/{serviceName}/active
     */
    serviceManagerServiceActiveCreate: (
      serviceName: string,
      data: boolean,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/ServiceManager/service/${serviceName}/active`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ServiceManager
     * @name ServiceManagerServicesList
     * @request GET:/api/ServiceManager/services
     */
    serviceManagerServicesList: (params: RequestParams = {}) =>
      this.request<ServiceInfo[], any>({
        path: `/api/ServiceManager/services`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SoundBar
     * @name SoundBarMuteCreate
     * @request POST:/api/SoundBar/mute
     */
    soundBarMuteCreate: (data: MuteRequest, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/SoundBar/mute`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags SoundBar
     * @name SoundBarUnmuteCreate
     * @request POST:/api/SoundBar/unmute
     */
    soundBarUnmuteCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/SoundBar/unmute`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SoundBar
     * @name SoundBarBagcountList
     * @request GET:/api/SoundBar/bagcount
     */
    soundBarBagcountList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/SoundBar/bagcount`,
        method: "GET",
        ...params,
      }),
  };
  memory = {
    /**
     * No description
     *
     * @tags PyroAlerts
     * @name MemoryDetail
     * @request GET:/memory/{escapedFileName}
     */
    memoryDetail: (escapedFileName: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/memory/${escapedFileName}`,
        method: "GET",
        ...params,
      }),
  };
  twitchtoken = {
    /**
     * No description
     *
     * @tags Twitch
     * @name TwitchtokenList
     * @request GET:/twitchtoken
     */
    twitchtokenList: (
      query?: {
        code: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/twitchtoken`,
        method: "GET",
        query: query,
        ...params,
      }),
  };
  hubs = {
    /**
     * No description
     *
     * @tags ScoreboardHub
     * @name ScoreboardHubGetCurrentStateCreate
     * @request POST:/hubs/ScoreboardHub/GetCurrentState
     */
    scoreboardHubGetCurrentStateCreate: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/hubs/ScoreboardHub/GetCurrentState`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ScoreboardHub
     * @name ScoreboardHubGetHistoryCreate
     * @request POST:/hubs/ScoreboardHub/GetHistory
     */
    scoreboardHubGetHistoryCreate: (
      query?: {
        /** @format int32 */
        count: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ScoreboardDto[], any>({
        path: `/hubs/ScoreboardHub/GetHistory`,
        method: "POST",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ScoreboardHub
     * @name ScoreboardHubJoinAsClientCreate
     * @request POST:/hubs/ScoreboardHub/JoinAsClient
     */
    scoreboardHubJoinAsClientCreate: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/hubs/ScoreboardHub/JoinAsClient`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ScoreboardHub
     * @name ScoreboardHubOnDisconnectedAsyncCreate
     * @request POST:/hubs/ScoreboardHub/OnDisconnectedAsync
     */
    scoreboardHubOnDisconnectedAsyncCreate: (
      query?: {
        exception: Exception;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/hubs/ScoreboardHub/OnDisconnectedAsync`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ScoreboardHub
     * @name ScoreboardHubSetPlayerFinalCreate
     * @request POST:/hubs/ScoreboardHub/SetPlayerFinal
     */
    scoreboardHubSetPlayerFinalCreate: (
      query?: {
        final: string;
        /** @format int32 */
        playerPosition: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/hubs/ScoreboardHub/SetPlayerFinal`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ScoreboardHub
     * @name ScoreboardHubSetVisibilityCreate
     * @request POST:/hubs/ScoreboardHub/SetVisibility
     */
    scoreboardHubSetVisibilityCreate: (
      query?: {
        isVisible: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/hubs/ScoreboardHub/SetVisibility`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ScoreboardHub
     * @name ScoreboardHubUpdatePlayerScoreCreate
     * @request POST:/hubs/ScoreboardHub/UpdatePlayerScore
     */
    scoreboardHubUpdatePlayerScoreCreate: (
      query?: {
        /** @format int32 */
        newScore: number;
        /** @format int32 */
        playerPosition: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/hubs/ScoreboardHub/UpdatePlayerScore`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ScoreboardHub
     * @name ScoreboardHubUpdateStateCreate
     * @request POST:/hubs/ScoreboardHub/UpdateState
     */
    scoreboardHubUpdateStateCreate: (
      query?: {
        state: ScoreboardDto;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/hubs/ScoreboardHub/UpdateState`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags SoundRequestHub
     * @name SoundRequestHubAddTrackToQueueCreate
     * @request POST:/hubs/SoundRequestHub/AddTrackToQueue
     */
    soundRequestHubAddTrackToQueueCreate: (
      query?: {
        track: UserRequestedTrack;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/hubs/SoundRequestHub/AddTrackToQueue`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags SoundRequestHub
     * @name SoundRequestHubEndedCreate
     * @request POST:/hubs/SoundRequestHub/Ended
     */
    soundRequestHubEndedCreate: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/hubs/SoundRequestHub/Ended`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SoundRequestHub
     * @name SoundRequestHubErrorPlayingCreate
     * @request POST:/hubs/SoundRequestHub/ErrorPlaying
     */
    soundRequestHubErrorPlayingCreate: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/hubs/SoundRequestHub/ErrorPlaying`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SoundRequestHub
     * @name SoundRequestHubGetHistoryCreate
     * @request POST:/hubs/SoundRequestHub/GetHistory
     */
    soundRequestHubGetHistoryCreate: (
      query?: {
        /** @format int32 */
        count: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<BaseTrackInfo[], any>({
        path: `/hubs/SoundRequestHub/GetHistory`,
        method: "POST",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SoundRequestHub
     * @name SoundRequestHubGetPlayerStateCreate
     * @request POST:/hubs/SoundRequestHub/GetPlayerState
     */
    soundRequestHubGetPlayerStateCreate: (params: RequestParams = {}) =>
      this.request<PlayerState, any>({
        path: `/hubs/SoundRequestHub/GetPlayerState`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SoundRequestHub
     * @name SoundRequestHubGetQueueCreate
     * @request POST:/hubs/SoundRequestHub/GetQueue
     */
    soundRequestHubGetQueueCreate: (params: RequestParams = {}) =>
      this.request<UserRequestedTrack[], any>({
        path: `/hubs/SoundRequestHub/GetQueue`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SoundRequestHub
     * @name SoundRequestHubJoinAsClientCreate
     * @request POST:/hubs/SoundRequestHub/JoinAsClient
     */
    soundRequestHubJoinAsClientCreate: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/hubs/SoundRequestHub/JoinAsClient`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SoundRequestHub
     * @name SoundRequestHubMuteCreate
     * @request POST:/hubs/SoundRequestHub/Mute
     */
    soundRequestHubMuteCreate: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/hubs/SoundRequestHub/Mute`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SoundRequestHub
     * @name SoundRequestHubPauseCreate
     * @request POST:/hubs/SoundRequestHub/Pause
     */
    soundRequestHubPauseCreate: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/hubs/SoundRequestHub/Pause`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SoundRequestHub
     * @name SoundRequestHubPlayCreate
     * @request POST:/hubs/SoundRequestHub/Play
     */
    soundRequestHubPlayCreate: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/hubs/SoundRequestHub/Play`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SoundRequestHub
     * @name SoundRequestHubResumeCreate
     * @request POST:/hubs/SoundRequestHub/Resume
     */
    soundRequestHubResumeCreate: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/hubs/SoundRequestHub/Resume`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SoundRequestHub
     * @name SoundRequestHubSetVolumeCreate
     * @request POST:/hubs/SoundRequestHub/SetVolume
     */
    soundRequestHubSetVolumeCreate: (
      query?: {
        /** @format int32 */
        volume: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/hubs/SoundRequestHub/SetVolume`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags SoundRequestHub
     * @name SoundRequestHubSkipCreate
     * @request POST:/hubs/SoundRequestHub/Skip
     */
    soundRequestHubSkipCreate: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/hubs/SoundRequestHub/Skip`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SoundRequestHub
     * @name SoundRequestHubStartedCreate
     * @request POST:/hubs/SoundRequestHub/Started
     */
    soundRequestHubStartedCreate: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/hubs/SoundRequestHub/Started`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SoundRequestHub
     * @name SoundRequestHubStopCreate
     * @request POST:/hubs/SoundRequestHub/Stop
     */
    soundRequestHubStopCreate: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/hubs/SoundRequestHub/Stop`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SoundRequestHub
     * @name SoundRequestHubUnmuteCreate
     * @request POST:/hubs/SoundRequestHub/Unmute
     */
    soundRequestHubUnmuteCreate: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/hubs/SoundRequestHub/Unmute`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TunaHub
     * @name TunaHubBeYmCreate
     * @request POST:/hubs/TunaHub/BeYm
     */
    tunaHubBeYmCreate: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/hubs/TunaHub/BeYm`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TunaHub
     * @name TunaHubGetYandexMusicTracksCreate
     * @request POST:/hubs/TunaHub/GetYandexMusicTracks
     */
    tunaHubGetYandexMusicTracksCreate: (
      query?: {
        title: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Root, any>({
        path: `/hubs/TunaHub/GetYandexMusicTracks`,
        method: "POST",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TunaHub
     * @name TunaHubOnConnectedAsyncCreate
     * @request POST:/hubs/TunaHub/OnConnectedAsync
     */
    tunaHubOnConnectedAsyncCreate: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/hubs/TunaHub/OnConnectedAsync`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TunaHub
     * @name TunaHubSendPlayerDataCreate
     * @request POST:/hubs/TunaHub/SendPlayerData
     */
    tunaHubSendPlayerDataCreate: (
      query?: {
        info: TunaMusicDTO;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/hubs/TunaHub/SendPlayerData`,
        method: "POST",
        query: query,
        ...params,
      }),
  };
  telegramus = {
    /**
     * No description
     *
     * @tags TelegramusHub
     * @name MuteAllCreate
     * @request POST:/telegramus/MuteAll
     */
    muteAllCreate: (
      query?: {
        args: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/telegramus/MuteAll`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags TelegramusHub
     * @name OnConnectedAsyncCreate
     * @request POST:/telegramus/OnConnectedAsync
     */
    onConnectedAsyncCreate: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/telegramus/OnConnectedAsync`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TelegramusHub
     * @name TwitchMsgCreate
     * @request POST:/telegramus/TwitchMsg
     */
    twitchMsgCreate: (
      query?: {
        msg: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/telegramus/TwitchMsg`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags TelegramusHub
     * @name UnmuteSessionsCreate
     * @request POST:/telegramus/UnmuteSessions
     */
    unmuteSessionsCreate: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/telegramus/UnmuteSessions`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TelegramusHub
     * @name AddNewWaifuCreate
     * @request POST:/telegramus/AddNewWaifu
     */
    addNewWaifuCreate: (
      query?: {
        color: string;
        content: Waifu;
        displayName: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/telegramus/AddNewWaifu`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags TelegramusHub
     * @name AlertCreate
     * @request POST:/telegramus/Alert
     */
    alertCreate: (
      query?: {
        info: MediaDto;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/telegramus/Alert`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags TelegramusHub
     * @name AlertsCreate
     * @request POST:/telegramus/Alerts
     */
    alertsCreate: (
      query?: {
        info: MediaDto[];
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/telegramus/Alerts`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags TelegramusHub
     * @name AutoMessageCreate
     * @request POST:/telegramus/AutoMessage
     */
    autoMessageCreate: (
      query?: {
        message: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/telegramus/AutoMessage`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags TelegramusHub
     * @name DeleteMessageCreate
     * @request POST:/telegramus/DeleteMessage
     */
    deleteMessageCreate: (
      query?: {
        id: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/telegramus/DeleteMessage`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags TelegramusHub
     * @name FumoFridayCreate
     * @request POST:/telegramus/FumoFriday
     */
    fumoFridayCreate: (
      query?: {
        color: string;
        displayName: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/telegramus/FumoFriday`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags TelegramusHub
     * @name HighliteCreate
     * @request POST:/telegramus/Highlite
     */
    highliteCreate: (
      query?: {
        color: string;
        faceUrl: Image;
        message: ChatMessage;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/telegramus/Highlite`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags TelegramusHub
     * @name MakeScreenEmojisParticlesCreate
     * @request POST:/telegramus/MakeScreenEmojisParticles
     */
    makeScreenEmojisParticlesCreate: (
      query?: {
        message: ChatMessage;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/telegramus/MakeScreenEmojisParticles`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags TelegramusHub
     * @name MakeScreenParticlesCreate
     * @request POST:/telegramus/MakeScreenParticles
     */
    makeScreenParticlesCreate: (
      query?: {
        particles: MakeScreenParticlesCreateParamsParticlesEnum;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/telegramus/MakeScreenParticles`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags TelegramusHub
     * @name MergeWaifuCreate
     * @request POST:/telegramus/MergeWaifu
     */
    mergeWaifuCreate: (
      query?: {
        avatar: string;
        color: string;
        content: Waifu;
        host: Host;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/telegramus/MergeWaifu`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags TelegramusHub
     * @name NewMessageCreate
     * @request POST:/telegramus/NewMessage
     */
    newMessageCreate: (
      query?: {
        id: string;
        message: ChatMessage;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/telegramus/NewMessage`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags TelegramusHub
     * @name PostTwitchInfoCreate
     * @request POST:/telegramus/PostTwitchInfo
     */
    postTwitchInfoCreate: (
      query?: {
        clientId: string;
        secret: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/telegramus/PostTwitchInfo`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags TelegramusHub
     * @name RandomMemCreate
     * @request POST:/telegramus/RandomMem
     */
    randomMemCreate: (
      query?: {
        mediaInfo: MediaDto;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/telegramus/RandomMem`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags TelegramusHub
     * @name UpdateWaifuPrizesCreate
     * @request POST:/telegramus/UpdateWaifuPrizes
     */
    updateWaifuPrizesCreate: (
      query?: {
        prizes: PrizeType[];
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/telegramus/UpdateWaifuPrizes`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags TelegramusHub
     * @name WaifuRollCreate
     * @request POST:/telegramus/WaifuRoll
     */
    waifuRollCreate: (
      query?: {
        color: string;
        content: Waifu;
        displayName: string;
        waifuHusband: Host;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/telegramus/WaifuRoll`,
        method: "POST",
        query: query,
        ...params,
      }),
  };
}

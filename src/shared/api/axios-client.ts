/** Generate by swagger-axios-codegen */
/* eslint-disable */

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
  reject: (p: any) => void
): Promise<any> {
  if (serviceOptions.axios) {
    return serviceOptions.axios
      .request(configs)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
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
  options: any
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

/** Assembly */
export interface Assembly {
  /**  */
  definedTypes: TypeInfo[];

  /**  */
  exportedTypes: Type[];

  /**  */
  codeBase?: string;

  /**  */
  entryPoint?: CombinedEntryPointTypes;

  /**  */
  fullName?: string;

  /**  */
  imageRuntimeVersion: string;

  /**  */
  isDynamic: boolean;

  /**  */
  location: string;

  /**  */
  reflectionOnly: boolean;

  /**  */
  isCollectible: boolean;

  /**  */
  isFullyTrusted: boolean;

  /**  */
  customAttributes: CustomAttributeData[];

  /**  */
  escapedCodeBase: string;

  /**  */
  manifestModule: CombinedManifestModuleTypes;

  /**  */
  modules: Module[];

  /**  */
  globalAssemblyCache: boolean;

  /**  */
  hostContext: string;

  /**  */
  securityRuleSet: EnumAssemblySecurityRuleSet;
}

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

/** CommandInfo */
export interface CommandInfo {
  /**  */
  name: string;

  /**  */
  description: string;

  /**  */
  isAdminCommand: boolean;

  /**  */
  parameters: CommandParameterInfo[];

  /**  */
  availablePlatforms: EnumCommandInfoAvailablePlatforms[];
}

/** CommandParameterInfo */
export interface CommandParameterInfo {
  /**  */
  name: string;

  /**  */
  description: string;

  /**  */
  type: string;

  /**  */
  required: boolean;

  /**  */
  defaultValue?: string;
}

/** ConstructorInfo */
export interface ConstructorInfo {
  /**  */
  name: string;

  /**  */
  declaringType?: CombinedDeclaringTypeTypes;

  /**  */
  reflectedType?: CombinedReflectedTypeTypes;

  /**  */
  module: CombinedModuleTypes;

  /**  */
  customAttributes: CustomAttributeData[];

  /**  */
  isCollectible: boolean;

  /**  */
  metadataToken: number;

  /**  */
  attributes: EnumConstructorInfoAttributes;

  /**  */
  methodImplementationFlags: EnumConstructorInfoMethodImplementationFlags;

  /**  */
  callingConvention: EnumConstructorInfoCallingConvention;

  /**  */
  isAbstract: boolean;

  /**  */
  isConstructor: boolean;

  /**  */
  isFinal: boolean;

  /**  */
  isHideBySig: boolean;

  /**  */
  isSpecialName: boolean;

  /**  */
  isStatic: boolean;

  /**  */
  isVirtual: boolean;

  /**  */
  isAssembly: boolean;

  /**  */
  isFamily: boolean;

  /**  */
  isFamilyAndAssembly: boolean;

  /**  */
  isFamilyOrAssembly: boolean;

  /**  */
  isPrivate: boolean;

  /**  */
  isPublic: boolean;

  /**  */
  isConstructedGenericMethod: boolean;

  /**  */
  isGenericMethod: boolean;

  /**  */
  isGenericMethodDefinition: boolean;

  /**  */
  containsGenericParameters: boolean;

  /**  */
  methodHandle: CombinedMethodHandleTypes;

  /**  */
  isSecurityCritical: boolean;

  /**  */
  isSecuritySafeCritical: boolean;

  /**  */
  isSecurityTransparent: boolean;

  /**  */
  memberType: EnumConstructorInfoMemberType;
}

/** CustomAttributeData */
export interface CustomAttributeData {
  /**  */
  attributeType: CombinedAttributeTypeTypes;

  /**  */
  constructor: CombinedConstructorTypes;

  /**  */
  constructorArguments: CustomAttributeTypedArgument[];

  /**  */
  namedArguments: CustomAttributeNamedArgument[];
}

/** CustomAttributeNamedArgument */
export interface CustomAttributeNamedArgument {
  /**  */
  memberInfo: CombinedMemberInfoTypes;

  /**  */
  typedValue: CombinedTypedValueTypes;

  /**  */
  memberName: string;

  /**  */
  isField: boolean;
}

/** CustomAttributeTypedArgument */
export interface CustomAttributeTypedArgument {
  /**  */
  argumentType: CombinedArgumentTypeTypes;

  /**  */
  value?: any | null;
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

/** EventInfo */
export interface EventInfo {
  /**  */
  name: string;

  /**  */
  declaringType?: CombinedDeclaringTypeTypes;

  /**  */
  reflectedType?: CombinedReflectedTypeTypes;

  /**  */
  module: CombinedModuleTypes;

  /**  */
  customAttributes: CustomAttributeData[];

  /**  */
  isCollectible: boolean;

  /**  */
  metadataToken: number;

  /**  */
  memberType: EnumEventInfoMemberType;

  /**  */
  attributes: EnumEventInfoAttributes;

  /**  */
  isSpecialName: boolean;

  /**  */
  addMethod?: CombinedAddMethodTypes;

  /**  */
  removeMethod?: CombinedRemoveMethodTypes;

  /**  */
  raiseMethod?: CombinedRaiseMethodTypes;

  /**  */
  isMulticast: boolean;

  /**  */
  eventHandlerType?: CombinedEventHandlerTypeTypes;
}

/** Exception */
export interface Exception {
  /**  */
  targetSite?: CombinedTargetSiteTypes;

  /**  */
  message: string;

  /**  */
  data: object;

  /**  */
  innerException?: CombinedInnerExceptionTypes;

  /**  */
  helpLink?: string;

  /**  */
  source?: string;

  /**  */
  hResult: number;

  /**  */
  stackTrace?: string;
}

/** FieldInfo */
export interface FieldInfo {
  /**  */
  name: string;

  /**  */
  declaringType?: CombinedDeclaringTypeTypes;

  /**  */
  reflectedType?: CombinedReflectedTypeTypes;

  /**  */
  module: CombinedModuleTypes;

  /**  */
  customAttributes: CustomAttributeData[];

  /**  */
  isCollectible: boolean;

  /**  */
  metadataToken: number;

  /**  */
  memberType: EnumFieldInfoMemberType;

  /**  */
  attributes: EnumFieldInfoAttributes;

  /**  */
  fieldType: CombinedFieldTypeTypes;

  /**  */
  isInitOnly: boolean;

  /**  */
  isLiteral: boolean;

  /**  */
  isNotSerialized: boolean;

  /**  */
  isPinvokeImpl: boolean;

  /**  */
  isSpecialName: boolean;

  /**  */
  isStatic: boolean;

  /**  */
  isAssembly: boolean;

  /**  */
  isFamily: boolean;

  /**  */
  isFamilyAndAssembly: boolean;

  /**  */
  isFamilyOrAssembly: boolean;

  /**  */
  isPrivate: boolean;

  /**  */
  isPublic: boolean;

  /**  */
  isSecurityCritical: boolean;

  /**  */
  isSecuritySafeCritical: boolean;

  /**  */
  isSecurityTransparent: boolean;

  /**  */
  fieldHandle: CombinedFieldHandleTypes;
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

/** ICustomAttributeProvider */
export interface ICustomAttributeProvider {}

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

/** IntPtr */
export interface IntPtr {}

/** JoinQueueRequest */
export interface JoinQueueRequest {
  /**  */
  playerId: string;
}

/** LeaveQueueRequest */
export interface LeaveQueueRequest {
  /**  */
  playerId: string;
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

/** MemberInfo */
export interface MemberInfo {
  /**  */
  memberType: EnumMemberInfoMemberType;

  /**  */
  name: string;

  /**  */
  declaringType?: CombinedDeclaringTypeTypes;

  /**  */
  reflectedType?: CombinedReflectedTypeTypes;

  /**  */
  module: CombinedModuleTypes;

  /**  */
  customAttributes: CustomAttributeData[];

  /**  */
  isCollectible: boolean;

  /**  */
  metadataToken: number;
}

/** MethodBase */
export interface MethodBase {
  /**  */
  memberType: EnumMethodBaseMemberType;

  /**  */
  name: string;

  /**  */
  declaringType?: CombinedDeclaringTypeTypes;

  /**  */
  reflectedType?: CombinedReflectedTypeTypes;

  /**  */
  module: CombinedModuleTypes;

  /**  */
  customAttributes: CustomAttributeData[];

  /**  */
  isCollectible: boolean;

  /**  */
  metadataToken: number;

  /**  */
  attributes: EnumMethodBaseAttributes;

  /**  */
  methodImplementationFlags: EnumMethodBaseMethodImplementationFlags;

  /**  */
  callingConvention: EnumMethodBaseCallingConvention;

  /**  */
  isAbstract: boolean;

  /**  */
  isConstructor: boolean;

  /**  */
  isFinal: boolean;

  /**  */
  isHideBySig: boolean;

  /**  */
  isSpecialName: boolean;

  /**  */
  isStatic: boolean;

  /**  */
  isVirtual: boolean;

  /**  */
  isAssembly: boolean;

  /**  */
  isFamily: boolean;

  /**  */
  isFamilyAndAssembly: boolean;

  /**  */
  isFamilyOrAssembly: boolean;

  /**  */
  isPrivate: boolean;

  /**  */
  isPublic: boolean;

  /**  */
  isConstructedGenericMethod: boolean;

  /**  */
  isGenericMethod: boolean;

  /**  */
  isGenericMethodDefinition: boolean;

  /**  */
  containsGenericParameters: boolean;

  /**  */
  methodHandle: CombinedMethodHandleTypes;

  /**  */
  isSecurityCritical: boolean;

  /**  */
  isSecuritySafeCritical: boolean;

  /**  */
  isSecurityTransparent: boolean;
}

/** MethodInfo */
export interface MethodInfo {
  /**  */
  name: string;

  /**  */
  declaringType?: CombinedDeclaringTypeTypes;

  /**  */
  reflectedType?: CombinedReflectedTypeTypes;

  /**  */
  module: CombinedModuleTypes;

  /**  */
  customAttributes: CustomAttributeData[];

  /**  */
  isCollectible: boolean;

  /**  */
  metadataToken: number;

  /**  */
  attributes: EnumMethodInfoAttributes;

  /**  */
  methodImplementationFlags: EnumMethodInfoMethodImplementationFlags;

  /**  */
  callingConvention: EnumMethodInfoCallingConvention;

  /**  */
  isAbstract: boolean;

  /**  */
  isConstructor: boolean;

  /**  */
  isFinal: boolean;

  /**  */
  isHideBySig: boolean;

  /**  */
  isSpecialName: boolean;

  /**  */
  isStatic: boolean;

  /**  */
  isVirtual: boolean;

  /**  */
  isAssembly: boolean;

  /**  */
  isFamily: boolean;

  /**  */
  isFamilyAndAssembly: boolean;

  /**  */
  isFamilyOrAssembly: boolean;

  /**  */
  isPrivate: boolean;

  /**  */
  isPublic: boolean;

  /**  */
  isConstructedGenericMethod: boolean;

  /**  */
  isGenericMethod: boolean;

  /**  */
  isGenericMethodDefinition: boolean;

  /**  */
  containsGenericParameters: boolean;

  /**  */
  methodHandle: CombinedMethodHandleTypes;

  /**  */
  isSecurityCritical: boolean;

  /**  */
  isSecuritySafeCritical: boolean;

  /**  */
  isSecurityTransparent: boolean;

  /**  */
  memberType: EnumMethodInfoMemberType;

  /**  */
  returnParameter: CombinedReturnParameterTypes;

  /**  */
  returnType: CombinedReturnTypeTypes;

  /**  */
  returnTypeCustomAttributes: CombinedReturnTypeCustomAttributesTypes;
}

/** Module */
export interface Module {
  /**  */
  assembly: CombinedAssemblyTypes;

  /**  */
  fullyQualifiedName: string;

  /**  */
  name: string;

  /**  */
  mdStreamVersion: number;

  /**  */
  moduleVersionId: string;

  /**  */
  scopeName: string;

  /**  */
  moduleHandle: CombinedModuleHandleTypes;

  /**  */
  customAttributes: CustomAttributeData[];

  /**  */
  metadataToken: number;
}

/** ModuleHandle */
export interface ModuleHandle {
  /**  */
  mdStreamVersion: number;
}

/** MoveRequest */
export interface MoveRequest {
  /**  */
  fromX: string;

  /**  */
  fromY: number;

  /**  */
  toX: string;

  /**  */
  toY: number;
}

/** MuteRequest */
export interface MuteRequest {
  /**  */
  processNames: string[];
}

/** ParameterInfo */
export interface ParameterInfo {
  /**  */
  attributes: EnumParameterInfoAttributes;

  /**  */
  member: CombinedMemberTypes;

  /**  */
  name?: string;

  /**  */
  parameterType: CombinedParameterTypeTypes;

  /**  */
  position: number;

  /**  */
  isIn: boolean;

  /**  */
  isLcid: boolean;

  /**  */
  isOptional: boolean;

  /**  */
  isOut: boolean;

  /**  */
  isRetval: boolean;

  /**  */
  defaultValue?: any | null;

  /**  */
  rawDefaultValue?: any | null;

  /**  */
  hasDefaultValue: boolean;

  /**  */
  customAttributes: CustomAttributeData[];

  /**  */
  metadataToken: number;
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

/** PropertyInfo */
export interface PropertyInfo {
  /**  */
  name: string;

  /**  */
  declaringType?: CombinedDeclaringTypeTypes;

  /**  */
  reflectedType?: CombinedReflectedTypeTypes;

  /**  */
  module: CombinedModuleTypes;

  /**  */
  customAttributes: CustomAttributeData[];

  /**  */
  isCollectible: boolean;

  /**  */
  metadataToken: number;

  /**  */
  memberType: EnumPropertyInfoMemberType;

  /**  */
  propertyType: CombinedPropertyTypeTypes;

  /**  */
  attributes: EnumPropertyInfoAttributes;

  /**  */
  isSpecialName: boolean;

  /**  */
  canRead: boolean;

  /**  */
  canWrite: boolean;

  /**  */
  getMethod?: CombinedGetMethodTypes;

  /**  */
  setMethod?: CombinedSetMethodTypes;
}

/** Root */
export interface Root {}

/** RuntimeFieldHandle */
export interface RuntimeFieldHandle {
  /**  */
  value: CombinedValueTypes;
}

/** RuntimeMethodHandle */
export interface RuntimeMethodHandle {
  /**  */
  value: CombinedValueTypes;
}

/** RuntimeTypeHandle */
export interface RuntimeTypeHandle {
  /**  */
  value: CombinedValueTypes;
}

/** ScoreboardColorsDto */
export interface ScoreboardColorsDto {
  /**  */
  mainColor: string;

  /**  */
  playerNamesColor: string;

  /**  */
  tournamentTitleColor: string;

  /**  */
  fightModeColor: string;

  /**  */
  scoreColor: string;

  /**  */
  backgroundColor: string;

  /**  */
  borderColor: string;
}

/** ScoreboardDto */
export interface ScoreboardDto {
  /**  */
  player1: CombinedPlayer1Types;

  /**  */
  player2: CombinedPlayer2Types;

  /**  */
  meta: CombinedMetaTypes;

  /**  */
  colors: CombinedColorsTypes;

  /**  */
  isVisible: boolean;

  /**  */
  animationDuration: number;

  /**  */
  layout?: CombinedLayoutTypes;
}

/** ScoreboardLayoutDto */
export interface ScoreboardLayoutDto {
  /**  */
  headerTop: number;

  /**  */
  headerLeft: number;

  /**  */
  playersTop: number;

  /**  */
  playersLeft: number;

  /**  */
  playersRight: number;

  /**  */
  headerHeight: number;

  /**  */
  headerWidth: number;

  /**  */
  playerBarHeight: number;

  /**  */
  playerBarWidth: number;

  /**  */
  scoreSize: number;

  /**  */
  flagSize: number;

  /**  */
  spacing: number;

  /**  */
  padding: number;

  /**  */
  showHeader: boolean;

  /**  */
  showFlags: boolean;

  /**  */
  showSponsors: boolean;

  /**  */
  showTags: boolean;
}

/** ScoreboardMetaDto */
export interface ScoreboardMetaDto {
  /**  */
  title: string;

  /**  */
  fightRule: string;
}

/** ScoreboardPlayerDto */
export interface ScoreboardPlayerDto {
  /**  */
  name: string;

  /**  */
  sponsor: string;

  /**  */
  score: number;

  /**  */
  tag: string;

  /**  */
  flag: string;

  /**  */
  final: string;
}

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

/** StructLayoutAttribute */
export interface StructLayoutAttribute {
  /**  */
  typeId: any | null;

  /**  */
  value: EnumStructLayoutAttributeValue;
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
  progress: number;

  /**  */
  duration: number;

  /**  */
  album_url: string;
}

/** Type */
export interface Type {
  /**  */
  name: string;

  /**  */
  customAttributes: CustomAttributeData[];

  /**  */
  isCollectible: boolean;

  /**  */
  metadataToken: number;

  /**  */
  memberType: EnumTypeMemberType;

  /**  */
  namespace?: string;

  /**  */
  assemblyQualifiedName?: string;

  /**  */
  fullName?: string;

  /**  */
  assembly: CombinedAssemblyTypes;

  /**  */
  module: CombinedModuleTypes;

  /**  */
  isInterface: boolean;

  /**  */
  isNested: boolean;

  /**  */
  declaringType?: CombinedDeclaringTypeTypes;

  /**  */
  declaringMethod?: CombinedDeclaringMethodTypes;

  /**  */
  reflectedType?: CombinedReflectedTypeTypes;

  /**  */
  underlyingSystemType: CombinedUnderlyingSystemTypeTypes;

  /**  */
  isTypeDefinition: boolean;

  /**  */
  isArray: boolean;

  /**  */
  isByRef: boolean;

  /**  */
  isPointer: boolean;

  /**  */
  isConstructedGenericType: boolean;

  /**  */
  isGenericParameter: boolean;

  /**  */
  isGenericTypeParameter: boolean;

  /**  */
  isGenericMethodParameter: boolean;

  /**  */
  isGenericType: boolean;

  /**  */
  isGenericTypeDefinition: boolean;

  /**  */
  isSZArray: boolean;

  /**  */
  isVariableBoundArray: boolean;

  /**  */
  isByRefLike: boolean;

  /**  */
  isFunctionPointer: boolean;

  /**  */
  isUnmanagedFunctionPointer: boolean;

  /**  */
  hasElementType: boolean;

  /**  */
  genericTypeArguments: Type[];

  /**  */
  genericParameterPosition: number;

  /**  */
  genericParameterAttributes: EnumTypeGenericParameterAttributes;

  /**  */
  attributes: EnumTypeAttributes;

  /**  */
  isAbstract: boolean;

  /**  */
  isImport: boolean;

  /**  */
  isSealed: boolean;

  /**  */
  isSpecialName: boolean;

  /**  */
  isClass: boolean;

  /**  */
  isNestedAssembly: boolean;

  /**  */
  isNestedFamANDAssem: boolean;

  /**  */
  isNestedFamily: boolean;

  /**  */
  isNestedFamORAssem: boolean;

  /**  */
  isNestedPrivate: boolean;

  /**  */
  isNestedPublic: boolean;

  /**  */
  isNotPublic: boolean;

  /**  */
  isPublic: boolean;

  /**  */
  isAutoLayout: boolean;

  /**  */
  isExplicitLayout: boolean;

  /**  */
  isLayoutSequential: boolean;

  /**  */
  isAnsiClass: boolean;

  /**  */
  isAutoClass: boolean;

  /**  */
  isUnicodeClass: boolean;

  /**  */
  isCOMObject: boolean;

  /**  */
  isContextful: boolean;

  /**  */
  isEnum: boolean;

  /**  */
  isMarshalByRef: boolean;

  /**  */
  isPrimitive: boolean;

  /**  */
  isValueType: boolean;

  /**  */
  isSignatureType: boolean;

  /**  */
  isSecurityCritical: boolean;

  /**  */
  isSecuritySafeCritical: boolean;

  /**  */
  isSecurityTransparent: boolean;

  /**  */
  structLayoutAttribute?: CombinedStructLayoutAttributeTypes;

  /**  */
  typeInitializer?: CombinedTypeInitializerTypes;

  /**  */
  typeHandle: CombinedTypeHandleTypes;

  /**  */
  guid: string;

  /**  */
  baseType?: CombinedBaseTypeTypes;

  /**  */
  isSerializable: boolean;

  /**  */
  containsGenericParameters: boolean;

  /**  */
  isVisible: boolean;
}

/** TypeInfo */
export interface TypeInfo {
  /**  */
  name: string;

  /**  */
  customAttributes: CustomAttributeData[];

  /**  */
  isCollectible: boolean;

  /**  */
  metadataToken: number;

  /**  */
  memberType: EnumTypeInfoMemberType;

  /**  */
  namespace?: string;

  /**  */
  assemblyQualifiedName?: string;

  /**  */
  fullName?: string;

  /**  */
  assembly: CombinedAssemblyTypes;

  /**  */
  module: CombinedModuleTypes;

  /**  */
  isInterface: boolean;

  /**  */
  isNested: boolean;

  /**  */
  declaringType?: CombinedDeclaringTypeTypes;

  /**  */
  declaringMethod?: CombinedDeclaringMethodTypes;

  /**  */
  reflectedType?: CombinedReflectedTypeTypes;

  /**  */
  underlyingSystemType: CombinedUnderlyingSystemTypeTypes;

  /**  */
  isTypeDefinition: boolean;

  /**  */
  isArray: boolean;

  /**  */
  isByRef: boolean;

  /**  */
  isPointer: boolean;

  /**  */
  isConstructedGenericType: boolean;

  /**  */
  isGenericParameter: boolean;

  /**  */
  isGenericTypeParameter: boolean;

  /**  */
  isGenericMethodParameter: boolean;

  /**  */
  isGenericType: boolean;

  /**  */
  isGenericTypeDefinition: boolean;

  /**  */
  isSZArray: boolean;

  /**  */
  isVariableBoundArray: boolean;

  /**  */
  isByRefLike: boolean;

  /**  */
  isFunctionPointer: boolean;

  /**  */
  isUnmanagedFunctionPointer: boolean;

  /**  */
  hasElementType: boolean;

  /**  */
  genericTypeArguments: Type[];

  /**  */
  genericParameterPosition: number;

  /**  */
  genericParameterAttributes: EnumTypeInfoGenericParameterAttributes;

  /**  */
  attributes: EnumTypeInfoAttributes;

  /**  */
  isAbstract: boolean;

  /**  */
  isImport: boolean;

  /**  */
  isSealed: boolean;

  /**  */
  isSpecialName: boolean;

  /**  */
  isClass: boolean;

  /**  */
  isNestedAssembly: boolean;

  /**  */
  isNestedFamANDAssem: boolean;

  /**  */
  isNestedFamily: boolean;

  /**  */
  isNestedFamORAssem: boolean;

  /**  */
  isNestedPrivate: boolean;

  /**  */
  isNestedPublic: boolean;

  /**  */
  isNotPublic: boolean;

  /**  */
  isPublic: boolean;

  /**  */
  isAutoLayout: boolean;

  /**  */
  isExplicitLayout: boolean;

  /**  */
  isLayoutSequential: boolean;

  /**  */
  isAnsiClass: boolean;

  /**  */
  isAutoClass: boolean;

  /**  */
  isUnicodeClass: boolean;

  /**  */
  isCOMObject: boolean;

  /**  */
  isContextful: boolean;

  /**  */
  isEnum: boolean;

  /**  */
  isMarshalByRef: boolean;

  /**  */
  isPrimitive: boolean;

  /**  */
  isValueType: boolean;

  /**  */
  isSignatureType: boolean;

  /**  */
  isSecurityCritical: boolean;

  /**  */
  isSecuritySafeCritical: boolean;

  /**  */
  isSecurityTransparent: boolean;

  /**  */
  structLayoutAttribute?: CombinedStructLayoutAttributeTypes;

  /**  */
  typeInitializer?: CombinedTypeInitializerTypes;

  /**  */
  typeHandle: CombinedTypeHandleTypes;

  /**  */
  guid: string;

  /**  */
  baseType?: CombinedBaseTypeTypes;

  /**  */
  isSerializable: boolean;

  /**  */
  containsGenericParameters: boolean;

  /**  */
  isVisible: boolean;

  /**  */
  genericTypeParameters: Type[];

  /**  */
  declaredConstructors: ConstructorInfo[];

  /**  */
  declaredEvents: EventInfo[];

  /**  */
  declaredFields: FieldInfo[];

  /**  */
  declaredMembers: MemberInfo[];

  /**  */
  declaredMethods: MethodInfo[];

  /**  */
  declaredNestedTypes: TypeInfo[];

  /**  */
  declaredProperties: PropertyInfo[];

  /**  */
  implementedInterfaces: Type[];
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
export type CombinedEntryPointTypes = MethodInfo;
export type CombinedManifestModuleTypes = Module;
export enum EnumAssemblySecurityRuleSet {
  "None" = "None",
  "Level1" = "Level1",
  "Level2" = "Level2",
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
export enum EnumCommandInfoAvailablePlatforms {
  "None" = "None",
  "Api" = "Api",
  "Telegram" = "Telegram",
  "Twitch" = "Twitch",
  "Discord" = "Discord",
  "Vk" = "Vk",
}
export type CombinedDeclaringTypeTypes = Type;
export type CombinedReflectedTypeTypes = Type;
export type CombinedModuleTypes = Module;
export enum EnumConstructorInfoAttributes {
  "PrivateScope" = "PrivateScope",
  "Private" = "Private",
  "FamANDAssem" = "FamANDAssem",
  "Assembly" = "Assembly",
  "Family" = "Family",
  "FamORAssem" = "FamORAssem",
  "Public" = "Public",
  "MemberAccessMask" = "MemberAccessMask",
  "UnmanagedExport" = "UnmanagedExport",
  "Static" = "Static",
  "Final" = "Final",
  "Virtual" = "Virtual",
  "HideBySig" = "HideBySig",
  "NewSlot" = "NewSlot",
  "CheckAccessOnOverride" = "CheckAccessOnOverride",
  "Abstract" = "Abstract",
  "SpecialName" = "SpecialName",
  "RTSpecialName" = "RTSpecialName",
  "PinvokeImpl" = "PinvokeImpl",
  "HasSecurity" = "HasSecurity",
  "RequireSecObject" = "RequireSecObject",
  "ReservedMask" = "ReservedMask",
}
export enum EnumConstructorInfoMethodImplementationFlags {
  "IL" = "IL",
  "Native" = "Native",
  "OPTIL" = "OPTIL",
  "CodeTypeMask" = "CodeTypeMask",
  "ManagedMask" = "ManagedMask",
  "NoInlining" = "NoInlining",
  "ForwardRef" = "ForwardRef",
  "Synchronized" = "Synchronized",
  "NoOptimization" = "NoOptimization",
  "PreserveSig" = "PreserveSig",
  "AggressiveInlining" = "AggressiveInlining",
  "AggressiveOptimization" = "AggressiveOptimization",
  "InternalCall" = "InternalCall",
  "MaxMethodImplVal" = "MaxMethodImplVal",
}
export enum EnumConstructorInfoCallingConvention {
  "Standard" = "Standard",
  "VarArgs" = "VarArgs",
  "Any" = "Any",
  "HasThis" = "HasThis",
  "ExplicitThis" = "ExplicitThis",
}
export type CombinedMethodHandleTypes = RuntimeMethodHandle;
export enum EnumConstructorInfoMemberType {
  "Constructor" = "Constructor",
  "Event" = "Event",
  "Field" = "Field",
  "Method" = "Method",
  "Property" = "Property",
  "TypeInfo" = "TypeInfo",
  "Custom" = "Custom",
  "NestedType" = "NestedType",
  "All" = "All",
}
export type CombinedAttributeTypeTypes = Type;
export type CombinedConstructorTypes = ConstructorInfo;
export type CombinedMemberInfoTypes = MemberInfo;
export type CombinedTypedValueTypes = CustomAttributeTypedArgument;
export type CombinedArgumentTypeTypes = Type;
export enum EnumEventInfoMemberType {
  "Constructor" = "Constructor",
  "Event" = "Event",
  "Field" = "Field",
  "Method" = "Method",
  "Property" = "Property",
  "TypeInfo" = "TypeInfo",
  "Custom" = "Custom",
  "NestedType" = "NestedType",
  "All" = "All",
}
export enum EnumEventInfoAttributes {
  "None" = "None",
  "SpecialName" = "SpecialName",
  "RTSpecialName" = "RTSpecialName",
}
export type CombinedAddMethodTypes = MethodInfo;
export type CombinedRemoveMethodTypes = MethodInfo;
export type CombinedRaiseMethodTypes = MethodInfo;
export type CombinedEventHandlerTypeTypes = Type;
export type CombinedTargetSiteTypes = MethodBase;
export type CombinedInnerExceptionTypes = Exception;
export enum EnumFieldInfoMemberType {
  "Constructor" = "Constructor",
  "Event" = "Event",
  "Field" = "Field",
  "Method" = "Method",
  "Property" = "Property",
  "TypeInfo" = "TypeInfo",
  "Custom" = "Custom",
  "NestedType" = "NestedType",
  "All" = "All",
}
export enum EnumFieldInfoAttributes {
  "PrivateScope" = "PrivateScope",
  "Private" = "Private",
  "FamANDAssem" = "FamANDAssem",
  "Assembly" = "Assembly",
  "Family" = "Family",
  "FamORAssem" = "FamORAssem",
  "Public" = "Public",
  "FieldAccessMask" = "FieldAccessMask",
  "Static" = "Static",
  "InitOnly" = "InitOnly",
  "Literal" = "Literal",
  "NotSerialized" = "NotSerialized",
  "HasFieldRVA" = "HasFieldRVA",
  "SpecialName" = "SpecialName",
  "RTSpecialName" = "RTSpecialName",
  "HasFieldMarshal" = "HasFieldMarshal",
  "PinvokeImpl" = "PinvokeImpl",
  "HasDefault" = "HasDefault",
  "ReservedMask" = "ReservedMask",
}
export type CombinedFieldTypeTypes = Type;
export type CombinedFieldHandleTypes = RuntimeFieldHandle;
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
export enum EnumMemberInfoMemberType {
  "Constructor" = "Constructor",
  "Event" = "Event",
  "Field" = "Field",
  "Method" = "Method",
  "Property" = "Property",
  "TypeInfo" = "TypeInfo",
  "Custom" = "Custom",
  "NestedType" = "NestedType",
  "All" = "All",
}
export enum EnumMethodBaseMemberType {
  "Constructor" = "Constructor",
  "Event" = "Event",
  "Field" = "Field",
  "Method" = "Method",
  "Property" = "Property",
  "TypeInfo" = "TypeInfo",
  "Custom" = "Custom",
  "NestedType" = "NestedType",
  "All" = "All",
}
export enum EnumMethodBaseAttributes {
  "PrivateScope" = "PrivateScope",
  "Private" = "Private",
  "FamANDAssem" = "FamANDAssem",
  "Assembly" = "Assembly",
  "Family" = "Family",
  "FamORAssem" = "FamORAssem",
  "Public" = "Public",
  "MemberAccessMask" = "MemberAccessMask",
  "UnmanagedExport" = "UnmanagedExport",
  "Static" = "Static",
  "Final" = "Final",
  "Virtual" = "Virtual",
  "HideBySig" = "HideBySig",
  "NewSlot" = "NewSlot",
  "CheckAccessOnOverride" = "CheckAccessOnOverride",
  "Abstract" = "Abstract",
  "SpecialName" = "SpecialName",
  "RTSpecialName" = "RTSpecialName",
  "PinvokeImpl" = "PinvokeImpl",
  "HasSecurity" = "HasSecurity",
  "RequireSecObject" = "RequireSecObject",
  "ReservedMask" = "ReservedMask",
}
export enum EnumMethodBaseMethodImplementationFlags {
  "IL" = "IL",
  "Native" = "Native",
  "OPTIL" = "OPTIL",
  "CodeTypeMask" = "CodeTypeMask",
  "ManagedMask" = "ManagedMask",
  "NoInlining" = "NoInlining",
  "ForwardRef" = "ForwardRef",
  "Synchronized" = "Synchronized",
  "NoOptimization" = "NoOptimization",
  "PreserveSig" = "PreserveSig",
  "AggressiveInlining" = "AggressiveInlining",
  "AggressiveOptimization" = "AggressiveOptimization",
  "InternalCall" = "InternalCall",
  "MaxMethodImplVal" = "MaxMethodImplVal",
}
export enum EnumMethodBaseCallingConvention {
  "Standard" = "Standard",
  "VarArgs" = "VarArgs",
  "Any" = "Any",
  "HasThis" = "HasThis",
  "ExplicitThis" = "ExplicitThis",
}
export enum EnumMethodInfoAttributes {
  "PrivateScope" = "PrivateScope",
  "Private" = "Private",
  "FamANDAssem" = "FamANDAssem",
  "Assembly" = "Assembly",
  "Family" = "Family",
  "FamORAssem" = "FamORAssem",
  "Public" = "Public",
  "MemberAccessMask" = "MemberAccessMask",
  "UnmanagedExport" = "UnmanagedExport",
  "Static" = "Static",
  "Final" = "Final",
  "Virtual" = "Virtual",
  "HideBySig" = "HideBySig",
  "NewSlot" = "NewSlot",
  "CheckAccessOnOverride" = "CheckAccessOnOverride",
  "Abstract" = "Abstract",
  "SpecialName" = "SpecialName",
  "RTSpecialName" = "RTSpecialName",
  "PinvokeImpl" = "PinvokeImpl",
  "HasSecurity" = "HasSecurity",
  "RequireSecObject" = "RequireSecObject",
  "ReservedMask" = "ReservedMask",
}
export enum EnumMethodInfoMethodImplementationFlags {
  "IL" = "IL",
  "Native" = "Native",
  "OPTIL" = "OPTIL",
  "CodeTypeMask" = "CodeTypeMask",
  "ManagedMask" = "ManagedMask",
  "NoInlining" = "NoInlining",
  "ForwardRef" = "ForwardRef",
  "Synchronized" = "Synchronized",
  "NoOptimization" = "NoOptimization",
  "PreserveSig" = "PreserveSig",
  "AggressiveInlining" = "AggressiveInlining",
  "AggressiveOptimization" = "AggressiveOptimization",
  "InternalCall" = "InternalCall",
  "MaxMethodImplVal" = "MaxMethodImplVal",
}
export enum EnumMethodInfoCallingConvention {
  "Standard" = "Standard",
  "VarArgs" = "VarArgs",
  "Any" = "Any",
  "HasThis" = "HasThis",
  "ExplicitThis" = "ExplicitThis",
}
export enum EnumMethodInfoMemberType {
  "Constructor" = "Constructor",
  "Event" = "Event",
  "Field" = "Field",
  "Method" = "Method",
  "Property" = "Property",
  "TypeInfo" = "TypeInfo",
  "Custom" = "Custom",
  "NestedType" = "NestedType",
  "All" = "All",
}
export type CombinedReturnParameterTypes = ParameterInfo;
export type CombinedReturnTypeTypes = Type;
export type CombinedReturnTypeCustomAttributesTypes = ICustomAttributeProvider;
export type CombinedAssemblyTypes = Assembly;
export type CombinedModuleHandleTypes = ModuleHandle;
export enum EnumParameterInfoAttributes {
  "None" = "None",
  "In" = "In",
  "Out" = "Out",
  "Lcid" = "Lcid",
  "Retval" = "Retval",
  "Optional" = "Optional",
  "HasDefault" = "HasDefault",
  "HasFieldMarshal" = "HasFieldMarshal",
  "Reserved3" = "Reserved3",
  "Reserved4" = "Reserved4",
  "ReservedMask" = "ReservedMask",
}
export type CombinedMemberTypes = MemberInfo;
export type CombinedParameterTypeTypes = Type;
export type CombinedCurrentTrackTypes = BaseTrackInfo;
export type CombinedNextTrackTypes = BaseTrackInfo;
export enum EnumPropertyInfoMemberType {
  "Constructor" = "Constructor",
  "Event" = "Event",
  "Field" = "Field",
  "Method" = "Method",
  "Property" = "Property",
  "TypeInfo" = "TypeInfo",
  "Custom" = "Custom",
  "NestedType" = "NestedType",
  "All" = "All",
}
export type CombinedPropertyTypeTypes = Type;
export enum EnumPropertyInfoAttributes {
  "None" = "None",
  "SpecialName" = "SpecialName",
  "RTSpecialName" = "RTSpecialName",
  "HasDefault" = "HasDefault",
  "Reserved2" = "Reserved2",
  "Reserved3" = "Reserved3",
  "Reserved4" = "Reserved4",
  "ReservedMask" = "ReservedMask",
}
export type CombinedGetMethodTypes = MethodInfo;
export type CombinedSetMethodTypes = MethodInfo;
export type CombinedValueTypes = IntPtr;
export type CombinedPlayer1Types = ScoreboardPlayerDto;
export type CombinedPlayer2Types = ScoreboardPlayerDto;
export type CombinedMetaTypes = ScoreboardMetaDto;
export type CombinedColorsTypes = ScoreboardColorsDto;
export type CombinedLayoutTypes = ScoreboardLayoutDto;
export enum EnumServiceInfoStatus {
  "Running" = "Running",
  "Stopped" = "Stopped",
  "Starting" = "Starting",
  "Stopping" = "Stopping",
  "Error" = "Error",
  "Unknown" = "Unknown",
}
export enum EnumStructLayoutAttributeValue {
  "Sequential" = "Sequential",
  "Explicit" = "Explicit",
  "Auto" = "Auto",
}
export type CombinedDataTypes = TunaMusicData;
export enum EnumTypeMemberType {
  "Constructor" = "Constructor",
  "Event" = "Event",
  "Field" = "Field",
  "Method" = "Method",
  "Property" = "Property",
  "TypeInfo" = "TypeInfo",
  "Custom" = "Custom",
  "NestedType" = "NestedType",
  "All" = "All",
}
export type CombinedDeclaringMethodTypes = MethodBase;
export type CombinedUnderlyingSystemTypeTypes = Type;
export enum EnumTypeGenericParameterAttributes {
  "None" = "None",
  "Covariant" = "Covariant",
  "Contravariant" = "Contravariant",
  "VarianceMask" = "VarianceMask",
  "ReferenceTypeConstraint" = "ReferenceTypeConstraint",
  "NotNullableValueTypeConstraint" = "NotNullableValueTypeConstraint",
  "DefaultConstructorConstraint" = "DefaultConstructorConstraint",
  "SpecialConstraintMask" = "SpecialConstraintMask",
  "AllowByRefLike" = "AllowByRefLike",
}
export enum EnumTypeAttributes {
  "NotPublic" = "NotPublic",
  "Public" = "Public",
  "NestedPublic" = "NestedPublic",
  "NestedPrivate" = "NestedPrivate",
  "NestedFamily" = "NestedFamily",
  "NestedAssembly" = "NestedAssembly",
  "NestedFamANDAssem" = "NestedFamANDAssem",
  "VisibilityMask" = "VisibilityMask",
  "SequentialLayout" = "SequentialLayout",
  "ExplicitLayout" = "ExplicitLayout",
  "LayoutMask" = "LayoutMask",
  "Interface" = "Interface",
  "Abstract" = "Abstract",
  "Sealed" = "Sealed",
  "SpecialName" = "SpecialName",
  "RTSpecialName" = "RTSpecialName",
  "Import" = "Import",
  "Serializable" = "Serializable",
  "WindowsRuntime" = "WindowsRuntime",
  "UnicodeClass" = "UnicodeClass",
  "AutoClass" = "AutoClass",
  "StringFormatMask" = "StringFormatMask",
  "HasSecurity" = "HasSecurity",
  "ReservedMask" = "ReservedMask",
  "BeforeFieldInit" = "BeforeFieldInit",
  "CustomFormatMask" = "CustomFormatMask",
}
export type CombinedStructLayoutAttributeTypes = StructLayoutAttribute;
export type CombinedTypeInitializerTypes = ConstructorInfo;
export type CombinedTypeHandleTypes = RuntimeTypeHandle;
export type CombinedBaseTypeTypes = Type;
export enum EnumTypeInfoMemberType {
  "Constructor" = "Constructor",
  "Event" = "Event",
  "Field" = "Field",
  "Method" = "Method",
  "Property" = "Property",
  "TypeInfo" = "TypeInfo",
  "Custom" = "Custom",
  "NestedType" = "NestedType",
  "All" = "All",
}
export enum EnumTypeInfoGenericParameterAttributes {
  "None" = "None",
  "Covariant" = "Covariant",
  "Contravariant" = "Contravariant",
  "VarianceMask" = "VarianceMask",
  "ReferenceTypeConstraint" = "ReferenceTypeConstraint",
  "NotNullableValueTypeConstraint" = "NotNullableValueTypeConstraint",
  "DefaultConstructorConstraint" = "DefaultConstructorConstraint",
  "SpecialConstraintMask" = "SpecialConstraintMask",
  "AllowByRefLike" = "AllowByRefLike",
}
export enum EnumTypeInfoAttributes {
  "NotPublic" = "NotPublic",
  "Public" = "Public",
  "NestedPublic" = "NestedPublic",
  "NestedPrivate" = "NestedPrivate",
  "NestedFamily" = "NestedFamily",
  "NestedAssembly" = "NestedAssembly",
  "NestedFamANDAssem" = "NestedFamANDAssem",
  "VisibilityMask" = "VisibilityMask",
  "SequentialLayout" = "SequentialLayout",
  "ExplicitLayout" = "ExplicitLayout",
  "LayoutMask" = "LayoutMask",
  "Interface" = "Interface",
  "Abstract" = "Abstract",
  "Sealed" = "Sealed",
  "SpecialName" = "SpecialName",
  "RTSpecialName" = "RTSpecialName",
  "Import" = "Import",
  "Serializable" = "Serializable",
  "WindowsRuntime" = "WindowsRuntime",
  "UnicodeClass" = "UnicodeClass",
  "AutoClass" = "AutoClass",
  "StringFormatMask" = "StringFormatMask",
  "HasSecurity" = "HasSecurity",
  "ReservedMask" = "ReservedMask",
  "BeforeFieldInit" = "BeforeFieldInit",
  "CustomFormatMask" = "CustomFormatMask",
}
export type CombinedRequestedTrackTypes = BaseTrackInfo;

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

export interface FramedataChange {
  /** @format date-time */
  appliedAt?: string;
  changeInfo?: FramedataChangeInfo;
  changeType: FramedataChangeChangeTypeEnum;
  /**
   * @minLength 1
   * @maxLength 100
   */
  characterName: string;
  currentInfo?: FramedataChangeInfo;
  /** @maxLength 500 */
  description?: string;
  /** @format date-time */
  detectedAt: string;
  /** @format int32 */
  id: number;
  status: FramedataChangeStatusEnum;
}

export enum FramedataChangeChangeTypeEnum {
  NewCharacter = "NewCharacter",
  NewMove = "NewMove",
  MoveUpdate = "MoveUpdate",
  MoveRemoval = "MoveRemoval",
  CharacterUpdate = "CharacterUpdate",
}

export interface FramedataChangeInfo {
  /** @format int32 */
  currentInfoId?: number;
  /** @maxLength 64 */
  dataHash?: string;
  framedataChange?: FramedataChange;
  /** @format int32 */
  framedataChangeId: number;
  /** @format int32 */
  id: number;
  infoType: FramedataChangeInfoInfoTypeEnum;
  /** @minLength 1 */
  jsonData: string;
  /** @format date-time */
  retrievedAt: string;
  /** @maxLength 500 */
  sourceUrl?: string;
}

export enum FramedataChangeInfoInfoTypeEnum {
  Character = "Character",
  Move = "Move",
  Movelist = "Movelist",
}

export enum FramedataChangeStatusEnum {
  Pending = "Pending",
  Applied = "Applied",
  Rejected = "Rejected",
  Obsolete = "Obsolete",
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
  notes?: string;
  powerCrush: boolean;
  requiresHeat: boolean;
  stanceCode: string;
  stanceName?: string;
  startUpFrame?: string;
  throw: boolean;
  tornado: boolean;
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
  description?: string;
  /** @format byte */
  image?: number[];
  /** @maxLength 20 */
  imageExtension?: string;
  /** @format byte */
  avatarImage?: number[];
  /** @maxLength 20 */
  avatarImageExtension?: string;
  /** @format byte */
  fullBodyImage?: number[];
  /** @maxLength 20 */
  fullBodyImageExtension?: string;
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

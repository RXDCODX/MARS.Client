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
  Wavu = "Wavu",
  Tekkendocs = "Tekkendocs",
}

export interface ParseResult {
  message: string;
  parsedCharacters: string[];
  success: boolean;
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

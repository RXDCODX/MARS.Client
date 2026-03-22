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

import type { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  HttpClient,
  RequestParams,
  ContentType,
  HttpResponse,
} from "./http-client";
import type {
  ApiMediaInfo,
  AutoMessageDto,
  BaseTrackInfo,
  ChannelRewardDefinition,
  ChannelRewardRecord,
  CinemaMediaItemDto,
  CinemaQueueStatistics,
  CommandInfo,
  CommandParameterInfo,
  CreateAutoMessageRequest,
  CreateCustomRewardsRequest,
  CreateMediaItemRequest,
  CreateMemeOrderDto,
  CreateMemeTypeDto,
  CustomReward,
  DefaultImage,
  DiscordChannelOptionDto,
  EnvironmentVariable,
  FollowerInfo,
  GetCustomRewardRedemptionResponse,
  GetCustomRewardsResponse,
  GlobalCooldownSetting,
  Image,
  Log,
  LogResponse,
  LogsStatistics,
  MaxPerStreamSetting,
  MaxPerUserPerStreamSetting,
  MediaFileInfo,
  MediaMetaInfo,
  MediaMetadata,
  MediaPositionInfo,
  MediaStylesInfo,
  MediaTextInfo,
  MemeOrderDto,
  MemeTypeDto,
  Move,
  MovePagedResult,
  MovePending,
  MovePendingDto,
  OperationResult,
  Pagination,
  ParseRequest,
  ParseResult,
  PlayerState,
  ProblemDetails,
  QueueItem,
  RateLimiterInfo,
  Reward,
  RewardRedemption,
  RootState,
  ServiceInfo,
  ServiceLog,
  SetEnvironmentVariableRequest,
  SpeakRequest,
  SpotifyAuthCompleteResult,
  SpotifyAuthStartRequest,
  SpotifyAuthStartResult,
  SpotifyAuthStatusResult,
  StreamArchiveConfig,
  StringServiceStatusDictionary,
  StringStringDictionary,
  SupplementRequest,
  TekkenCharacter,
  TekkenCharacterPagedResult,
  TekkenCharacterPendingDto,
  TelegramChannelOptionDto,
  TelegramDiscordBindingCreateRequest,
  TelegramDiscordBindingDto,
  TelegramDiscordBindingSetEnabledRequest,
  TelegramDiscordChannelStateDto,
  TwitchUser,
  UpdateAutoMessageRequest,
  UpdateCustomRewardDto,
  UpdateCustomRewardRedemptionStatusRequest,
  UpdateCustomRewardRequest,
  UpdateMediaItemRequest,
  UpdateMemeOrderDto,
  UpdateMemeTypeDto,
  UpdateValueRequest,
  UpdateVoiceRequest,
  ValidateFolderRequest,
  ValidateFolderResponse,
  CinemaMediaItemDtoStatusEnum,
  CommandInfoAvailablePlatformsEnum,
  CommandInfoVisibilityEnum,
  LogLogLevelEnum,
  MediaFileInfoTypeEnum,
  MediaMetaInfoPriorityEnum,
  ParseRequestSourceEnum,
  PlayerStateStateEnum,
  PlayerStateVideoStateEnum,
  RewardRedemptionStatusEnum,
  ServiceInfoStatusEnum,
  StreamArchiveConfigFileConvertTypeEnum,
  SupplementRequestSourceEnum,
  UpdateCustomRewardRedemptionStatusRequestStatusEnum,
  UpdateMediaItemRequestStatusEnum,
  CinemaQueueStatusDetailParamsEnum,
  CinemaQueueStatusDetailParamsStatusEnum,
  CommandsAdminPlatformDetailParamsEnum,
  CommandsAdminPlatformDetailParamsPlatformEnum,
  CommandsAdminPlatformInfoListParamsEnum,
  CommandsAdminPlatformInfoListParamsPlatformEnum,
  CommandsUserPlatformDetailParamsEnum,
  CommandsUserPlatformDetailParamsPlatformEnum,
  CommandsUserPlatformInfoListParamsEnum,
  CommandsUserPlatformInfoListParamsPlatformEnum,
  FramedataSupplementCreate2ParamsEnum,
  FramedataSupplementCreate2ParamsSourceEnum,
  LogsByLevelDetailParamsEnum,
  LogsByLevelDetailParamsLogLevelEnum,
  LogsListParamsLogLevelEnum,
} from "../types/data-contracts";

export class TtsVoice<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags TtsVoice
   * @name TtsBlockedList
   * @request GET:/api/tts/blocked
   * @response `200` `OperationResult<String[]>` OK
   */
  ttsBlockedList = (params: RequestParams = {}) =>
    this.request<OperationResult<String[]>, any>({
      path: `/api/tts/blocked`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags TtsVoice
   * @name TtsBlockedCreate
   * @request POST:/api/tts/blocked
   * @response `200` `OperationResult` OK
   */
  ttsBlockedCreate = (data: UpdateVoiceRequest, params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/tts/blocked`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags TtsVoice
   * @name TtsBlockedDelete
   * @request DELETE:/api/tts/blocked/{voiceName}
   * @response `200` `OperationResult` OK
   */
  ttsBlockedDelete = (voiceName: string, params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/tts/blocked/${voiceName}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags TtsVoice
   * @name TtsInstalledList
   * @request GET:/api/tts/installed
   * @response `200` `OperationResult<String[]>` OK
   */
  ttsInstalledList = (params: RequestParams = {}) =>
    this.request<OperationResult<String[]>, any>({
      path: `/api/tts/installed`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags TtsVoice
   * @name TtsLinkedList
   * @request GET:/api/tts/linked
   * @response `200` `OperationResult<StringStringDictionary>` OK
   */
  ttsLinkedList = (params: RequestParams = {}) =>
    this.request<OperationResult<StringStringDictionary>, any>({
      path: `/api/tts/linked`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags TtsVoice
   * @name TtsResetCreate
   * @request POST:/api/tts/reset/{userName}
   * @response `200` `OperationResult` OK
   */
  ttsResetCreate = (userName: string, params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/tts/reset/${userName}`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags TtsVoice
   * @name TtsResetAllCreate
   * @request POST:/api/tts/reset-all
   * @response `200` `OperationResult` OK
   */
  ttsResetAllCreate = (params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/tts/reset-all`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags TtsVoice
   * @name TtsSpeakCreate
   * @request POST:/api/tts/speak
   * @response `200` `OperationResult` OK
   */
  ttsSpeakCreate = (data: SpeakRequest, params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/tts/speak`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}

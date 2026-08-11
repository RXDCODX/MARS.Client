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
  AlertSettingsEntry,
  ApiMediaInfo,
  AutoMessageDto,
  BaseCommand,
  BaseTrackInfo,
  Boolean,
  ChannelRewardDefinition,
  ChannelRewardRecord,
  CinemaMediaItemDto,
  CinemaQueueStatistics,
  CommandParameterInfo,
  CreateAutoMessageRequest,
  CreateCustomRewardsRequest,
  CreateMediaItemRequest,
  CreateMemeOrderDto,
  CreateMemeTypeDto,
  CreateTwitchUserRequest,
  CreateWaifuRequest,
  CustomReward,
  DanbooruAutoPostBatchCreateRequest,
  DanbooruAutoPostConfigDto,
  DanbooruAutoPostCreateRequest,
  DanbooruAutoPostUpdateRequest,
  DefaultImage,
  DiscordChannelOptionDto,
  EnvironmentVariable,
  FollowerInfo,
  GetCustomRewardRedemptionResponse,
  GetCustomRewardsResponse,
  GlobalCooldownSetting,
  HusbandDto,
  Image,
  Log,
  LogResponse,
  LogsStatistics,
  MaxPerStreamSetting,
  MaxPerUserPerStreamSetting,
  MediaDto,
  MediaFileInfo,
  MediaInfo,
  MediaMetaInfo,
  MediaMetadata,
  MediaPositionInfo,
  MediaStylesInfo,
  MediaTextInfo,
  MediaTypeStringArrayDictionary,
  MemeOrderDto,
  MemeTypeDto,
  NSFWBooruAutoPostConfigDto,
  NSFWBooruAutoPostCreateRequest,
  NSFWBooruAutoPostUpdateRequest,
  NSFWSetEnabledRequest,
  OperationResult,
  Pagination,
  PlayerState,
  ProblemDetails,
  QueueItem,
  QueueReorderRequest,
  RateLimiterInfo,
  Reward,
  RewardRedemption,
  RootState,
  ServerStatsResponse,
  ServiceInfo,
  ServiceLog,
  SetEnabledRequest,
  SetEnvironmentVariableRequest,
  SpotifyAuthCompleteResult,
  SpotifyAuthStartRequest,
  SpotifyAuthStartResult,
  SpotifyAuthStatusResult,
  StreamArchiveConfig,
  StringServiceStatusDictionary,
  TelegramChannelOptionDto,
  TelegramDiscordBindingCreateRequest,
  TelegramDiscordBindingDto,
  TelegramDiscordBindingSetEnabledRequest,
  TelegramDiscordChannelStateDto,
  TwitchUser,
  TwitchUserDto,
  UpdateAutoMessageRequest,
  UpdateCustomRewardDto,
  UpdateCustomRewardRedemptionStatusRequest,
  UpdateCustomRewardRequest,
  UpdateHusbandRequest,
  UpdateMediaItemRequest,
  UpdateMemeOrderDto,
  UpdateMemeTypeDto,
  UpdateTwitchUserRequest,
  UpdateValueRequest,
  UpdateWaifuRequest,
  ValidateFolderRequest,
  ValidateFolderResponse,
  VerificationCodeRequest,
  WaifuDto,
  WaifuRollAudioDto,
  BaseCommandAvailablePlatformsEnum,
  BaseCommandVisibilityEnum,
  CinemaMediaItemDtoStatusEnum,
  DanbooruAutoPostBatchCreateRequestTargetPlatformEnum,
  DanbooruAutoPostConfigDtoTargetPlatformEnum,
  DanbooruAutoPostCreateRequestTargetPlatformEnum,
  DanbooruAutoPostUpdateRequestTargetPlatformEnum,
  LogLogLevelEnum,
  MediaFileInfoTypeEnum,
  MediaMetaInfoPriorityEnum,
  PlayerStateStateEnum,
  PlayerStateVideoStateEnum,
  RewardRedemptionStatusEnum,
  ServiceInfoStatusEnum,
  StreamArchiveConfigFileConvertTypeEnum,
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
  LogsByLevelDetailParamsEnum,
  LogsByLevelDetailParamsLogLevelEnum,
  LogsListParamsLogLevelEnum,
  ObsToggleCreateParamsModeEnum,
  TestAlertsAlertByTypeCreateParamsPriorityEnum,
  TestAlertsAlertByTypeCreateParamsTypeEnum,
} from "../types/data-contracts";

export class NsfwBooruAutoPost<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags NSFWBooruAutoPost
   * @name NsfwBooruAutoPostConfigsList
   * @request GET:/api/NSFWBooruAutoPost/configs
   * @response `200` `OperationResult<NSFWBooruAutoPostConfigDto[]>` OK
   */
  nsfwBooruAutoPostConfigsList = (params: RequestParams = {}) =>
    this.request<OperationResult<NSFWBooruAutoPostConfigDto[]>, any>({
      path: `/api/NSFWBooruAutoPost/configs`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags NSFWBooruAutoPost
   * @name NsfwBooruAutoPostConfigsCreate
   * @request POST:/api/NSFWBooruAutoPost/configs
   * @response `200` `OperationResult<NSFWBooruAutoPostConfigDto>` OK
   */
  nsfwBooruAutoPostConfigsCreate = (
    data: NSFWBooruAutoPostCreateRequest,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<NSFWBooruAutoPostConfigDto>, any>({
      path: `/api/NSFWBooruAutoPost/configs`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags NSFWBooruAutoPost
   * @name NsfwBooruAutoPostConfigsUpdate
   * @request PUT:/api/NSFWBooruAutoPost/configs/{id}
   * @response `200` `OperationResult<NSFWBooruAutoPostConfigDto>` OK
   */
  nsfwBooruAutoPostConfigsUpdate = (
    id: string,
    data: NSFWBooruAutoPostUpdateRequest,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<NSFWBooruAutoPostConfigDto>, any>({
      path: `/api/NSFWBooruAutoPost/configs/${id}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags NSFWBooruAutoPost
   * @name NsfwBooruAutoPostConfigsDelete
   * @request DELETE:/api/NSFWBooruAutoPost/configs/{id}
   * @response `200` `OperationResult` OK
   */
  nsfwBooruAutoPostConfigsDelete = (id: string, params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/NSFWBooruAutoPost/configs/${id}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags NSFWBooruAutoPost
   * @name NsfwBooruAutoPostConfigsEnabledUpdate
   * @request PUT:/api/NSFWBooruAutoPost/configs/{id}/enabled
   * @response `200` `OperationResult<NSFWBooruAutoPostConfigDto>` OK
   */
  nsfwBooruAutoPostConfigsEnabledUpdate = (
    id: string,
    data: NSFWSetEnabledRequest,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<NSFWBooruAutoPostConfigDto>, any>({
      path: `/api/NSFWBooruAutoPost/configs/${id}/enabled`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags NSFWBooruAutoPost
   * @name NsfwBooruAutoPostConfigsTriggerCreate
   * @request POST:/api/NSFWBooruAutoPost/configs/{id}/trigger
   * @response `200` `OperationResult` OK
   */
  nsfwBooruAutoPostConfigsTriggerCreate = (
    id: string,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult, any>({
      path: `/api/NSFWBooruAutoPost/configs/${id}/trigger`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags NSFWBooruAutoPost
   * @name NsfwBooruAutoPostDiscordChannelsList
   * @request GET:/api/NSFWBooruAutoPost/discord-channels
   * @response `200` `OperationResult<DiscordChannelOptionDto[]>` OK
   */
  nsfwBooruAutoPostDiscordChannelsList = (params: RequestParams = {}) =>
    this.request<OperationResult<DiscordChannelOptionDto[]>, any>({
      path: `/api/NSFWBooruAutoPost/discord-channels`,
      method: "GET",
      format: "json",
      ...params,
    });
}

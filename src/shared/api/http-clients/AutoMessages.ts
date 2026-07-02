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
  UpdateMediaItemRequest,
  UpdateMemeOrderDto,
  UpdateMemeTypeDto,
  UpdateTwitchUserRequest,
  UpdateValueRequest,
  ValidateFolderRequest,
  ValidateFolderResponse,
  BaseCommandAvailablePlatformsEnum,
  BaseCommandVisibilityEnum,
  CinemaMediaItemDtoStatusEnum,
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

export class AutoMessages<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags AutoMessages
   * @name AutoMessagesList
   * @request GET:/api/AutoMessages
   * @response `200` `OperationResult<AutoMessageDto[]>` OK
   */
  autoMessagesList = (params: RequestParams = {}) =>
    this.request<OperationResult<AutoMessageDto[]>, any>({
      path: `/api/AutoMessages`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags AutoMessages
   * @name AutoMessagesCreate
   * @request POST:/api/AutoMessages
   * @response `200` `OperationResult<AutoMessageDto>` OK
   */
  autoMessagesCreate = (
    data: CreateAutoMessageRequest,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<AutoMessageDto>, any>({
      path: `/api/AutoMessages`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags AutoMessages
   * @name AutoMessagesDetail
   * @request GET:/api/AutoMessages/{id}
   * @response `200` `OperationResult<AutoMessageDto>` OK
   */
  autoMessagesDetail = (id: string, params: RequestParams = {}) =>
    this.request<OperationResult<AutoMessageDto>, any>({
      path: `/api/AutoMessages/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags AutoMessages
   * @name AutoMessagesUpdate
   * @request PUT:/api/AutoMessages/{id}
   * @response `200` `OperationResult<AutoMessageDto>` OK
   */
  autoMessagesUpdate = (
    id: string,
    data: UpdateAutoMessageRequest,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<AutoMessageDto>, any>({
      path: `/api/AutoMessages/${id}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags AutoMessages
   * @name AutoMessagesDelete
   * @request DELETE:/api/AutoMessages/{id}
   * @response `200` `OperationResult` OK
   */
  autoMessagesDelete = (id: string, params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/AutoMessages/${id}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
}

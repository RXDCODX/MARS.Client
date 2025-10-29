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
  CreateUserRequest,
  CustomReward,
  DailyAutoMarkupUser,
  DefaultImage,
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
  ServiceInfo,
  ServiceLog,
  StreamArchiveConfig,
  StringServiceStatusDictionary,
  SupplementRequest,
  TekkenCharacter,
  TekkenCharacterPendingDto,
  TwitchUser,
  UpdateAutoMessageRequest,
  UpdateCustomRewardDto,
  UpdateCustomRewardRedemptionStatusRequest,
  UpdateCustomRewardRequest,
  UpdateMediaItemRequest,
  UpdateMemeOrderDto,
  UpdateMemeTypeDto,
  UpdateUserRequest,
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

export class ChannelRewardsManager<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags ChannelRewardsManager
   * @name ChannelRewardsManagerList
   * @request GET:/api/ChannelRewardsManager
   * @response `200` `OperationResult<ChannelRewardRecord[]>` OK
   */
  channelRewardsManagerList = (params: RequestParams = {}) =>
    this.request<OperationResult<ChannelRewardRecord[]>, any>({
      path: `/api/ChannelRewardsManager`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ChannelRewardsManager
   * @name ChannelRewardsManagerLocalList
   * @request GET:/api/ChannelRewardsManager/local
   * @response `200` `OperationResult<ChannelRewardRecord[]>` OK
   */
  channelRewardsManagerLocalList = (params: RequestParams = {}) =>
    this.request<OperationResult<ChannelRewardRecord[]>, any>({
      path: `/api/ChannelRewardsManager/local`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ChannelRewardsManager
   * @name ChannelRewardsManagerLocalCreate
   * @request POST:/api/ChannelRewardsManager/local
   * @response `200` `OperationResult<ChannelRewardRecord>` OK
   */
  channelRewardsManagerLocalCreate = (
    data: ChannelRewardDefinition,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<ChannelRewardRecord>, any>({
      path: `/api/ChannelRewardsManager/local`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ChannelRewardsManager
   * @name ChannelRewardsManagerLocalDetail
   * @request GET:/api/ChannelRewardsManager/local/{localId}
   * @response `200` `OperationResult<ChannelRewardRecord>` OK
   */
  channelRewardsManagerLocalDetail = (
    localId: string,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<ChannelRewardRecord>, any>({
      path: `/api/ChannelRewardsManager/local/${localId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ChannelRewardsManager
   * @name ChannelRewardsManagerLocalUpdate
   * @request PUT:/api/ChannelRewardsManager/local/{localId}
   * @response `200` `OperationResult` OK
   */
  channelRewardsManagerLocalUpdate = (
    localId: string,
    data: UpdateCustomRewardDto,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult, any>({
      path: `/api/ChannelRewardsManager/local/${localId}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ChannelRewardsManager
   * @name ChannelRewardsManagerLocalDelete
   * @request DELETE:/api/ChannelRewardsManager/local/{localId}
   * @response `200` `OperationResult` OK
   */
  channelRewardsManagerLocalDelete = (
    localId: string,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult, any>({
      path: `/api/ChannelRewardsManager/local/${localId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ChannelRewardsManager
   * @name ChannelRewardsManagerDetail
   * @request GET:/api/ChannelRewardsManager/{rewardId}
   * @response `200` `OperationResult<ChannelRewardRecord>` OK
   */
  channelRewardsManagerDetail = (
    rewardId: string,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<ChannelRewardRecord>, any>({
      path: `/api/ChannelRewardsManager/${rewardId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ChannelRewardsManager
   * @name ChannelRewardsManagerSyncCreate
   * @request POST:/api/ChannelRewardsManager/sync
   * @response `200` `OperationResult` OK
   */
  channelRewardsManagerSyncCreate = (params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/ChannelRewardsManager/sync`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ChannelRewardsManager
   * @name ChannelRewardsManagerSyncServicesCreate
   * @request POST:/api/ChannelRewardsManager/sync-services
   * @response `200` `OperationResult<Int32>` OK
   */
  channelRewardsManagerSyncServicesCreate = (params: RequestParams = {}) =>
    this.request<OperationResult<Int32>, any>({
      path: `/api/ChannelRewardsManager/sync-services`,
      method: "POST",
      format: "json",
      ...params,
    });
}

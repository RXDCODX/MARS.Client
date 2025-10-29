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

export class StreamArchive<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags StreamArchive
   * @name StreamArchiveList
   * @request GET:/api/StreamArchive
   * @response `200` `OperationResult<StreamArchiveConfig[]>` OK
   */
  streamArchiveList = (params: RequestParams = {}) =>
    this.request<OperationResult<StreamArchiveConfig[]>, any>({
      path: `/api/StreamArchive`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags StreamArchive
   * @name StreamArchiveCreate
   * @request POST:/api/StreamArchive
   * @response `200` `OperationResult<StreamArchiveConfig>` OK
   */
  streamArchiveCreate = (
    data: StreamArchiveConfig,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<StreamArchiveConfig>, any>({
      path: `/api/StreamArchive`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags StreamArchive
   * @name StreamArchiveDetail
   * @request GET:/api/StreamArchive/{id}
   * @response `200` `OperationResult<StreamArchiveConfig>` OK
   */
  streamArchiveDetail = (id: string, params: RequestParams = {}) =>
    this.request<OperationResult<StreamArchiveConfig>, any>({
      path: `/api/StreamArchive/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags StreamArchive
   * @name StreamArchiveUpdate
   * @request PUT:/api/StreamArchive/{id}
   * @response `200` `OperationResult` OK
   */
  streamArchiveUpdate = (
    id: string,
    data: StreamArchiveConfig,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult, any>({
      path: `/api/StreamArchive/${id}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags StreamArchive
   * @name StreamArchiveDelete
   * @request DELETE:/api/StreamArchive/{id}
   * @response `200` `OperationResult` OK
   */
  streamArchiveDelete = (id: string, params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/StreamArchive/${id}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags StreamArchive
   * @name StreamArchiveValidateFolderCreate
   * @request POST:/api/StreamArchive/validate-folder
   * @response `200` `OperationResult<ValidateFolderResponse>` OK
   */
  streamArchiveValidateFolderCreate = (
    data: ValidateFolderRequest,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<ValidateFolderResponse>, any>({
      path: `/api/StreamArchive/validate-folder`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags StreamArchive
   * @name StreamArchiveFilesList
   * @request GET:/api/StreamArchive/{configId}/files
   * @response `200` `OperationResult<Object>` OK
   */
  streamArchiveFilesList = (configId: string, params: RequestParams = {}) =>
    this.request<OperationResult<Object>, any>({
      path: `/api/StreamArchive/${configId}/files`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags StreamArchive
   * @name StreamArchiveStatisticsList
   * @request GET:/api/StreamArchive/statistics
   * @response `200` `OperationResult<Object>` OK
   */
  streamArchiveStatisticsList = (params: RequestParams = {}) =>
    this.request<OperationResult<Object>, any>({
      path: `/api/StreamArchive/statistics`,
      method: "GET",
      format: "json",
      ...params,
    });
}

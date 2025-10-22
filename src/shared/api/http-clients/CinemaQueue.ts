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

export class CinemaQueue<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags CinemaQueue
   * @name CinemaQueueList
   * @request GET:/api/CinemaQueue
   * @response `200` `OperationResult<CinemaMediaItemDto[]>` OK
   */
  cinemaQueueList = (params: RequestParams = {}) =>
    this.request<OperationResult<CinemaMediaItemDto[]>, any>({
      path: `/api/CinemaQueue`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags CinemaQueue
   * @name CinemaQueueCreate
   * @request POST:/api/CinemaQueue
   * @response `200` `OperationResult<CinemaMediaItemDto>` OK
   */
  cinemaQueueCreate = (
    data: CreateMediaItemRequest,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<CinemaMediaItemDto>, any>({
      path: `/api/CinemaQueue`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags CinemaQueue
   * @name CinemaQueueDetail
   * @request GET:/api/CinemaQueue/{id}
   * @response `200` `OperationResult<CinemaMediaItemDto>` OK
   */
  cinemaQueueDetail = (id: string, params: RequestParams = {}) =>
    this.request<OperationResult<CinemaMediaItemDto>, any>({
      path: `/api/CinemaQueue/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags CinemaQueue
   * @name CinemaQueueUpdate
   * @request PUT:/api/CinemaQueue/{id}
   * @response `200` `OperationResult<CinemaMediaItemDto>` OK
   */
  cinemaQueueUpdate = (
    id: string,
    data: UpdateMediaItemRequest,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<CinemaMediaItemDto>, any>({
      path: `/api/CinemaQueue/${id}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags CinemaQueue
   * @name CinemaQueueDelete
   * @request DELETE:/api/CinemaQueue/{id}
   * @response `200` `OperationResult` OK
   */
  cinemaQueueDelete = (id: string, params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/CinemaQueue/${id}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags CinemaQueue
   * @name CinemaQueueNextList
   * @request GET:/api/CinemaQueue/next
   * @response `200` `OperationResult<CinemaMediaItemDto>` OK
   */
  cinemaQueueNextList = (params: RequestParams = {}) =>
    this.request<OperationResult<CinemaMediaItemDto>, any>({
      path: `/api/CinemaQueue/next`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags CinemaQueue
   * @name CinemaQueueStatusDetail
   * @request GET:/api/CinemaQueue/status/{status}
   * @response `200` `OperationResult<CinemaMediaItemDto[]>` OK
   */
  cinemaQueueStatusDetail = (
    status: CinemaQueueStatusDetailParamsEnum,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<CinemaMediaItemDto[]>, any>({
      path: `/api/CinemaQueue/status/${status}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags CinemaQueue
   * @name CinemaQueueMarkAsNextCreate
   * @request POST:/api/CinemaQueue/{id}/mark-as-next
   * @response `200` `OperationResult` OK
   */
  cinemaQueueMarkAsNextCreate = (id: string, params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/CinemaQueue/${id}/mark-as-next`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags CinemaQueue
   * @name CinemaQueueStatusPartialUpdate
   * @request PATCH:/api/CinemaQueue/{id}/status
   * @response `200` `OperationResult` OK
   */
  cinemaQueueStatusPartialUpdate = (
    id: string,
    data: "Pending" | "InProgress" | "Completed" | "Cancelled" | "Postponed",
    params: RequestParams = {}
  ) =>
    this.request<OperationResult, any>({
      path: `/api/CinemaQueue/${id}/status`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags CinemaQueue
   * @name CinemaQueuePriorityPartialUpdate
   * @request PATCH:/api/CinemaQueue/{id}/priority
   * @response `200` `OperationResult` OK
   */
  cinemaQueuePriorityPartialUpdate = (
    id: string,
    data: number,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult, any>({
      path: `/api/CinemaQueue/${id}/priority`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags CinemaQueue
   * @name CinemaQueueStatisticsList
   * @request GET:/api/CinemaQueue/statistics
   * @response `200` `OperationResult<CinemaQueueStatistics>` OK
   */
  cinemaQueueStatisticsList = (params: RequestParams = {}) =>
    this.request<OperationResult<CinemaQueueStatistics>, any>({
      path: `/api/CinemaQueue/statistics`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags CinemaQueue
   * @name CinemaQueueMetadataList
   * @request GET:/api/CinemaQueue/metadata
   * @response `200` `OperationResult<MediaMetadata>` OK
   */
  cinemaQueueMetadataList = (
    query?: {
      url: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<MediaMetadata>, any>({
      path: `/api/CinemaQueue/metadata`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
}

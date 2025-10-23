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

export class Honkai<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Honkai
   * @name HonkaiUsersList
   * @request GET:/api/Honkai/users
   * @response `200` `OperationResult<DailyAutoMarkupUser[]>` OK
   */
  honkaiUsersList = (params: RequestParams = {}) =>
    this.request<OperationResult<DailyAutoMarkupUser[]>, any>({
      path: `/api/Honkai/users`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Honkai
   * @name HonkaiUsersCreate
   * @request POST:/api/Honkai/users
   * @response `200` `OperationResult<DailyAutoMarkupUser>` OK
   */
  honkaiUsersCreate = (data: CreateUserRequest, params: RequestParams = {}) =>
    this.request<OperationResult<DailyAutoMarkupUser>, any>({
      path: `/api/Honkai/users`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Honkai
   * @name HonkaiUsersDetail
   * @request GET:/api/Honkai/users/{id}
   * @response `200` `OperationResult<DailyAutoMarkupUser>` OK
   */
  honkaiUsersDetail = (id: string, params: RequestParams = {}) =>
    this.request<OperationResult<DailyAutoMarkupUser>, any>({
      path: `/api/Honkai/users/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Honkai
   * @name HonkaiUsersUpdate
   * @request PUT:/api/Honkai/users/{id}
   * @response `200` `OperationResult<DailyAutoMarkupUser>` OK
   */
  honkaiUsersUpdate = (
    id: string,
    data: UpdateUserRequest,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<DailyAutoMarkupUser>, any>({
      path: `/api/Honkai/users/${id}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Honkai
   * @name HonkaiUsersDelete
   * @request DELETE:/api/Honkai/users/{id}
   * @response `200` `OperationResult` OK
   */
  honkaiUsersDelete = (id: string, params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/Honkai/users/${id}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Honkai
   * @name HonkaiUsersRedeemNowCreate
   * @request POST:/api/Honkai/users/{id}/redeem-now
   * @response `200` `OperationResult` OK
   */
  honkaiUsersRedeemNowCreate = (id: string, params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/Honkai/users/${id}/redeem-now`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Honkai
   * @name HonkaiStatsList
   * @request GET:/api/Honkai/stats
   * @response `200` `OperationResult<Object>` OK
   */
  honkaiStatsList = (params: RequestParams = {}) =>
    this.request<OperationResult<Object>, any>({
      path: `/api/Honkai/stats`,
      method: "GET",
      format: "json",
      ...params,
    });
}

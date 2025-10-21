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
  CinemaMediaItem,
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
  FumoUser,
  GetCustomRewardRedemptionResponse,
  GetCustomRewardsResponse,
  GlobalCooldownSetting,
  HelloVideosUsers,
  Image,
  Log,
  LogResponse,
  LogsStatistics,
  MaxPerStreamSetting,
  MaxPerUserPerStreamSetting,
  MediaFileInfo,
  MediaInfo,
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
  TwitchLeaderboardUser,
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
  WaifuRollGuarantee,
  CinemaMediaItemDtoStatusEnum,
  CinemaMediaItemStatusEnum,
  CommandInfoAvailablePlatformsEnum,
  CommandInfoVisibilityEnum,
  LogLogLevelEnum,
  MediaFileInfoTypeEnum,
  MediaMetaInfoPriorityEnum,
  ParseRequestSourceEnum,
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

export class MediaInfoApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags MediaInfoApi
   * @name MediaInfoApiList
   * @request GET:/api/MediaInfoApi
   * @response `200` `OperationResult<ApiMediaInfo[]>` OK
   */
  mediaInfoApiList = (params: RequestParams = {}) =>
    this.request<OperationResult<ApiMediaInfo[]>, any>({
      path: `/api/MediaInfoApi`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MediaInfoApi
   * @name MediaInfoApiCreate
   * @request POST:/api/MediaInfoApi
   * @response `200` `OperationResult<ApiMediaInfo>` OK
   */
  mediaInfoApiCreate = (data: ApiMediaInfo, params: RequestParams = {}) =>
    this.request<OperationResult<ApiMediaInfo>, any>({
      path: `/api/MediaInfoApi`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MediaInfoApi
   * @name MediaInfoApiDetail
   * @request GET:/api/MediaInfoApi/{id}
   * @response `200` `OperationResult<ApiMediaInfo>` OK
   */
  mediaInfoApiDetail = (id: string, params: RequestParams = {}) =>
    this.request<OperationResult<ApiMediaInfo>, any>({
      path: `/api/MediaInfoApi/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MediaInfoApi
   * @name MediaInfoApiUpdate
   * @request PUT:/api/MediaInfoApi/{id}
   * @response `200` `OperationResult<ApiMediaInfo>` OK
   */
  mediaInfoApiUpdate = (
    id: string,
    data: ApiMediaInfo,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<ApiMediaInfo>, any>({
      path: `/api/MediaInfoApi/${id}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MediaInfoApi
   * @name MediaInfoApiDelete
   * @request DELETE:/api/MediaInfoApi/{id}
   * @response `200` `OperationResult` OK
   */
  mediaInfoApiDelete = (id: string, params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/MediaInfoApi/${id}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MediaInfoApi
   * @name MediaInfoApiFileList
   * @request GET:/api/MediaInfoApi/{id}/file
   * @response `200` `void` OK
   */
  mediaInfoApiFileList = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/MediaInfoApi/${id}/file`,
      method: "GET",
      ...params,
    });
}

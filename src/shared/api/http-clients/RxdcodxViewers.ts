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

export class RxdcodxViewers<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags RxdcodxViewers
   * @name RxdcodxViewersAllList
   * @request GET:/api/RxdcodxViewers/all
   * @response `200` `OperationResult<FollowerInfo[]>` OK
   */
  rxdcodxViewersAllList = (
    query?: {
      forceUseCash: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<FollowerInfo[]>, any>({
      path: `/api/RxdcodxViewers/all`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RxdcodxViewers
   * @name RxdcodxViewersWithoutAvatarsList
   * @request GET:/api/RxdcodxViewers/without-avatars
   * @response `200` `OperationResult<FollowerInfo[]>` OK
   */
  rxdcodxViewersWithoutAvatarsList = (params: RequestParams = {}) =>
    this.request<OperationResult<FollowerInfo[]>, any>({
      path: `/api/RxdcodxViewers/without-avatars`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RxdcodxViewers
   * @name RxdcodxViewersWithoutAvatarsCountList
   * @request GET:/api/RxdcodxViewers/without-avatars/count
   * @response `200` `OperationResult<Int32>` OK
   */
  rxdcodxViewersWithoutAvatarsCountList = (params: RequestParams = {}) =>
    this.request<OperationResult<Int32>, any>({
      path: `/api/RxdcodxViewers/without-avatars/count`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RxdcodxViewers
   * @name RxdcodxViewersUpdateAvatarsCreate
   * @request POST:/api/RxdcodxViewers/update-avatars
   * @response `200` `OperationResult<Int32>` OK
   */
  rxdcodxViewersUpdateAvatarsCreate = (params: RequestParams = {}) =>
    this.request<OperationResult<Int32>, any>({
      path: `/api/RxdcodxViewers/update-avatars`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RxdcodxViewers
   * @name RxdcodxViewersDebugAvatarsList
   * @request GET:/api/RxdcodxViewers/debug/avatars
   * @response `200` `OperationResult<Object>` OK
   */
  rxdcodxViewersDebugAvatarsList = (params: RequestParams = {}) =>
    this.request<OperationResult<Object>, any>({
      path: `/api/RxdcodxViewers/debug/avatars`,
      method: "GET",
      format: "json",
      ...params,
    });
}

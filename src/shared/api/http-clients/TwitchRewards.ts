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

export class TwitchRewards<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags TwitchRewards
   * @name TwitchRewardsList
   * @request GET:/api/twitch/rewards
   * @response `200` `OperationResult<GetCustomRewardsResponse>` OK
   */
  twitchRewardsList = (
    query?: {
      /** @default true */
      onlyManageable: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<GetCustomRewardsResponse>, any>({
      path: `/api/twitch/rewards`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags TwitchRewards
   * @name TwitchRewardsCreate
   * @request POST:/api/twitch/rewards
   * @response `200` `OperationResult<CustomReward>` OK
   */
  twitchRewardsCreate = (
    data: CreateCustomRewardsRequest,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<CustomReward>, any>({
      path: `/api/twitch/rewards`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags TwitchRewards
   * @name TwitchRewardsPartialUpdate
   * @request PATCH:/api/twitch/rewards/{rewardId}
   * @response `200` `OperationResult<CustomReward>` OK
   */
  twitchRewardsPartialUpdate = (
    rewardId: string,
    data: UpdateCustomRewardRequest,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<CustomReward>, any>({
      path: `/api/twitch/rewards/${rewardId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags TwitchRewards
   * @name TwitchRewardsDelete
   * @request DELETE:/api/twitch/rewards/{rewardId}
   * @response `200` `OperationResult` OK
   */
  twitchRewardsDelete = (rewardId: string, params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/twitch/rewards/${rewardId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags TwitchRewards
   * @name TwitchRewardsRedemptionsList
   * @request GET:/api/twitch/rewards/{rewardId}/redemptions
   * @response `200` `OperationResult<GetCustomRewardRedemptionResponse>` OK
   */
  twitchRewardsRedemptionsList = (
    rewardId: string,
    query?: {
      /** @default "UNFULFILLED" */
      status: string;
      sort: string;
      after: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<GetCustomRewardRedemptionResponse>, any>({
      path: `/api/twitch/rewards/${rewardId}/redemptions`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags TwitchRewards
   * @name TwitchRewardsRedemptionsStatusCreate
   * @request POST:/api/twitch/rewards/{rewardId}/redemptions/status
   * @response `200` `OperationResult` OK
   */
  twitchRewardsRedemptionsStatusCreate = (
    rewardId: string,
    data: UpdateCustomRewardRedemptionStatusRequest,
    query?: {
      ids: string[];
    },
    params: RequestParams = {}
  ) =>
    this.request<OperationResult, any>({
      path: `/api/twitch/rewards/${rewardId}/redemptions/status`,
      method: "POST",
      query: query,
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}

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
  UpdateAutoMessageRequest,
  UpdateCustomRewardDto,
  UpdateCustomRewardRedemptionStatusRequest,
  UpdateCustomRewardRequest,
  UpdateMediaItemRequest,
  UpdateMemeOrderDto,
  UpdateMemeTypeDto,
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

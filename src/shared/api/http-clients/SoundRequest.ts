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

export class SoundRequest<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags SoundRequest
   * @name SoundRequestStateList
   * @request GET:/api/SoundRequest/state
   * @response `200` `OperationResult<PlayerState>` OK
   */
  soundRequestStateList = (params: RequestParams = {}) =>
    this.request<OperationResult<PlayerState>, any>({
      path: `/api/SoundRequest/state`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SoundRequest
   * @name SoundRequestQueueList
   * @request GET:/api/SoundRequest/queue
   * @response `200` `OperationResult<BaseTrackInfo[]>` OK
   */
  soundRequestQueueList = (params: RequestParams = {}) =>
    this.request<OperationResult<BaseTrackInfo[]>, any>({
      path: `/api/SoundRequest/queue`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SoundRequest
   * @name SoundRequestHistoryList
   * @request GET:/api/SoundRequest/history
   * @response `200` `OperationResult<BaseTrackInfo[]>` OK
   */
  soundRequestHistoryList = (
    query?: {
      /**
       * @format int32
       * @default 20
       */
      count: number;
    },
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<BaseTrackInfo[]>, any>({
      path: `/api/SoundRequest/history`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SoundRequest
   * @name SoundRequestPlayCreate
   * @request POST:/api/SoundRequest/play
   * @response `200` `OperationResult` OK
   */
  soundRequestPlayCreate = (params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/SoundRequest/play`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SoundRequest
   * @name SoundRequestPauseCreate
   * @request POST:/api/SoundRequest/pause
   * @response `200` `OperationResult` OK
   */
  soundRequestPauseCreate = (params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/SoundRequest/pause`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SoundRequest
   * @name SoundRequestTogglePlayPauseCreate
   * @request POST:/api/SoundRequest/toggle-play-pause
   * @response `200` `OperationResult` OK
   */
  soundRequestTogglePlayPauseCreate = (params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/SoundRequest/toggle-play-pause`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SoundRequest
   * @name SoundRequestStopCreate
   * @request POST:/api/SoundRequest/stop
   * @response `200` `OperationResult` OK
   */
  soundRequestStopCreate = (params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/SoundRequest/stop`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SoundRequest
   * @name SoundRequestSkipCreate
   * @request POST:/api/SoundRequest/skip
   * @response `200` `OperationResult` OK
   */
  soundRequestSkipCreate = (params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/SoundRequest/skip`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SoundRequest
   * @name SoundRequestPlayNextCreate
   * @request POST:/api/SoundRequest/play-next
   * @response `200` `OperationResult` OK
   */
  soundRequestPlayNextCreate = (params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/SoundRequest/play-next`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SoundRequest
   * @name SoundRequestPlayTrackCreate
   * @request POST:/api/SoundRequest/play-track/{trackId}
   * @response `200` `OperationResult` OK
   */
  soundRequestPlayTrackCreate = (trackId: string, params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/SoundRequest/play-track/${trackId}`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SoundRequest
   * @name SoundRequestVolumeCreate
   * @request POST:/api/SoundRequest/volume/{volume}
   * @response `200` `OperationResult` OK
   */
  soundRequestVolumeCreate = (volume: number, params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/SoundRequest/volume/${volume}`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SoundRequest
   * @name SoundRequestMuteCreate
   * @request POST:/api/SoundRequest/mute/{muted}
   * @response `200` `OperationResult` OK
   */
  soundRequestMuteCreate = (muted: boolean, params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/SoundRequest/mute/${muted}`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SoundRequest
   * @name SoundRequestToggleMuteCreate
   * @request POST:/api/SoundRequest/toggle-mute
   * @response `200` `OperationResult` OK
   */
  soundRequestToggleMuteCreate = (params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/SoundRequest/toggle-mute`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SoundRequest
   * @name SoundRequestAddTrackCreate
   * @request POST:/api/SoundRequest/add-track
   * @response `200` `OperationResult<String>` OK
   */
  soundRequestAddTrackCreate = (
    query?: {
      request: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<String>, any>({
      path: `/api/SoundRequest/add-track`,
      method: "POST",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SoundRequest
   * @name SoundRequestAddPlaylistCreate
   * @request POST:/api/SoundRequest/add-playlist
   * @response `200` `OperationResult<String>` OK
   */
  soundRequestAddPlaylistCreate = (
    query?: {
      request: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<String>, any>({
      path: `/api/SoundRequest/add-playlist`,
      method: "POST",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SoundRequest
   * @name SoundRequestQueueDelete
   * @request DELETE:/api/SoundRequest/queue/{trackId}
   * @response `200` `OperationResult` OK
   */
  soundRequestQueueDelete = (trackId: string, params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/SoundRequest/queue/${trackId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SoundRequest
   * @name SoundRequestCurrentSongList
   * @request GET:/api/SoundRequest/current-song
   * @response `200` `OperationResult<String>` OK
   */
  soundRequestCurrentSongList = (params: RequestParams = {}) =>
    this.request<OperationResult<String>, any>({
      path: `/api/SoundRequest/current-song`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SoundRequest
   * @name SoundRequestUserPositionDetail
   * @request GET:/api/SoundRequest/user-position/{userId}
   * @response `200` `OperationResult<String>` OK
   */
  soundRequestUserPositionDetail = (
    userId: string,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<String>, any>({
      path: `/api/SoundRequest/user-position/${userId}`,
      method: "GET",
      format: "json",
      ...params,
    });
}

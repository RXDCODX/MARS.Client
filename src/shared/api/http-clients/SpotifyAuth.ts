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
  MediaFileInfo,
  MediaMetaInfo,
  MediaMetadata,
  MediaPositionInfo,
  MediaStylesInfo,
  MediaTextInfo,
  MemeOrderDto,
  MemeTypeDto,
  Move,
  MovePagedResult,
  MovePending,
  MovePendingDto,
  OperationResult,
  Pagination,
  ParseRequest,
  ParseResult,
  PlayerState,
  ProblemDetails,
  QueueItem,
  QueueReorderRequest,
  RateLimiterInfo,
  Reward,
  RewardRedemption,
  RootState,
  ServiceInfo,
  ServiceLog,
  SetEnvironmentVariableRequest,
  SpeakRequest,
  SpotifyAuthCompleteResult,
  SpotifyAuthStartRequest,
  SpotifyAuthStartResult,
  SpotifyAuthStatusResult,
  StreamArchiveConfig,
  StringServiceStatusDictionary,
  StringStringDictionary,
  SupplementRequest,
  TekkenCharacter,
  TekkenCharacterPagedResult,
  TekkenCharacterPendingDto,
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
  UpdateVoiceRequest,
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

export class SpotifyAuth<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags SpotifyAuth
   * @name SpotifyAuthStartCreate
   * @request POST:/api/SpotifyAuth/start
   * @response `200` `OperationResult<SpotifyAuthStartResult>` OK
   */
  spotifyAuthStartCreate = (
    data: SpotifyAuthStartRequest,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<SpotifyAuthStartResult>, any>({
      path: `/api/SpotifyAuth/start`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SpotifyAuth
   * @name SpotifyAuthCallbackList
   * @request GET:/api/SpotifyAuth/callback
   * @response `200` `OperationResult<SpotifyAuthCompleteResult>` OK
   */
  spotifyAuthCallbackList = (
    query?: {
      code: string;
      state: string;
      error: string;
      error_description: string;
      redirectUri: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<SpotifyAuthCompleteResult>, any>({
      path: `/api/SpotifyAuth/callback`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SpotifyAuth
   * @name SpotifyAuthStatusList
   * @request GET:/api/SpotifyAuth/status
   * @response `200` `OperationResult<SpotifyAuthStatusResult>` OK
   */
  spotifyAuthStatusList = (params: RequestParams = {}) =>
    this.request<OperationResult<SpotifyAuthStatusResult>, any>({
      path: `/api/SpotifyAuth/status`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SpotifyAuth
   * @name SpotifyAuthDisconnectCreate
   * @request POST:/api/SpotifyAuth/disconnect
   * @response `200` `OperationResult` OK
   */
  spotifyAuthDisconnectCreate = (params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/SpotifyAuth/disconnect`,
      method: "POST",
      format: "json",
      ...params,
    });
}

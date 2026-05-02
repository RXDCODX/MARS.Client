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

export class GooglePhotos<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags GooglePhotos
   * @name GooglePhotosAuthorizeCreate
   * @request POST:/api/GooglePhotos/authorize
   * @response `200` `OperationResult<String>` OK
   */
  googlePhotosAuthorizeCreate = (
    query?: {
      /** @format int64 */
      telegramAdminId: number;
    },
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<String>, any>({
      path: `/api/GooglePhotos/authorize`,
      method: "POST",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags GooglePhotos
   * @name GooglePhotosOauthCallbackList
   * @request GET:/api/GooglePhotos/oauth-callback
   * @response `200` `void` OK
   */
  googlePhotosOauthCallbackList = (
    query?: {
      code: string;
      error: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<void, any>({
      path: `/api/GooglePhotos/oauth-callback`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags GooglePhotos
   * @name GooglePhotosStatusList
   * @request GET:/api/GooglePhotos/status
   * @response `200` `OperationResult<Object>` OK
   */
  googlePhotosStatusList = (params: RequestParams = {}) =>
    this.request<OperationResult<Object>, any>({
      path: `/api/GooglePhotos/status`,
      method: "GET",
      format: "json",
      ...params,
    });
}

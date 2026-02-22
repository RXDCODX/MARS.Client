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
  RateLimiterInfo,
  Reward,
  RewardRedemption,
  RootState,
  ServiceInfo,
  ServiceLog,
  SetEnvironmentVariableRequest,
  SpeakRequest,
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

export class RootState<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags RootState
   * @name RootStateList
   * @request GET:/api/RootState
   * @response `200` `OperationResult<RootState[]>` OK
   */
  rootStateList = (params: RequestParams = {}) =>
    this.request<OperationResult<RootState[]>, any>({
      path: `/api/RootState`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RootState
   * @name RootStateCreate
   * @request POST:/api/RootState
   * @response `200` `OperationResult<RootState>` OK
   */
  rootStateCreate = (data: RootState, params: RequestParams = {}) =>
    this.request<OperationResult<RootState>, any>({
      path: `/api/RootState`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RootState
   * @name RootStateDetail
   * @request GET:/api/RootState/{name}
   * @response `200` `OperationResult<RootState>` OK
   */
  rootStateDetail = (name: string, params: RequestParams = {}) =>
    this.request<OperationResult<RootState>, any>({
      path: `/api/RootState/${name}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RootState
   * @name RootStateDelete
   * @request DELETE:/api/RootState/{name}
   * @response `200` `OperationResult` OK
   */
  rootStateDelete = (name: string, params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/RootState/${name}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RootState
   * @name RootStateValuePartialUpdate
   * @request PATCH:/api/RootState/{name}/value
   * @response `200` `OperationResult<RootState>` OK
   */
  rootStateValuePartialUpdate = (
    name: string,
    data: UpdateValueRequest,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<RootState>, any>({
      path: `/api/RootState/${name}/value`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}

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
  ServiceInfo,
  ServiceLog,
  StreamArchiveConfig,
  StringServiceStatusDictionary,
  SupplementRequest,
  TekkenCharacter,
  TekkenCharacterPagedResult,
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

export class FramedataChanges<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags FramedataChanges
   * @name FramedataChangesPendingCharactersList
   * @request GET:/api/FramedataChanges/pending/characters
   * @response `200` `OperationResult<TekkenCharacterPendingDto[]>` OK
   */
  framedataChangesPendingCharactersList = (params: RequestParams = {}) =>
    this.request<OperationResult<TekkenCharacterPendingDto[]>, any>({
      path: `/api/FramedataChanges/pending/characters`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags FramedataChanges
   * @name FramedataChangesPendingMovesList
   * @request GET:/api/FramedataChanges/pending/moves
   * @response `200` `OperationResult<MovePendingDto[]>` OK
   */
  framedataChangesPendingMovesList = (
    query?: {
      characterName: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<MovePendingDto[]>, any>({
      path: `/api/FramedataChanges/pending/moves`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags FramedataChanges
   * @name FramedataChangesApproveCharacterCreate
   * @request POST:/api/FramedataChanges/approve/character/{name}
   * @response `200` `OperationResult` OK
   */
  framedataChangesApproveCharacterCreate = (
    name: string,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult, any>({
      path: `/api/FramedataChanges/approve/character/${name}`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags FramedataChanges
   * @name FramedataChangesRejectCharacterCreate
   * @request POST:/api/FramedataChanges/reject/character/{name}
   * @response `200` `OperationResult` OK
   */
  framedataChangesRejectCharacterCreate = (
    name: string,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult, any>({
      path: `/api/FramedataChanges/reject/character/${name}`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags FramedataChanges
   * @name FramedataChangesApproveMoveCreate
   * @request POST:/api/FramedataChanges/approve/move/{characterName}/{command}
   * @response `200` `OperationResult` OK
   */
  framedataChangesApproveMoveCreate = (
    characterName: string,
    command: string,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult, any>({
      path: `/api/FramedataChanges/approve/move/${characterName}/${command}`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags FramedataChanges
   * @name FramedataChangesRejectMoveCreate
   * @request POST:/api/FramedataChanges/reject/move/{characterName}/{command}
   * @response `200` `OperationResult` OK
   */
  framedataChangesRejectMoveCreate = (
    characterName: string,
    command: string,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult, any>({
      path: `/api/FramedataChanges/reject/move/${characterName}/${command}`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags FramedataChanges
   * @name FramedataChangesApproveAllCreate
   * @request POST:/api/FramedataChanges/approve/all
   * @response `200` `OperationResult` OK
   */
  framedataChangesApproveAllCreate = (params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/FramedataChanges/approve/all`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags FramedataChanges
   * @name FramedataChangesRejectAllCreate
   * @request POST:/api/FramedataChanges/reject/all
   * @response `200` `OperationResult` OK
   */
  framedataChangesRejectAllCreate = (params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/FramedataChanges/reject/all`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags FramedataChanges
   * @name FramedataChangesScrapeCreate
   * @request POST:/api/FramedataChanges/scrape
   * @response `200` `OperationResult` OK
   */
  framedataChangesScrapeCreate = (params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/FramedataChanges/scrape`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags FramedataChanges
   * @name FramedataChangesStatsList
   * @request GET:/api/FramedataChanges/stats
   * @response `200` `OperationResult<Object>` OK
   */
  framedataChangesStatsList = (params: RequestParams = {}) =>
    this.request<OperationResult<Object>, any>({
      path: `/api/FramedataChanges/stats`,
      method: "GET",
      format: "json",
      ...params,
    });
}

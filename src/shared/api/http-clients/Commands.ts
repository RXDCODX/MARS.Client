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
  AddPlaylistRequest,
  AddTrackRequest,
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
  UpdateAutoMessageRequest,
  UpdateCustomRewardDto,
  UpdateCustomRewardRedemptionStatusRequest,
  UpdateCustomRewardRequest,
  UpdateMediaItemRequest,
  UpdateMemeOrderDto,
  UpdateMemeTypeDto,
  UpdateUserRequest,
  UserRequestedTrack,
  ValidateFolderRequest,
  ValidateFolderResponse,
  CinemaMediaItemDtoStatusEnum,
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

export class Commands<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Commands
   * @name CommandsUserList
   * @request GET:/api/Commands/user
   * @response `200` `OperationResult<String>` OK
   */
  commandsUserList = (params: RequestParams = {}) =>
    this.request<OperationResult<String>, any>({
      path: `/api/Commands/user`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Commands
   * @name CommandsAdminList
   * @request GET:/api/Commands/admin
   * @response `200` `OperationResult<String>` OK
   */
  commandsAdminList = (params: RequestParams = {}) =>
    this.request<OperationResult<String>, any>({
      path: `/api/Commands/admin`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Commands
   * @name CommandsUserPlatformDetail
   * @request GET:/api/Commands/user/platform/{platform}
   * @response `200` `OperationResult<String[]>` OK
   */
  commandsUserPlatformDetail = (
    platform: CommandsUserPlatformDetailParamsEnum,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<String[]>, any>({
      path: `/api/Commands/user/platform/${platform}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Commands
   * @name CommandsAdminPlatformDetail
   * @request GET:/api/Commands/admin/platform/{platform}
   * @response `200` `OperationResult<String[]>` OK
   */
  commandsAdminPlatformDetail = (
    platform: CommandsAdminPlatformDetailParamsEnum,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<String[]>, any>({
      path: `/api/Commands/admin/platform/${platform}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Commands
   * @name CommandsUserPlatformInfoList
   * @request GET:/api/Commands/user/platform/{platform}/info
   * @response `200` `OperationResult<CommandInfo[]>` OK
   */
  commandsUserPlatformInfoList = (
    platform: CommandsUserPlatformInfoListParamsEnum,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<CommandInfo[]>, any>({
      path: `/api/Commands/user/platform/${platform}/info`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Commands
   * @name CommandsAdminPlatformInfoList
   * @request GET:/api/Commands/admin/platform/{platform}/info
   * @response `200` `OperationResult<CommandInfo[]>` OK
   */
  commandsAdminPlatformInfoList = (
    platform: CommandsAdminPlatformInfoListParamsEnum,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<CommandInfo[]>, any>({
      path: `/api/Commands/admin/platform/${platform}/info`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Commands
   * @name CommandsParametersList
   * @request GET:/api/Commands/{commandName}/parameters
   * @response `200` `OperationResult<CommandParameterInfo[]>` OK
   */
  commandsParametersList = (commandName: string, params: RequestParams = {}) =>
    this.request<OperationResult<CommandParameterInfo[]>, any>({
      path: `/api/Commands/${commandName}/parameters`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Commands
   * @name CommandsExecuteCreate
   * @request POST:/api/Commands/{commandName}/execute
   * @response `200` `OperationResult<String>` OK
   */
  commandsExecuteCreate = (
    commandName: string,
    data: string,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<String>, any>({
      path: `/api/Commands/${commandName}/execute`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}

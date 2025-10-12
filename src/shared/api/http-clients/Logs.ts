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

export class Logs<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Logs
   * @name LogsList
   * @request GET:/api/Logs
   * @response `200` `OperationResult<LogResponse>` OK
   */
  logsList = (
    query?: {
      /**
       * @format int32
       * @default 1
       */
      page: number;
      /**
       * @format int32
       * @default 50
       */
      pageSize: number;
      /** @default "whenlogged" */
      sortBy: string;
      /** @default true */
      sortDescending: boolean;
      logLevel: LogsListParamsLogLevelEnum;
      /** @format date-time */
      fromDate: string;
      /** @format date-time */
      toDate: string;
      searchText: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<LogResponse>, any>({
      path: `/api/Logs`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Logs
   * @name LogsByLevelDetail
   * @request GET:/api/Logs/by-level/{logLevel}
   * @response `200` `OperationResult<Log[]>` OK
   */
  logsByLevelDetail = (
    logLevel: LogsByLevelDetailParamsEnum,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<Log[]>, any>({
      path: `/api/Logs/by-level/${logLevel}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Logs
   * @name LogsByDateRangeList
   * @request GET:/api/Logs/by-date-range
   * @response `200` `OperationResult<Log[]>` OK
   */
  logsByDateRangeList = (
    query?: {
      /** @format date-time */
      fromDate: string;
      /** @format date-time */
      toDate: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<Log[]>, any>({
      path: `/api/Logs/by-date-range`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Logs
   * @name LogsRecentList
   * @request GET:/api/Logs/recent
   * @response `200` `OperationResult<Log[]>` OK
   */
  logsRecentList = (
    query?: {
      /**
       * @format int32
       * @default 100
       */
      count: number;
    },
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<Log[]>, any>({
      path: `/api/Logs/recent`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Logs
   * @name LogsStatisticsList
   * @request GET:/api/Logs/statistics
   * @response `200` `OperationResult<LogsStatistics>` OK
   */
  logsStatisticsList = (params: RequestParams = {}) =>
    this.request<OperationResult<LogsStatistics>, any>({
      path: `/api/Logs/statistics`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Logs
   * @name LogsTestCreate
   * @request POST:/api/Logs/test
   * @response `200` `OperationResult<Object>` OK
   */
  logsTestCreate = (params: RequestParams = {}) =>
    this.request<OperationResult<Object>, any>({
      path: `/api/Logs/test`,
      method: "POST",
      format: "json",
      ...params,
    });
}

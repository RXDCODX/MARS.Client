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

export class ServiceManager<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags ServiceManager
   * @name ServiceManagerStatusList
   * @request GET:/api/ServiceManager/status
   * @response `200` `OperationResult<StringServiceStatusDictionary>` OK
   */
  serviceManagerStatusList = (params: RequestParams = {}) =>
    this.request<OperationResult<StringServiceStatusDictionary>, any>({
      path: `/api/ServiceManager/status`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ServiceManager
   * @name ServiceManagerServiceDetail
   * @request GET:/api/ServiceManager/service/{serviceName}
   * @response `200` `OperationResult<ServiceInfo>` OK
   */
  serviceManagerServiceDetail = (
    serviceName: string,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<ServiceInfo>, any>({
      path: `/api/ServiceManager/service/${serviceName}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ServiceManager
   * @name ServiceManagerServiceStartCreate
   * @request POST:/api/ServiceManager/service/{serviceName}/start
   * @response `200` `OperationResult` OK
   */
  serviceManagerServiceStartCreate = (
    serviceName: string,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult, any>({
      path: `/api/ServiceManager/service/${serviceName}/start`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ServiceManager
   * @name ServiceManagerServiceStopCreate
   * @request POST:/api/ServiceManager/service/{serviceName}/stop
   * @response `200` `OperationResult` OK
   */
  serviceManagerServiceStopCreate = (
    serviceName: string,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult, any>({
      path: `/api/ServiceManager/service/${serviceName}/stop`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ServiceManager
   * @name ServiceManagerServiceRestartCreate
   * @request POST:/api/ServiceManager/service/{serviceName}/restart
   * @response `200` `OperationResult` OK
   */
  serviceManagerServiceRestartCreate = (
    serviceName: string,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult, any>({
      path: `/api/ServiceManager/service/${serviceName}/restart`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ServiceManager
   * @name ServiceManagerServiceLogsList
   * @request GET:/api/ServiceManager/service/{serviceName}/logs
   * @response `200` `OperationResult<ServiceLog[]>` OK
   */
  serviceManagerServiceLogsList = (
    serviceName: string,
    query?: {
      /**
       * @format int32
       * @default 100
       */
      count: number;
    },
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<ServiceLog[]>, any>({
      path: `/api/ServiceManager/service/${serviceName}/logs`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ServiceManager
   * @name ServiceManagerServiceActiveCreate
   * @request POST:/api/ServiceManager/service/{serviceName}/active
   * @response `200` `OperationResult` OK
   */
  serviceManagerServiceActiveCreate = (
    serviceName: string,
    data: boolean,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult, any>({
      path: `/api/ServiceManager/service/${serviceName}/active`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ServiceManager
   * @name ServiceManagerServicesList
   * @request GET:/api/ServiceManager/services
   * @response `200` `OperationResult<ServiceInfo[]>` OK
   */
  serviceManagerServicesList = (params: RequestParams = {}) =>
    this.request<OperationResult<ServiceInfo[]>, any>({
      path: `/api/ServiceManager/services`,
      method: "GET",
      format: "json",
      ...params,
    });
}

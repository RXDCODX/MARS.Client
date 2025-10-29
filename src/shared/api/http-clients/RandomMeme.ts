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

export class RandomMeme<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags RandomMeme
   * @name RandomMemeTypesList
   * @request GET:/api/RandomMeme/types
   * @response `200` `OperationResult<MemeTypeDto[]>` OK
   */
  randomMemeTypesList = (params: RequestParams = {}) =>
    this.request<OperationResult<MemeTypeDto[]>, any>({
      path: `/api/RandomMeme/types`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RandomMeme
   * @name RandomMemeTypesCreate
   * @request POST:/api/RandomMeme/types
   * @response `200` `OperationResult<MemeTypeDto>` OK
   */
  randomMemeTypesCreate = (
    data: CreateMemeTypeDto,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<MemeTypeDto>, any>({
      path: `/api/RandomMeme/types`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RandomMeme
   * @name RandomMemeTypesDetail
   * @request GET:/api/RandomMeme/types/{id}
   * @response `200` `OperationResult<MemeTypeDto>` OK
   */
  randomMemeTypesDetail = (id: number, params: RequestParams = {}) =>
    this.request<OperationResult<MemeTypeDto>, any>({
      path: `/api/RandomMeme/types/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RandomMeme
   * @name RandomMemeTypesUpdate
   * @request PUT:/api/RandomMeme/types/{id}
   * @response `200` `OperationResult<MemeTypeDto>` OK
   */
  randomMemeTypesUpdate = (
    id: number,
    data: UpdateMemeTypeDto,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<MemeTypeDto>, any>({
      path: `/api/RandomMeme/types/${id}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RandomMeme
   * @name RandomMemeTypesDelete
   * @request DELETE:/api/RandomMeme/types/{id}
   * @response `200` `OperationResult` OK
   */
  randomMemeTypesDelete = (id: number, params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/RandomMeme/types/${id}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RandomMeme
   * @name RandomMemeOrdersList
   * @request GET:/api/RandomMeme/orders
   * @response `200` `OperationResult<MemeOrderDto[]>` OK
   */
  randomMemeOrdersList = (params: RequestParams = {}) =>
    this.request<OperationResult<MemeOrderDto[]>, any>({
      path: `/api/RandomMeme/orders`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RandomMeme
   * @name RandomMemeOrdersCreate
   * @request POST:/api/RandomMeme/orders
   * @response `200` `OperationResult<MemeOrderDto>` OK
   */
  randomMemeOrdersCreate = (
    data: CreateMemeOrderDto,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<MemeOrderDto>, any>({
      path: `/api/RandomMeme/orders`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RandomMeme
   * @name RandomMemeOrdersTypeDetail
   * @request GET:/api/RandomMeme/orders/type/{typeId}
   * @response `200` `OperationResult<MemeOrderDto[]>` OK
   */
  randomMemeOrdersTypeDetail = (typeId: number, params: RequestParams = {}) =>
    this.request<OperationResult<MemeOrderDto[]>, any>({
      path: `/api/RandomMeme/orders/type/${typeId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RandomMeme
   * @name RandomMemeOrdersDetail
   * @request GET:/api/RandomMeme/orders/{id}
   * @response `200` `OperationResult<MemeOrderDto>` OK
   */
  randomMemeOrdersDetail = (id: string, params: RequestParams = {}) =>
    this.request<OperationResult<MemeOrderDto>, any>({
      path: `/api/RandomMeme/orders/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RandomMeme
   * @name RandomMemeOrdersUpdate
   * @request PUT:/api/RandomMeme/orders/{id}
   * @response `200` `OperationResult<MemeOrderDto>` OK
   */
  randomMemeOrdersUpdate = (
    id: string,
    data: UpdateMemeOrderDto,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<MemeOrderDto>, any>({
      path: `/api/RandomMeme/orders/${id}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RandomMeme
   * @name RandomMemeOrdersDelete
   * @request DELETE:/api/RandomMeme/orders/{id}
   * @response `200` `OperationResult` OK
   */
  randomMemeOrdersDelete = (id: string, params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/RandomMeme/orders/${id}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RandomMeme
   * @name RandomMemeRandomList
   * @request GET:/api/RandomMeme/random
   * @response `200` `OperationResult<MemeOrderDto>` OK
   */
  randomMemeRandomList = (
    query?: {
      /** @format int32 */
      typeId: number;
    },
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<MemeOrderDto>, any>({
      path: `/api/RandomMeme/random`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RandomMeme
   * @name RandomMemeCountList
   * @request GET:/api/RandomMeme/count
   * @response `200` `OperationResult<Int32>` OK
   */
  randomMemeCountList = (
    query?: {
      /** @format int32 */
      typeId: number;
    },
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<Int32>, any>({
      path: `/api/RandomMeme/count`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RandomMeme
   * @name RandomMemeFileDetail
   * @request GET:/api/RandomMeme/file/{id}
   * @response `200` `void` OK
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Internal Server Error
   */
  randomMemeFileDetail = (id: string, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/RandomMeme/file/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags RandomMeme
   * @name RandomMemeFileRandomList
   * @request GET:/api/RandomMeme/file/random
   * @response `200` `void` OK
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Internal Server Error
   */
  randomMemeFileRandomList = (
    query?: {
      /** @format int32 */
      typeId: number;
    },
    params: RequestParams = {}
  ) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/RandomMeme/file/random`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags RandomMeme
   * @name RandomMemeOrdersReorderCreate
   * @request POST:/api/RandomMeme/orders/reorder/{typeId}
   * @response `200` `OperationResult` OK
   */
  randomMemeOrdersReorderCreate = (
    typeId: number,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult, any>({
      path: `/api/RandomMeme/orders/reorder/${typeId}`,
      method: "POST",
      format: "json",
      ...params,
    });
}

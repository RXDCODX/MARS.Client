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
  CinemaMediaItem,
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
  FumoUser,
  GetCustomRewardRedemptionResponse,
  GetCustomRewardsResponse,
  GlobalCooldownSetting,
  HelloVideosUsers,
  Image,
  Log,
  LogResponse,
  LogsStatistics,
  MaxPerStreamSetting,
  MaxPerUserPerStreamSetting,
  MediaFileInfo,
  MediaInfo,
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
  TwitchLeaderboardUser,
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
  WaifuRollGuarantee,
  CinemaMediaItemDtoStatusEnum,
  CinemaMediaItemStatusEnum,
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

export class Framedata<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Framedata
   * @name FramedataCharactersList
   * @request GET:/api/Framedata/characters
   * @response `200` `OperationResult<TekkenCharacter[]>` OK
   */
  framedataCharactersList = (params: RequestParams = {}) =>
    this.request<OperationResult<TekkenCharacter[]>, any>({
      path: `/api/Framedata/characters`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Framedata
   * @name FramedataCharactersCreate
   * @request POST:/api/Framedata/characters
   * @response `200` `OperationResult<TekkenCharacter>` OK
   */
  framedataCharactersCreate = (
    data: TekkenCharacter,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<TekkenCharacter>, any>({
      path: `/api/Framedata/characters`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Framedata
   * @name FramedataCharactersDetail
   * @request GET:/api/Framedata/characters/{name}
   * @response `200` `OperationResult<TekkenCharacter>` OK
   */
  framedataCharactersDetail = (name: string, params: RequestParams = {}) =>
    this.request<OperationResult<TekkenCharacter>, any>({
      path: `/api/Framedata/characters/${name}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Framedata
   * @name FramedataCharactersUpdate
   * @request PUT:/api/Framedata/characters/{name}
   * @response `200` `OperationResult<TekkenCharacter>` OK
   */
  framedataCharactersUpdate = (
    name: string,
    data: TekkenCharacter,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<TekkenCharacter>, any>({
      path: `/api/Framedata/characters/${name}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Framedata
   * @name FramedataCharactersDelete
   * @request DELETE:/api/Framedata/characters/{name}
   * @response `200` `OperationResult` OK
   */
  framedataCharactersDelete = (name: string, params: RequestParams = {}) =>
    this.request<OperationResult, any>({
      path: `/api/Framedata/characters/${name}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Framedata
   * @name FramedataCharactersMovesList
   * @request GET:/api/Framedata/characters/{characterName}/moves
   * @response `200` `OperationResult<Move[]>` OK
   */
  framedataCharactersMovesList = (
    characterName: string,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<Move[]>, any>({
      path: `/api/Framedata/characters/${characterName}/moves`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Framedata
   * @name FramedataCharactersMovesCreate
   * @request POST:/api/Framedata/characters/{characterName}/moves
   * @response `200` `OperationResult<Move>` OK
   */
  framedataCharactersMovesCreate = (
    characterName: string,
    data: Move,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<Move>, any>({
      path: `/api/Framedata/characters/${characterName}/moves`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Framedata
   * @name FramedataCharactersMovesDetail
   * @request GET:/api/Framedata/characters/{characterName}/moves/{command}
   * @response `200` `OperationResult<Move>` OK
   */
  framedataCharactersMovesDetail = (
    characterName: string,
    command: string,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<Move>, any>({
      path: `/api/Framedata/characters/${characterName}/moves/${command}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Framedata
   * @name FramedataCharactersMovesUpdate
   * @request PUT:/api/Framedata/characters/{characterName}/moves/{command}
   * @response `200` `OperationResult<Move>` OK
   */
  framedataCharactersMovesUpdate = (
    characterName: string,
    command: string,
    data: Move,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<Move>, any>({
      path: `/api/Framedata/characters/${characterName}/moves/${command}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Framedata
   * @name FramedataCharactersMovesDelete
   * @request DELETE:/api/Framedata/characters/{characterName}/moves/{command}
   * @response `200` `OperationResult` OK
   */
  framedataCharactersMovesDelete = (
    characterName: string,
    command: string,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult, any>({
      path: `/api/Framedata/characters/${characterName}/moves/${command}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Framedata
   * @name FramedataMovesSearchList
   * @request GET:/api/Framedata/moves/search
   * @response `200` `OperationResult<Move[]>` OK
   */
  framedataMovesSearchList = (
    query?: {
      characterName: string;
      stanceCode: string;
      heatEngage: boolean;
      powerCrush: boolean;
      isThrow: boolean;
      homing: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<Move[]>, any>({
      path: `/api/Framedata/moves/search`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Framedata
   * @name FramedataCharactersImageList
   * @request GET:/api/Framedata/characters/{name}/image
   * @response `200` `void` OK
   */
  framedataCharactersImageList = (name: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Framedata/characters/${name}/image`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Framedata
   * @name FramedataCharactersAvatarList
   * @request GET:/api/Framedata/characters/{name}/avatar
   * @response `200` `void` OK
   */
  framedataCharactersAvatarList = (name: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Framedata/characters/${name}/avatar`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Framedata
   * @name FramedataCharactersFullbodyList
   * @request GET:/api/Framedata/characters/{name}/fullbody
   * @response `200` `void` OK
   */
  framedataCharactersFullbodyList = (
    name: string,
    params: RequestParams = {}
  ) =>
    this.request<void, any>({
      path: `/api/Framedata/characters/${name}/fullbody`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Framedata
   * @name FramedataParseCreate
   * @request POST:/api/Framedata/parse
   * @response `200` `OperationResult<ParseResult>` OK
   */
  framedataParseCreate = (data: ParseRequest, params: RequestParams = {}) =>
    this.request<OperationResult<ParseResult>, any>({
      path: `/api/Framedata/parse`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Framedata
   * @name FramedataParseCharactersOnlyCreate
   * @request POST:/api/Framedata/parse-characters-only
   * @response `200` `OperationResult<ParseResult>` OK
   */
  framedataParseCharactersOnlyCreate = (
    data: ParseRequest,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<ParseResult>, any>({
      path: `/api/Framedata/parse-characters-only`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Framedata
   * @name FramedataSupplementCreate
   * @request POST:/api/Framedata/supplement
   * @response `200` `OperationResult<ParseResult>` OK
   */
  framedataSupplementCreate = (
    data: SupplementRequest,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<ParseResult>, any>({
      path: `/api/Framedata/supplement`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Framedata
   * @name FramedataSupplementCreate2
   * @request POST:/api/Framedata/supplement/{source}
   * @originalName framedataSupplementCreate
   * @duplicate
   * @response `200` `OperationResult<ParseResult>` OK
   */
  framedataSupplementCreate2 = (
    source: FramedataSupplementCreate2ParamsEnum,
    params: RequestParams = {}
  ) =>
    this.request<OperationResult<ParseResult>, any>({
      path: `/api/Framedata/supplement/${source}`,
      method: "POST",
      format: "json",
      ...params,
    });
}

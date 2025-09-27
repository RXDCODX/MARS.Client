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

import type { ChannelRewardRecord, UpdateCustomRewardDto } from "../types/data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class ChannelRewardsManager<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags ChannelRewardsManager
   * @name ChannelRewardsManagerList
   * @request GET:/api/ChannelRewardsManager
   * @response `200` `(ChannelRewardRecord)[]` OK
   */
  channelRewardsManagerList = (params: RequestParams = {}) =>
    this.request<ChannelRewardRecord[], any>({
      path: `/api/ChannelRewardsManager`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ChannelRewardsManager
   * @name ChannelRewardsManagerLocalList
   * @request GET:/api/ChannelRewardsManager/local
   * @response `200` `(ChannelRewardRecord)[]` OK
   */
  channelRewardsManagerLocalList = (params: RequestParams = {}) =>
    this.request<ChannelRewardRecord[], any>({
      path: `/api/ChannelRewardsManager/local`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ChannelRewardsManager
   * @name ChannelRewardsManagerLocalCreate
   * @request POST:/api/ChannelRewardsManager/local
   * @response `200` `ChannelRewardRecord` OK
   */
  channelRewardsManagerLocalCreate = (
    data: ChannelRewardRecord,
    params: RequestParams = {},
  ) =>
    this.request<ChannelRewardRecord, any>({
      path: `/api/ChannelRewardsManager/local`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ChannelRewardsManager
   * @name ChannelRewardsManagerLocalDetail
   * @request GET:/api/ChannelRewardsManager/local/{localId}
   * @response `200` `ChannelRewardRecord` OK
   */
  channelRewardsManagerLocalDetail = (
    localId: string,
    params: RequestParams = {},
  ) =>
    this.request<ChannelRewardRecord, any>({
      path: `/api/ChannelRewardsManager/local/${localId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ChannelRewardsManager
   * @name ChannelRewardsManagerLocalUpdate
   * @request PUT:/api/ChannelRewardsManager/local/{localId}
   * @response `200` `boolean` OK
   */
  channelRewardsManagerLocalUpdate = (
    localId: string,
    data: UpdateCustomRewardDto,
    params: RequestParams = {},
  ) =>
    this.request<boolean, any>({
      path: `/api/ChannelRewardsManager/local/${localId}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ChannelRewardsManager
   * @name ChannelRewardsManagerLocalDelete
   * @request DELETE:/api/ChannelRewardsManager/local/{localId}
   * @response `200` `boolean` OK
   */
  channelRewardsManagerLocalDelete = (
    localId: string,
    params: RequestParams = {},
  ) =>
    this.request<boolean, any>({
      path: `/api/ChannelRewardsManager/local/${localId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ChannelRewardsManager
   * @name ChannelRewardsManagerDetail
   * @request GET:/api/ChannelRewardsManager/{rewardId}
   * @response `200` `ChannelRewardRecord` OK
   */
  channelRewardsManagerDetail = (
    rewardId: string,
    params: RequestParams = {},
  ) =>
    this.request<ChannelRewardRecord, any>({
      path: `/api/ChannelRewardsManager/${rewardId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ChannelRewardsManager
   * @name ChannelRewardsManagerSyncCreate
   * @request POST:/api/ChannelRewardsManager/sync
   * @response `200` `string` OK
   */
  channelRewardsManagerSyncCreate = (params: RequestParams = {}) =>
    this.request<string, any>({
      path: `/api/ChannelRewardsManager/sync`,
      method: "POST",
      format: "json",
      ...params,
    });
}

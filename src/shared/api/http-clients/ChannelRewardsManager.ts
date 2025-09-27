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
   * @response `200` `void` OK
   */
  channelRewardsManagerList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/ChannelRewardsManager`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags ChannelRewardsManager
   * @name ChannelRewardsManagerLocalList
   * @request GET:/api/ChannelRewardsManager/local
   * @response `200` `void` OK
   */
  channelRewardsManagerLocalList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/ChannelRewardsManager/local`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags ChannelRewardsManager
   * @name ChannelRewardsManagerLocalCreate
   * @request POST:/api/ChannelRewardsManager/local
   * @response `200` `void` OK
   */
  channelRewardsManagerLocalCreate = (
    data: ChannelRewardRecord,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/ChannelRewardsManager/local`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ChannelRewardsManager
   * @name ChannelRewardsManagerLocalDetail
   * @request GET:/api/ChannelRewardsManager/local/{localId}
   * @response `200` `void` OK
   */
  channelRewardsManagerLocalDetail = (
    localId: string,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/ChannelRewardsManager/local/${localId}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags ChannelRewardsManager
   * @name ChannelRewardsManagerLocalUpdate
   * @request PUT:/api/ChannelRewardsManager/local/{localId}
   * @response `200` `void` OK
   */
  channelRewardsManagerLocalUpdate = (
    localId: string,
    data: UpdateCustomRewardDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/ChannelRewardsManager/local/${localId}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ChannelRewardsManager
   * @name ChannelRewardsManagerLocalDelete
   * @request DELETE:/api/ChannelRewardsManager/local/{localId}
   * @response `200` `void` OK
   */
  channelRewardsManagerLocalDelete = (
    localId: string,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/ChannelRewardsManager/local/${localId}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags ChannelRewardsManager
   * @name ChannelRewardsManagerDetail
   * @request GET:/api/ChannelRewardsManager/{rewardId}
   * @response `200` `void` OK
   */
  channelRewardsManagerDetail = (
    rewardId: string,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/ChannelRewardsManager/${rewardId}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags ChannelRewardsManager
   * @name ChannelRewardsManagerSyncCreate
   * @request POST:/api/ChannelRewardsManager/sync
   * @response `200` `void` OK
   */
  channelRewardsManagerSyncCreate = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/ChannelRewardsManager/sync`,
      method: "POST",
      ...params,
    });
}

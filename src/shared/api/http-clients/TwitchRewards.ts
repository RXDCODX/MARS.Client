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

import {
  CreateCustomRewardsRequest,
  CustomReward,
  GetCustomRewardRedemptionResponse,
  UpdateCustomRewardRedemptionStatusRequest,
  UpdateCustomRewardRequest,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class TwitchRewards<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags TwitchRewards
   * @name TwitchRewardsList
   * @request GET:/api/twitch/rewards
   * @response `200` `void` OK
   */
  twitchRewardsList = (
    query?: {
      /** @default true */
      onlyManageable: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/twitch/rewards`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags TwitchRewards
   * @name TwitchRewardsCreate
   * @request POST:/api/twitch/rewards
   * @response `200` `CustomReward` OK
   */
  twitchRewardsCreate = (
    data: CreateCustomRewardsRequest,
    params: RequestParams = {},
  ) =>
    this.request<CustomReward, any>({
      path: `/api/twitch/rewards`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags TwitchRewards
   * @name TwitchRewardsPartialUpdate
   * @request PATCH:/api/twitch/rewards/{rewardId}
   * @response `200` `CustomReward` OK
   */
  twitchRewardsPartialUpdate = (
    rewardId: string,
    data: UpdateCustomRewardRequest,
    params: RequestParams = {},
  ) =>
    this.request<CustomReward, any>({
      path: `/api/twitch/rewards/${rewardId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags TwitchRewards
   * @name TwitchRewardsDelete
   * @request DELETE:/api/twitch/rewards/{rewardId}
   * @response `200` `void` OK
   */
  twitchRewardsDelete = (rewardId: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/twitch/rewards/${rewardId}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags TwitchRewards
   * @name TwitchRewardsRedemptionsList
   * @request GET:/api/twitch/rewards/{rewardId}/redemptions
   * @response `200` `GetCustomRewardRedemptionResponse` OK
   */
  twitchRewardsRedemptionsList = (
    rewardId: string,
    query?: {
      /** @default "UNFULFILLED" */
      status: string;
      sort: string;
      after: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetCustomRewardRedemptionResponse, any>({
      path: `/api/twitch/rewards/${rewardId}/redemptions`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags TwitchRewards
   * @name TwitchRewardsRedemptionsStatusCreate
   * @request POST:/api/twitch/rewards/{rewardId}/redemptions/status
   * @response `200` `void` OK
   */
  twitchRewardsRedemptionsStatusCreate = (
    rewardId: string,
    data: UpdateCustomRewardRedemptionStatusRequest,
    query?: {
      ids: string[];
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/twitch/rewards/${rewardId}/redemptions/status`,
      method: "POST",
      query: query,
      body: data,
      type: ContentType.Json,
      ...params,
    });
}

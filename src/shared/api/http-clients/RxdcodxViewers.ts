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

import { HttpClient, RequestParams } from "./http-client";

export class RxdcodxViewers<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags RxdcodxViewers
   * @name RxdcodxViewersAllList
   * @request GET:/api/RxdcodxViewers/all
   * @response `200` `void` OK
   */
  rxdcodxViewersAllList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/RxdcodxViewers/all`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags RxdcodxViewers
   * @name RxdcodxViewersFollowersList
   * @request GET:/api/RxdcodxViewers/followers
   * @response `200` `void` OK
   */
  rxdcodxViewersFollowersList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/RxdcodxViewers/followers`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags RxdcodxViewers
   * @name RxdcodxViewersVipsList
   * @request GET:/api/RxdcodxViewers/vips
   * @response `200` `void` OK
   */
  rxdcodxViewersVipsList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/RxdcodxViewers/vips`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags RxdcodxViewers
   * @name RxdcodxViewersModeratorsList
   * @request GET:/api/RxdcodxViewers/moderators
   * @response `200` `void` OK
   */
  rxdcodxViewersModeratorsList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/RxdcodxViewers/moderators`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags RxdcodxViewers
   * @name RxdcodxViewersStatsList
   * @request GET:/api/RxdcodxViewers/stats
   * @response `200` `void` OK
   */
  rxdcodxViewersStatsList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/RxdcodxViewers/stats`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags RxdcodxViewers
   * @name RxdcodxViewersUserStatusList
   * @request GET:/api/RxdcodxViewers/user/{userId}/status
   * @response `200` `void` OK
   */
  rxdcodxViewersUserStatusList = (userId: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/RxdcodxViewers/user/${userId}/status`,
      method: "GET",
      ...params,
    });
}

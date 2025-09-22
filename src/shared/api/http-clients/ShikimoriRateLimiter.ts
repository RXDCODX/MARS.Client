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

import type { RateLimiterInfo } from "../types/data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class ShikimoriRateLimiter<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags ShikimoriRateLimiter
   * @name ShikimoriRateLimiterInfoList
   * @request GET:/api/ShikimoriRateLimiter/info
   * @response `200` `RateLimiterInfo` OK
   */
  shikimoriRateLimiterInfoList = (params: RequestParams = {}) =>
    this.request<RateLimiterInfo, any>({
      path: `/api/ShikimoriRateLimiter/info`,
      method: "GET",
      format: "json",
      ...params,
    });
}

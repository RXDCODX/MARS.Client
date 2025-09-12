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

import type { FollowerInfo } from "../types/data-contracts";
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
   * @response `200` `(FollowerInfo)[]` OK
   */
  rxdcodxViewersAllList = (
    query?: {
      forceUseCash: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<FollowerInfo[], any>({
      path: `/api/RxdcodxViewers/all`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
}

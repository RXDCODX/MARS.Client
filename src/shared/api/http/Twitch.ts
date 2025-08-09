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

export class Twitch<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Twitch
   * @name TwitchtokenList
   * @request GET:/twitchtoken
   */
  twitchtokenList = (
    query?: {
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/twitchtoken`,
      method: "GET",
      query: query,
      ...params,
    });
}

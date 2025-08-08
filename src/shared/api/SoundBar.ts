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

import { MuteRequest } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class SoundBar<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags SoundBar
   * @name SoundBarMuteCreate
   * @request POST:/api/SoundBar/mute
   */
  soundBarMuteCreate = (data: MuteRequest, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/SoundBar/mute`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags SoundBar
   * @name SoundBarUnmuteCreate
   * @request POST:/api/SoundBar/unmute
   */
  soundBarUnmuteCreate = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/SoundBar/unmute`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags SoundBar
   * @name SoundBarBagcountList
   * @request GET:/api/SoundBar/bagcount
   */
  soundBarBagcountList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/SoundBar/bagcount`,
      method: "GET",
      ...params,
    });
}

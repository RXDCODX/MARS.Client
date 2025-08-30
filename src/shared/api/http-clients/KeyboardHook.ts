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

export class KeyboardHook<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags KeyboardHook
   * @name KeyboardHookStatusList
   * @request GET:/api/KeyboardHook/status
   * @response `200` `void` OK
   */
  keyboardHookStatusList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/KeyboardHook/status`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags KeyboardHook
   * @name KeyboardHookCombinationsList
   * @request GET:/api/KeyboardHook/combinations
   * @response `200` `void` OK
   */
  keyboardHookCombinationsList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/KeyboardHook/combinations`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags KeyboardHook
   * @name KeyboardHookInfoList
   * @request GET:/api/KeyboardHook/info
   * @response `200` `void` OK
   */
  keyboardHookInfoList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/KeyboardHook/info`,
      method: "GET",
      ...params,
    });
}

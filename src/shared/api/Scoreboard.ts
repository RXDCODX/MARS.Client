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

import { ScoreboardDto } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Scoreboard<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Scoreboard
   * @name ScoreboardTestList
   * @request GET:/api/Scoreboard/test
   */
  scoreboardTestList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Scoreboard/test`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Scoreboard
   * @name ScoreboardStateList
   * @request GET:/api/Scoreboard/state
   */
  scoreboardStateList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Scoreboard/state`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Scoreboard
   * @name ScoreboardStateCreate
   * @request POST:/api/Scoreboard/state
   */
  scoreboardStateCreate = (data: ScoreboardDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Scoreboard/state`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Scoreboard
   * @name ScoreboardVisibilityCreate
   * @request POST:/api/Scoreboard/visibility
   */
  scoreboardVisibilityCreate = (data: boolean, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Scoreboard/visibility`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}

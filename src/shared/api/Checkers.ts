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
  JoinQueueRequest,
  LeaveQueueRequest,
  MoveRequest,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Checkers<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Checkers
   * @name CheckersStartCreate
   * @request POST:/api/Checkers/start
   */
  checkersStartCreate = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Checkers/start`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags Checkers
   * @name CheckersMoveCreate
   * @request POST:/api/Checkers/move
   */
  checkersMoveCreate = (data: MoveRequest, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Checkers/move`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Checkers
   * @name CheckersStateList
   * @request GET:/api/Checkers/state
   */
  checkersStateList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Checkers/state`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Checkers
   * @name CheckersMovesDetail
   * @request GET:/api/Checkers/moves/{x}/{y}
   */
  checkersMovesDetail = (x: string, y: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Checkers/moves/${x}/${y}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Checkers
   * @name CheckersQueueJoinCreate
   * @request POST:/api/Checkers/queue/join
   */
  checkersQueueJoinCreate = (
    data: JoinQueueRequest,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/Checkers/queue/join`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Checkers
   * @name CheckersQueueLeaveCreate
   * @request POST:/api/Checkers/queue/leave
   */
  checkersQueueLeaveCreate = (
    data: LeaveQueueRequest,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/Checkers/queue/leave`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Checkers
   * @name CheckersQueueStatusList
   * @request GET:/api/Checkers/queue/status
   */
  checkersQueueStatusList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Checkers/queue/status`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Checkers
   * @name CheckersQueueNextGameList
   * @request GET:/api/Checkers/queue/next-game
   */
  checkersQueueNextGameList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Checkers/queue/next-game`,
      method: "GET",
      ...params,
    });
}

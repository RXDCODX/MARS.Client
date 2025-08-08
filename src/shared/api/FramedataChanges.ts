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

import { FramedataChange } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class FramedataChanges<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags FramedataChanges
   * @name FramedataChangesPendingList
   * @request GET:/api/FramedataChanges/pending
   */
  framedataChangesPendingList = (params: RequestParams = {}) =>
    this.request<FramedataChange[], any>({
      path: `/api/FramedataChanges/pending`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags FramedataChanges
   * @name FramedataChangesApplyCreate
   * @request POST:/api/FramedataChanges/apply/{changeId}
   */
  framedataChangesApplyCreate = (
    changeId: number,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/FramedataChanges/apply/${changeId}`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags FramedataChanges
   * @name FramedataChangesRejectCreate
   * @request POST:/api/FramedataChanges/reject/{changeId}
   */
  framedataChangesRejectCreate = (
    changeId: number,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/FramedataChanges/reject/${changeId}`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags FramedataChanges
   * @name FramedataChangesDetectCreate
   * @request POST:/api/FramedataChanges/detect
   */
  framedataChangesDetectCreate = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/FramedataChanges/detect`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags FramedataChanges
   * @name FramedataChangesStatsList
   * @request GET:/api/FramedataChanges/stats
   */
  framedataChangesStatsList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/FramedataChanges/stats`,
      method: "GET",
      ...params,
    });
}

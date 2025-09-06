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

import type {
  CreateUserRequest,
  DailyAutoMarkupUser,
  UpdateUserRequest,
} from "../types/data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Honkai<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Honkai
   * @name HonkaiUsersList
   * @request GET:/api/Honkai/users
   * @response `200` `(DailyAutoMarkupUser)[]` OK
   */
  honkaiUsersList = (params: RequestParams = {}) =>
    this.request<DailyAutoMarkupUser[], any>({
      path: `/api/Honkai/users`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Honkai
   * @name HonkaiUsersCreate
   * @request POST:/api/Honkai/users
   * @response `200` `DailyAutoMarkupUser` OK
   */
  honkaiUsersCreate = (data: CreateUserRequest, params: RequestParams = {}) =>
    this.request<DailyAutoMarkupUser, any>({
      path: `/api/Honkai/users`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Honkai
   * @name HonkaiUsersDetail
   * @request GET:/api/Honkai/users/{id}
   * @response `200` `DailyAutoMarkupUser` OK
   */
  honkaiUsersDetail = (id: string, params: RequestParams = {}) =>
    this.request<DailyAutoMarkupUser, any>({
      path: `/api/Honkai/users/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Honkai
   * @name HonkaiUsersUpdate
   * @request PUT:/api/Honkai/users/{id}
   * @response `200` `DailyAutoMarkupUser` OK
   */
  honkaiUsersUpdate = (
    id: string,
    data: UpdateUserRequest,
    params: RequestParams = {},
  ) =>
    this.request<DailyAutoMarkupUser, any>({
      path: `/api/Honkai/users/${id}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Honkai
   * @name HonkaiUsersDelete
   * @request DELETE:/api/Honkai/users/{id}
   * @response `200` `void` OK
   */
  honkaiUsersDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Honkai/users/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags Honkai
   * @name HonkaiUsersRedeemNowCreate
   * @request POST:/api/Honkai/users/{id}/redeem-now
   * @response `200` `void` OK
   */
  honkaiUsersRedeemNowCreate = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Honkai/users/${id}/redeem-now`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags Honkai
   * @name HonkaiStatsList
   * @request GET:/api/Honkai/stats
   * @response `200` `void` OK
   */
  honkaiStatsList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Honkai/stats`,
      method: "GET",
      ...params,
    });
}

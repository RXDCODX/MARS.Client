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

import { ApiMediaInfo } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class MediaInfoApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags MediaInfoApi
   * @name MediaInfoApiList
   * @request GET:/api/MediaInfoApi
   * @response `200` `(ApiMediaInfo)[]` OK
   */
  mediaInfoApiList = (params: RequestParams = {}) =>
    this.request<ApiMediaInfo[], any>({
      path: `/api/MediaInfoApi`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MediaInfoApi
   * @name MediaInfoApiCreate
   * @request POST:/api/MediaInfoApi
   * @response `200` `ApiMediaInfo` OK
   */
  mediaInfoApiCreate = (data: ApiMediaInfo, params: RequestParams = {}) =>
    this.request<ApiMediaInfo, any>({
      path: `/api/MediaInfoApi`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MediaInfoApi
   * @name MediaInfoApiDetail
   * @request GET:/api/MediaInfoApi/{id}
   * @response `200` `ApiMediaInfo` OK
   */
  mediaInfoApiDetail = (id: string, params: RequestParams = {}) =>
    this.request<ApiMediaInfo, any>({
      path: `/api/MediaInfoApi/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MediaInfoApi
   * @name MediaInfoApiUpdate
   * @request PUT:/api/MediaInfoApi/{id}
   * @response `200` `ApiMediaInfo` OK
   */
  mediaInfoApiUpdate = (
    id: string,
    data: ApiMediaInfo,
    params: RequestParams = {},
  ) =>
    this.request<ApiMediaInfo, any>({
      path: `/api/MediaInfoApi/${id}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags MediaInfoApi
   * @name MediaInfoApiDelete
   * @request DELETE:/api/MediaInfoApi/{id}
   * @response `200` `void` OK
   */
  mediaInfoApiDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/MediaInfoApi/${id}`,
      method: "DELETE",
      ...params,
    });
}

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

import type { StreamArchiveConfig, ValidateFolderRequest } from "../types/data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class StreamArchive<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags StreamArchive
   * @name StreamArchiveList
   * @request GET:/api/StreamArchive
   * @response `200` `(StreamArchiveConfig)[]` OK
   */
  streamArchiveList = (params: RequestParams = {}) =>
    this.request<StreamArchiveConfig[], any>({
      path: `/api/StreamArchive`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags StreamArchive
   * @name StreamArchiveCreate
   * @request POST:/api/StreamArchive
   * @response `200` `StreamArchiveConfig` OK
   */
  streamArchiveCreate = (
    data: StreamArchiveConfig,
    params: RequestParams = {},
  ) =>
    this.request<StreamArchiveConfig, any>({
      path: `/api/StreamArchive`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags StreamArchive
   * @name StreamArchiveDetail
   * @request GET:/api/StreamArchive/{id}
   * @response `200` `StreamArchiveConfig` OK
   */
  streamArchiveDetail = (id: string, params: RequestParams = {}) =>
    this.request<StreamArchiveConfig, any>({
      path: `/api/StreamArchive/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags StreamArchive
   * @name StreamArchiveUpdate
   * @request PUT:/api/StreamArchive/{id}
   * @response `200` `void` OK
   */
  streamArchiveUpdate = (
    id: string,
    data: StreamArchiveConfig,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/StreamArchive/${id}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags StreamArchive
   * @name StreamArchiveDelete
   * @request DELETE:/api/StreamArchive/{id}
   * @response `200` `void` OK
   */
  streamArchiveDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/StreamArchive/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags StreamArchive
   * @name StreamArchiveValidateFolderCreate
   * @request POST:/api/StreamArchive/validate-folder
   * @response `200` `void` OK
   */
  streamArchiveValidateFolderCreate = (
    data: ValidateFolderRequest,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/StreamArchive/validate-folder`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags StreamArchive
   * @name StreamArchiveFilesList
   * @request GET:/api/StreamArchive/{configId}/files
   * @response `200` `void` OK
   */
  streamArchiveFilesList = (configId: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/StreamArchive/${configId}/files`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags StreamArchive
   * @name StreamArchiveStatisticsList
   * @request GET:/api/StreamArchive/statistics
   * @response `200` `void` OK
   */
  streamArchiveStatisticsList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/StreamArchive/statistics`,
      method: "GET",
      ...params,
    });
}

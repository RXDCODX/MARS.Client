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
  CinemaMediaItemDto,
  CinemaQueueStatistics,
  CinemaQueueStatusDetailParamsEnum,
  CreateMediaItemRequest,
  MediaMetadata,
  UpdateMediaItemRequest,
} from "../types/data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class CinemaQueue<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags CinemaQueue
   * @name CinemaQueueList
   * @request GET:/api/CinemaQueue
   * @response `200` `(CinemaMediaItemDto)[]` OK
   */
  cinemaQueueList = (params: RequestParams = {}) =>
    this.request<CinemaMediaItemDto[], any>({
      path: `/api/CinemaQueue`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags CinemaQueue
   * @name CinemaQueueCreate
   * @request POST:/api/CinemaQueue
   * @response `200` `CinemaMediaItemDto` OK
   */
  cinemaQueueCreate = (
    data: CreateMediaItemRequest,
    params: RequestParams = {},
  ) =>
    this.request<CinemaMediaItemDto, any>({
      path: `/api/CinemaQueue`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags CinemaQueue
   * @name CinemaQueueDetail
   * @request GET:/api/CinemaQueue/{id}
   * @response `200` `CinemaMediaItemDto` OK
   */
  cinemaQueueDetail = (id: string, params: RequestParams = {}) =>
    this.request<CinemaMediaItemDto, any>({
      path: `/api/CinemaQueue/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags CinemaQueue
   * @name CinemaQueueUpdate
   * @request PUT:/api/CinemaQueue/{id}
   * @response `200` `CinemaMediaItemDto` OK
   */
  cinemaQueueUpdate = (
    id: string,
    data: UpdateMediaItemRequest,
    params: RequestParams = {},
  ) =>
    this.request<CinemaMediaItemDto, any>({
      path: `/api/CinemaQueue/${id}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags CinemaQueue
   * @name CinemaQueueDelete
   * @request DELETE:/api/CinemaQueue/{id}
   * @response `200` `void` OK
   */
  cinemaQueueDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/CinemaQueue/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags CinemaQueue
   * @name CinemaQueueNextList
   * @request GET:/api/CinemaQueue/next
   * @response `200` `CinemaMediaItemDto` OK
   */
  cinemaQueueNextList = (params: RequestParams = {}) =>
    this.request<CinemaMediaItemDto, any>({
      path: `/api/CinemaQueue/next`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags CinemaQueue
   * @name CinemaQueueStatusDetail
   * @request GET:/api/CinemaQueue/status/{status}
   * @response `200` `(CinemaMediaItemDto)[]` OK
   */
  cinemaQueueStatusDetail = (
    status: CinemaQueueStatusDetailParamsEnum,
    params: RequestParams = {},
  ) =>
    this.request<CinemaMediaItemDto[], any>({
      path: `/api/CinemaQueue/status/${status}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags CinemaQueue
   * @name CinemaQueueMarkAsNextCreate
   * @request POST:/api/CinemaQueue/{id}/mark-as-next
   * @response `200` `void` OK
   */
  cinemaQueueMarkAsNextCreate = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/CinemaQueue/${id}/mark-as-next`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags CinemaQueue
   * @name CinemaQueueStatusPartialUpdate
   * @request PATCH:/api/CinemaQueue/{id}/status
   * @response `200` `void` OK
   */
  cinemaQueueStatusPartialUpdate = (
    id: string,
    data: "Pending" | "InProgress" | "Completed" | "Cancelled" | "Postponed",
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/CinemaQueue/${id}/status`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags CinemaQueue
   * @name CinemaQueuePriorityPartialUpdate
   * @request PATCH:/api/CinemaQueue/{id}/priority
   * @response `200` `void` OK
   */
  cinemaQueuePriorityPartialUpdate = (
    id: string,
    data: number,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/CinemaQueue/${id}/priority`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags CinemaQueue
   * @name CinemaQueueStatisticsList
   * @request GET:/api/CinemaQueue/statistics
   * @response `200` `CinemaQueueStatistics` OK
   */
  cinemaQueueStatisticsList = (params: RequestParams = {}) =>
    this.request<CinemaQueueStatistics, any>({
      path: `/api/CinemaQueue/statistics`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags CinemaQueue
   * @name CinemaQueueMetadataList
   * @request GET:/api/CinemaQueue/metadata
   * @response `200` `MediaMetadata` OK
   */
  cinemaQueueMetadataList = (
    query?: {
      url: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MediaMetadata, any>({
      path: `/api/CinemaQueue/metadata`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
}

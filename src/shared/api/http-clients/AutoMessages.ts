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
  AutoMessageDto,
  CreateAutoMessageRequest,
  UpdateAutoMessageRequest,
} from "../types/data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class AutoMessages<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags AutoMessages
   * @name AutoMessagesList
   * @request GET:/api/AutoMessages
   * @response `200` `(AutoMessageDto)[]` OK
   */
  autoMessagesList = (params: RequestParams = {}) =>
    this.request<AutoMessageDto[], any>({
      path: `/api/AutoMessages`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags AutoMessages
   * @name AutoMessagesCreate
   * @request POST:/api/AutoMessages
   * @response `200` `AutoMessageDto` OK
   */
  autoMessagesCreate = (
    data: CreateAutoMessageRequest,
    params: RequestParams = {},
  ) =>
    this.request<AutoMessageDto, any>({
      path: `/api/AutoMessages`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags AutoMessages
   * @name AutoMessagesDetail
   * @request GET:/api/AutoMessages/{id}
   * @response `200` `AutoMessageDto` OK
   */
  autoMessagesDetail = (id: string, params: RequestParams = {}) =>
    this.request<AutoMessageDto, any>({
      path: `/api/AutoMessages/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags AutoMessages
   * @name AutoMessagesUpdate
   * @request PUT:/api/AutoMessages/{id}
   * @response `200` `AutoMessageDto` OK
   */
  autoMessagesUpdate = (
    id: string,
    data: UpdateAutoMessageRequest,
    params: RequestParams = {},
  ) =>
    this.request<AutoMessageDto, any>({
      path: `/api/AutoMessages/${id}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags AutoMessages
   * @name AutoMessagesDelete
   * @request DELETE:/api/AutoMessages/{id}
   * @response `200` `void` OK
   */
  autoMessagesDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/AutoMessages/${id}`,
      method: "DELETE",
      ...params,
    });
}

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
  CreateMemeOrderDto,
  CreateMemeTypeDto,
  MemeOrderDto,
  MemeTypeDto,
  ProblemDetails,
  UpdateMemeOrderDto,
  UpdateMemeTypeDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class RandomMeme<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags RandomMeme
   * @name RandomMemeTypesList
   * @request GET:/api/RandomMeme/types
   * @response `200` `(MemeTypeDto)[]` OK
   * @response `500` `void` Internal Server Error
   */
  randomMemeTypesList = (params: RequestParams = {}) =>
    this.request<MemeTypeDto[], void>({
      path: `/api/RandomMeme/types`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RandomMeme
   * @name RandomMemeTypesCreate
   * @request POST:/api/RandomMeme/types
   * @response `201` `MemeTypeDto` Created
   * @response `400` `ProblemDetails` Bad Request
   * @response `500` `void` Internal Server Error
   */
  randomMemeTypesCreate = (
    data: CreateMemeTypeDto,
    params: RequestParams = {},
  ) =>
    this.request<MemeTypeDto, ProblemDetails | void>({
      path: `/api/RandomMeme/types`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RandomMeme
   * @name RandomMemeTypesDetail
   * @request GET:/api/RandomMeme/types/{id}
   * @response `200` `MemeTypeDto` OK
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Internal Server Error
   */
  randomMemeTypesDetail = (id: number, params: RequestParams = {}) =>
    this.request<MemeTypeDto, ProblemDetails | void>({
      path: `/api/RandomMeme/types/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RandomMeme
   * @name RandomMemeTypesUpdate
   * @request PUT:/api/RandomMeme/types/{id}
   * @response `200` `MemeTypeDto` OK
   * @response `400` `ProblemDetails` Bad Request
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Internal Server Error
   */
  randomMemeTypesUpdate = (
    id: number,
    data: UpdateMemeTypeDto,
    params: RequestParams = {},
  ) =>
    this.request<MemeTypeDto, ProblemDetails | void>({
      path: `/api/RandomMeme/types/${id}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RandomMeme
   * @name RandomMemeTypesDelete
   * @request DELETE:/api/RandomMeme/types/{id}
   * @response `204` `void` No Content
   * @response `400` `ProblemDetails` Bad Request
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Internal Server Error
   */
  randomMemeTypesDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/RandomMeme/types/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags RandomMeme
   * @name RandomMemeOrdersList
   * @request GET:/api/RandomMeme/orders
   * @response `200` `(MemeOrderDto)[]` OK
   * @response `500` `void` Internal Server Error
   */
  randomMemeOrdersList = (params: RequestParams = {}) =>
    this.request<MemeOrderDto[], void>({
      path: `/api/RandomMeme/orders`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RandomMeme
   * @name RandomMemeOrdersCreate
   * @request POST:/api/RandomMeme/orders
   * @response `201` `MemeOrderDto` Created
   * @response `400` `ProblemDetails` Bad Request
   * @response `500` `void` Internal Server Error
   */
  randomMemeOrdersCreate = (
    data: CreateMemeOrderDto,
    params: RequestParams = {},
  ) =>
    this.request<MemeOrderDto, ProblemDetails | void>({
      path: `/api/RandomMeme/orders`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RandomMeme
   * @name RandomMemeOrdersTypeDetail
   * @request GET:/api/RandomMeme/orders/type/{typeId}
   * @response `200` `(MemeOrderDto)[]` OK
   * @response `500` `void` Internal Server Error
   */
  randomMemeOrdersTypeDetail = (typeId: number, params: RequestParams = {}) =>
    this.request<MemeOrderDto[], void>({
      path: `/api/RandomMeme/orders/type/${typeId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RandomMeme
   * @name RandomMemeOrdersDetail
   * @request GET:/api/RandomMeme/orders/{id}
   * @response `200` `MemeOrderDto` OK
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Internal Server Error
   */
  randomMemeOrdersDetail = (id: string, params: RequestParams = {}) =>
    this.request<MemeOrderDto, ProblemDetails | void>({
      path: `/api/RandomMeme/orders/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RandomMeme
   * @name RandomMemeOrdersUpdate
   * @request PUT:/api/RandomMeme/orders/{id}
   * @response `200` `MemeOrderDto` OK
   * @response `400` `ProblemDetails` Bad Request
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Internal Server Error
   */
  randomMemeOrdersUpdate = (
    id: string,
    data: UpdateMemeOrderDto,
    params: RequestParams = {},
  ) =>
    this.request<MemeOrderDto, ProblemDetails | void>({
      path: `/api/RandomMeme/orders/${id}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RandomMeme
   * @name RandomMemeOrdersDelete
   * @request DELETE:/api/RandomMeme/orders/{id}
   * @response `204` `void` No Content
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Internal Server Error
   */
  randomMemeOrdersDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/RandomMeme/orders/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags RandomMeme
   * @name RandomMemeRandomList
   * @request GET:/api/RandomMeme/random
   * @response `200` `MemeOrderDto` OK
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Internal Server Error
   */
  randomMemeRandomList = (
    query?: {
      /** @format int32 */
      typeId: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<MemeOrderDto, ProblemDetails | void>({
      path: `/api/RandomMeme/random`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RandomMeme
   * @name RandomMemeCountList
   * @request GET:/api/RandomMeme/count
   * @response `200` `number` OK
   * @response `500` `void` Internal Server Error
   */
  randomMemeCountList = (
    query?: {
      /** @format int32 */
      typeId: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<number, void>({
      path: `/api/RandomMeme/count`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RandomMeme
   * @name RandomMemeFileDetail
   * @request GET:/api/RandomMeme/file/{id}
   * @response `200` `void` OK
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Internal Server Error
   */
  randomMemeFileDetail = (id: string, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/RandomMeme/file/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags RandomMeme
   * @name RandomMemeFileRandomList
   * @request GET:/api/RandomMeme/file/random
   * @response `200` `void` OK
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Internal Server Error
   */
  randomMemeFileRandomList = (
    query?: {
      /** @format int32 */
      typeId: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/RandomMeme/file/random`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags RandomMeme
   * @name RandomMemeOrdersReorderCreate
   * @request POST:/api/RandomMeme/orders/reorder/{typeId}
   * @response `200` `void` OK
   * @response `500` `void` Internal Server Error
   */
  randomMemeOrdersReorderCreate = (
    typeId: number,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/api/RandomMeme/orders/reorder/${typeId}`,
      method: "POST",
      ...params,
    });
}

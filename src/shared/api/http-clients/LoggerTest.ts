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

export class LoggerTest<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags LoggerTest
   * @name LoggerTestTestLoggingCreate
   * @request POST:/api/LoggerTest/test-logging
   * @response `200` `void` OK
   */
  loggerTestTestLoggingCreate = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/LoggerTest/test-logging`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags LoggerTest
   * @name LoggerTestTestExceptionCreate
   * @request POST:/api/LoggerTest/test-exception
   * @response `200` `void` OK
   */
  loggerTestTestExceptionCreate = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/LoggerTest/test-exception`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags LoggerTest
   * @name LoggerTestTestStructuredCreate
   * @request POST:/api/LoggerTest/test-structured
   * @response `200` `void` OK
   */
  loggerTestTestStructuredCreate = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/LoggerTest/test-structured`,
      method: "POST",
      ...params,
    });
}

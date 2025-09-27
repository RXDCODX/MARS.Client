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

export class TestLogger<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags TestLogger
   * @name TestLoggerTestWarningCreate
   * @request POST:/api/TestLogger/test-warning
   * @response `200` `string` OK
   */
  testLoggerTestWarningCreate = (params: RequestParams = {}) =>
    this.request<string, any>({
      path: `/api/TestLogger/test-warning`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags TestLogger
   * @name TestLoggerTestErrorCreate
   * @request POST:/api/TestLogger/test-error
   * @response `200` `string` OK
   */
  testLoggerTestErrorCreate = (params: RequestParams = {}) =>
    this.request<string, any>({
      path: `/api/TestLogger/test-error`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags TestLogger
   * @name TestLoggerTestCriticalCreate
   * @request POST:/api/TestLogger/test-critical
   * @response `200` `string` OK
   */
  testLoggerTestCriticalCreate = (params: RequestParams = {}) =>
    this.request<string, any>({
      path: `/api/TestLogger/test-critical`,
      method: "POST",
      format: "json",
      ...params,
    });
}

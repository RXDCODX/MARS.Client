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
  Log,
  LogResponse,
  LogsByLevelDetailParamsEnum,
  LogsListParamsLogLevelEnum,
  LogsStatistics,
} from "../types/data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Logs<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Logs
   * @name LogsList
   * @request GET:/api/Logs
   * @response `200` `LogResponse` OK
   */
  logsList = (
    query?: {
      /**
       * @format int32
       * @default 1
       */
      page: number;
      /**
       * @format int32
       * @default 50
       */
      pageSize: number;
      /** @default "whenlogged" */
      sortBy: string;
      /** @default true */
      sortDescending: boolean;
      logLevel: LogsListParamsLogLevelEnum;
      /** @format date-time */
      fromDate: string;
      /** @format date-time */
      toDate: string;
      searchText: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<LogResponse, any>({
      path: `/api/Logs`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Logs
   * @name LogsByLevelDetail
   * @request GET:/api/Logs/by-level/{logLevel}
   * @response `200` `(Log)[]` OK
   */
  logsByLevelDetail = (
    logLevel: LogsByLevelDetailParamsEnum,
    params: RequestParams = {},
  ) =>
    this.request<Log[], any>({
      path: `/api/Logs/by-level/${logLevel}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Logs
   * @name LogsByDateRangeList
   * @request GET:/api/Logs/by-date-range
   * @response `200` `(Log)[]` OK
   */
  logsByDateRangeList = (
    query?: {
      /** @format date-time */
      fromDate: string;
      /** @format date-time */
      toDate: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<Log[], any>({
      path: `/api/Logs/by-date-range`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Logs
   * @name LogsRecentList
   * @request GET:/api/Logs/recent
   * @response `200` `(Log)[]` OK
   */
  logsRecentList = (
    query?: {
      /**
       * @format int32
       * @default 100
       */
      count: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<Log[], any>({
      path: `/api/Logs/recent`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Logs
   * @name LogsStatisticsList
   * @request GET:/api/Logs/statistics
   * @response `200` `LogsStatistics` OK
   */
  logsStatisticsList = (params: RequestParams = {}) =>
    this.request<LogsStatistics, any>({
      path: `/api/Logs/statistics`,
      method: "GET",
      format: "json",
      ...params,
    });
}

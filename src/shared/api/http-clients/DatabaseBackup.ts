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

import type { UpdatePgDumpSettingsRequest } from "../types/data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class DatabaseBackup<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags DatabaseBackup
   * @name DatabaseBackupCreateCreate
   * @request POST:/api/DatabaseBackup/create
   * @response `200` `void` OK
   */
  databaseBackupCreateCreate = (
    query?: {
      databaseName: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/DatabaseBackup/create`,
      method: "POST",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags DatabaseBackup
   * @name DatabaseBackupDownloadList
   * @request GET:/api/DatabaseBackup/download
   * @response `200` `void` OK
   */
  databaseBackupDownloadList = (
    query?: {
      fileName: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/DatabaseBackup/download`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags DatabaseBackup
   * @name DatabaseBackupListList
   * @request GET:/api/DatabaseBackup/list
   * @response `200` `void` OK
   */
  databaseBackupListList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/DatabaseBackup/list`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags DatabaseBackup
   * @name DatabaseBackupCleanupCreate
   * @request POST:/api/DatabaseBackup/cleanup
   * @response `200` `void` OK
   */
  databaseBackupCleanupCreate = (
    query?: {
      /**
       * @format int32
       * @default 10
       */
      keepCount: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/DatabaseBackup/cleanup`,
      method: "POST",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags DatabaseBackup
   * @name DatabaseBackupStatusList
   * @request GET:/api/DatabaseBackup/status
   * @response `200` `void` OK
   */
  databaseBackupStatusList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/DatabaseBackup/status`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags DatabaseBackup
   * @name DatabaseBackupPgDumpSettingsList
   * @request GET:/api/DatabaseBackup/pg-dump/settings
   * @response `200` `void` OK
   */
  databaseBackupPgDumpSettingsList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/DatabaseBackup/pg-dump/settings`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags DatabaseBackup
   * @name DatabaseBackupPgDumpSettingsCreate
   * @request POST:/api/DatabaseBackup/pg-dump/settings
   * @response `200` `void` OK
   */
  databaseBackupPgDumpSettingsCreate = (
    data: UpdatePgDumpSettingsRequest,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/DatabaseBackup/pg-dump/settings`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags DatabaseBackup
   * @name DatabaseBackupPgDumpValidateCreate
   * @request POST:/api/DatabaseBackup/pg-dump/validate
   * @response `200` `void` OK
   */
  databaseBackupPgDumpValidateCreate = (
    query?: {
      pgDumpPath: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/DatabaseBackup/pg-dump/validate`,
      method: "POST",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags DatabaseBackup
   * @name DatabaseBackupPgDumpHistoryList
   * @request GET:/api/DatabaseBackup/pg-dump/history
   * @response `200` `void` OK
   */
  databaseBackupPgDumpHistoryList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/DatabaseBackup/pg-dump/history`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags DatabaseBackup
   * @name DatabaseBackupPgDumpConfiguredList
   * @request GET:/api/DatabaseBackup/pg-dump/configured
   * @response `200` `void` OK
   */
  databaseBackupPgDumpConfiguredList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/DatabaseBackup/pg-dump/configured`,
      method: "GET",
      ...params,
    });
}

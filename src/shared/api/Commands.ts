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
  CommandInfo,
  CommandParameterInfo,
  CommandsAdminPlatformDetailParamsEnum,
  CommandsAdminPlatformInfoListParamsEnum,
  CommandsUserPlatformDetailParamsEnum,
  CommandsUserPlatformInfoListParamsEnum,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Commands<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Commands
   * @name CommandsUserList
   * @request GET:/api/Commands/user
   */
  commandsUserList = (params: RequestParams = {}) =>
    this.request<string, any>({
      path: `/api/Commands/user`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Commands
   * @name CommandsAdminList
   * @request GET:/api/Commands/admin
   */
  commandsAdminList = (params: RequestParams = {}) =>
    this.request<string, any>({
      path: `/api/Commands/admin`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Commands
   * @name CommandsUserPlatformDetail
   * @request GET:/api/Commands/user/platform/{platform}
   */
  commandsUserPlatformDetail = (
    platform: CommandsUserPlatformDetailParamsEnum,
    params: RequestParams = {},
  ) =>
    this.request<string[], any>({
      path: `/api/Commands/user/platform/${platform}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Commands
   * @name CommandsAdminPlatformDetail
   * @request GET:/api/Commands/admin/platform/{platform}
   */
  commandsAdminPlatformDetail = (
    platform: CommandsAdminPlatformDetailParamsEnum,
    params: RequestParams = {},
  ) =>
    this.request<string[], any>({
      path: `/api/Commands/admin/platform/${platform}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Commands
   * @name CommandsUserPlatformInfoList
   * @request GET:/api/Commands/user/platform/{platform}/info
   */
  commandsUserPlatformInfoList = (
    platform: CommandsUserPlatformInfoListParamsEnum,
    params: RequestParams = {},
  ) =>
    this.request<CommandInfo[], any>({
      path: `/api/Commands/user/platform/${platform}/info`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Commands
   * @name CommandsAdminPlatformInfoList
   * @request GET:/api/Commands/admin/platform/{platform}/info
   */
  commandsAdminPlatformInfoList = (
    platform: CommandsAdminPlatformInfoListParamsEnum,
    params: RequestParams = {},
  ) =>
    this.request<CommandInfo[], any>({
      path: `/api/Commands/admin/platform/${platform}/info`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Commands
   * @name CommandsParametersList
   * @request GET:/api/Commands/{commandName}/parameters
   */
  commandsParametersList = (commandName: string, params: RequestParams = {}) =>
    this.request<CommandParameterInfo[], any>({
      path: `/api/Commands/${commandName}/parameters`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Commands
   * @name CommandsExecuteCreate
   * @request POST:/api/Commands/{commandName}/execute
   */
  commandsExecuteCreate = (
    commandName: string,
    data: string,
    params: RequestParams = {},
  ) =>
    this.request<string, any>({
      path: `/api/Commands/${commandName}/execute`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}

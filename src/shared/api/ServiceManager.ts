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

import { ServiceInfo, ServiceLog } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class ServiceManager<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags ServiceManager
   * @name ServiceManagerStatusList
   * @request GET:/api/ServiceManager/status
   */
  serviceManagerStatusList = (params: RequestParams = {}) =>
    this.request<
      Record<
        string,
        "Running" | "Stopped" | "Starting" | "Stopping" | "Error" | "Unknown"
      >,
      any
    >({
      path: `/api/ServiceManager/status`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ServiceManager
   * @name ServiceManagerServiceDetail
   * @request GET:/api/ServiceManager/service/{serviceName}
   */
  serviceManagerServiceDetail = (
    serviceName: string,
    params: RequestParams = {},
  ) =>
    this.request<ServiceInfo, any>({
      path: `/api/ServiceManager/service/${serviceName}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ServiceManager
   * @name ServiceManagerServiceStartCreate
   * @request POST:/api/ServiceManager/service/{serviceName}/start
   */
  serviceManagerServiceStartCreate = (
    serviceName: string,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/ServiceManager/service/${serviceName}/start`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags ServiceManager
   * @name ServiceManagerServiceStopCreate
   * @request POST:/api/ServiceManager/service/{serviceName}/stop
   */
  serviceManagerServiceStopCreate = (
    serviceName: string,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/ServiceManager/service/${serviceName}/stop`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags ServiceManager
   * @name ServiceManagerServiceRestartCreate
   * @request POST:/api/ServiceManager/service/{serviceName}/restart
   */
  serviceManagerServiceRestartCreate = (
    serviceName: string,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/ServiceManager/service/${serviceName}/restart`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags ServiceManager
   * @name ServiceManagerServiceLogsList
   * @request GET:/api/ServiceManager/service/{serviceName}/logs
   */
  serviceManagerServiceLogsList = (
    serviceName: string,
    query?: {
      /**
       * @format int32
       * @default 100
       */
      count: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<ServiceLog[], any>({
      path: `/api/ServiceManager/service/${serviceName}/logs`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ServiceManager
   * @name ServiceManagerServiceActiveCreate
   * @request POST:/api/ServiceManager/service/{serviceName}/active
   */
  serviceManagerServiceActiveCreate = (
    serviceName: string,
    data: boolean,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/ServiceManager/service/${serviceName}/active`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ServiceManager
   * @name ServiceManagerServicesList
   * @request GET:/api/ServiceManager/services
   */
  serviceManagerServicesList = (params: RequestParams = {}) =>
    this.request<ServiceInfo[], any>({
      path: `/api/ServiceManager/services`,
      method: "GET",
      format: "json",
      ...params,
    });
}

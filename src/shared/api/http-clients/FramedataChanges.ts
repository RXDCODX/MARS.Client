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

import { MovePendingDto, TekkenCharacterPendingDto } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class FramedataChanges<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags FramedataChanges
   * @name FramedataChangesPendingCharactersList
   * @request GET:/api/FramedataChanges/pending/characters
   * @response `200` `(TekkenCharacterPendingDto)[]` OK
   */
  framedataChangesPendingCharactersList = (params: RequestParams = {}) =>
    this.request<TekkenCharacterPendingDto[], any>({
      path: `/api/FramedataChanges/pending/characters`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags FramedataChanges
   * @name FramedataChangesPendingMovesList
   * @request GET:/api/FramedataChanges/pending/moves
   * @response `200` `(MovePendingDto)[]` OK
   */
  framedataChangesPendingMovesList = (
    query?: {
      characterName: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MovePendingDto[], any>({
      path: `/api/FramedataChanges/pending/moves`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags FramedataChanges
   * @name FramedataChangesApproveCharacterCreate
   * @request POST:/api/FramedataChanges/approve/character/{name}
   * @response `200` `void` OK
   */
  framedataChangesApproveCharacterCreate = (
    name: string,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/FramedataChanges/approve/character/${name}`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags FramedataChanges
   * @name FramedataChangesRejectCharacterCreate
   * @request POST:/api/FramedataChanges/reject/character/{name}
   * @response `200` `void` OK
   */
  framedataChangesRejectCharacterCreate = (
    name: string,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/FramedataChanges/reject/character/${name}`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags FramedataChanges
   * @name FramedataChangesApproveMoveCreate
   * @request POST:/api/FramedataChanges/approve/move/{characterName}/{command}
   * @response `200` `void` OK
   */
  framedataChangesApproveMoveCreate = (
    characterName: string,
    command: string,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/FramedataChanges/approve/move/${characterName}/${command}`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags FramedataChanges
   * @name FramedataChangesRejectMoveCreate
   * @request POST:/api/FramedataChanges/reject/move/{characterName}/{command}
   * @response `200` `void` OK
   */
  framedataChangesRejectMoveCreate = (
    characterName: string,
    command: string,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/FramedataChanges/reject/move/${characterName}/${command}`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags FramedataChanges
   * @name FramedataChangesApproveAllCreate
   * @request POST:/api/FramedataChanges/approve/all
   * @response `200` `void` OK
   */
  framedataChangesApproveAllCreate = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/FramedataChanges/approve/all`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags FramedataChanges
   * @name FramedataChangesRejectAllCreate
   * @request POST:/api/FramedataChanges/reject/all
   * @response `200` `void` OK
   */
  framedataChangesRejectAllCreate = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/FramedataChanges/reject/all`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags FramedataChanges
   * @name FramedataChangesScrapeCreate
   * @request POST:/api/FramedataChanges/scrape
   * @response `200` `void` OK
   */
  framedataChangesScrapeCreate = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/FramedataChanges/scrape`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags FramedataChanges
   * @name FramedataChangesStatsList
   * @request GET:/api/FramedataChanges/stats
   * @response `200` `void` OK
   */
  framedataChangesStatsList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/FramedataChanges/stats`,
      method: "GET",
      ...params,
    });
}

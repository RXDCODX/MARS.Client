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

import { Move, TekkenCharacter } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Framedata<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Framedata
   * @name FramedataCharactersList
   * @request GET:/api/Framedata/characters
   */
  framedataCharactersList = (params: RequestParams = {}) =>
    this.request<TekkenCharacter[], any>({
      path: `/api/Framedata/characters`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Framedata
   * @name FramedataCharactersCreate
   * @request POST:/api/Framedata/characters
   */
  framedataCharactersCreate = (
    data: TekkenCharacter,
    params: RequestParams = {},
  ) =>
    this.request<TekkenCharacter, any>({
      path: `/api/Framedata/characters`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Framedata
   * @name FramedataCharactersDetail
   * @request GET:/api/Framedata/characters/{name}
   */
  framedataCharactersDetail = (name: string, params: RequestParams = {}) =>
    this.request<TekkenCharacter, any>({
      path: `/api/Framedata/characters/${name}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Framedata
   * @name FramedataCharactersUpdate
   * @request PUT:/api/Framedata/characters/{name}
   */
  framedataCharactersUpdate = (
    name: string,
    data: TekkenCharacter,
    params: RequestParams = {},
  ) =>
    this.request<TekkenCharacter, any>({
      path: `/api/Framedata/characters/${name}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Framedata
   * @name FramedataCharactersDelete
   * @request DELETE:/api/Framedata/characters/{name}
   */
  framedataCharactersDelete = (name: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Framedata/characters/${name}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags Framedata
   * @name FramedataCharactersMovesList
   * @request GET:/api/Framedata/characters/{characterName}/moves
   */
  framedataCharactersMovesList = (
    characterName: string,
    params: RequestParams = {},
  ) =>
    this.request<Move[], any>({
      path: `/api/Framedata/characters/${characterName}/moves`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Framedata
   * @name FramedataCharactersMovesCreate
   * @request POST:/api/Framedata/characters/{characterName}/moves
   */
  framedataCharactersMovesCreate = (
    characterName: string,
    data: Move,
    params: RequestParams = {},
  ) =>
    this.request<Move, any>({
      path: `/api/Framedata/characters/${characterName}/moves`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Framedata
   * @name FramedataCharactersMovesDetail
   * @request GET:/api/Framedata/characters/{characterName}/moves/{command}
   */
  framedataCharactersMovesDetail = (
    characterName: string,
    command: string,
    params: RequestParams = {},
  ) =>
    this.request<Move, any>({
      path: `/api/Framedata/characters/${characterName}/moves/${command}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Framedata
   * @name FramedataCharactersMovesUpdate
   * @request PUT:/api/Framedata/characters/{characterName}/moves/{command}
   */
  framedataCharactersMovesUpdate = (
    characterName: string,
    command: string,
    data: Move,
    params: RequestParams = {},
  ) =>
    this.request<Move, any>({
      path: `/api/Framedata/characters/${characterName}/moves/${command}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Framedata
   * @name FramedataCharactersMovesDelete
   * @request DELETE:/api/Framedata/characters/{characterName}/moves/{command}
   */
  framedataCharactersMovesDelete = (
    characterName: string,
    command: string,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/Framedata/characters/${characterName}/moves/${command}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags Framedata
   * @name FramedataMovesSearchList
   * @request GET:/api/Framedata/moves/search
   */
  framedataMovesSearchList = (
    query?: {
      characterName: string;
      heatEngage: boolean;
      homing: boolean;
      isThrow: boolean;
      powerCrush: boolean;
      stanceCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<Move[], any>({
      path: `/api/Framedata/moves/search`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * Получить изображение персонажа
   *
   * @tags Framedata
   * @name FramedataCharactersImageDetail
   * @request GET:/api/Framedata/characters/{name}/image
   */
  framedataCharactersImageDetail = (
    name: string,
    params: RequestParams = {},
  ) =>
    this.request<Blob, any>({
      path: `/api/Framedata/characters/${name}/image`,
      method: "GET",
      format: "blob",
      ...params,
    });
}

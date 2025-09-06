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
  FramedataSupplementCreate2ParamsEnum,
  Move,
  ParseRequest,
  ParseResult,
  SupplementRequest,
  TekkenCharacter,
} from "../types/data-contracts";
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
   * @response `200` `(TekkenCharacter)[]` OK
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
   * @response `200` `TekkenCharacter` OK
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
   * @response `200` `TekkenCharacter` OK
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
   * @response `200` `TekkenCharacter` OK
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
   * @response `200` `void` OK
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
   * @response `200` `(Move)[]` OK
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
   * @response `200` `Move` OK
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
   * @response `200` `Move` OK
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
   * @response `200` `Move` OK
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
   * @response `200` `void` OK
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
   * @response `200` `(Move)[]` OK
   */
  framedataMovesSearchList = (
    query?: {
      characterName: string;
      stanceCode: string;
      heatEngage: boolean;
      powerCrush: boolean;
      isThrow: boolean;
      homing: boolean;
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
   * No description
   *
   * @tags Framedata
   * @name FramedataCharactersImageList
   * @request GET:/api/Framedata/characters/{name}/image
   * @response `200` `void` OK
   */
  framedataCharactersImageList = (name: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Framedata/characters/${name}/image`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Framedata
   * @name FramedataCharactersAvatarList
   * @request GET:/api/Framedata/characters/{name}/avatar
   * @response `200` `void` OK
   */
  framedataCharactersAvatarList = (name: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Framedata/characters/${name}/avatar`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Framedata
   * @name FramedataCharactersFullbodyList
   * @request GET:/api/Framedata/characters/{name}/fullbody
   * @response `200` `void` OK
   */
  framedataCharactersFullbodyList = (
    name: string,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/Framedata/characters/${name}/fullbody`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Framedata
   * @name FramedataParseCreate
   * @request POST:/api/Framedata/parse
   * @response `200` `ParseResult` OK
   */
  framedataParseCreate = (data: ParseRequest, params: RequestParams = {}) =>
    this.request<ParseResult, any>({
      path: `/api/Framedata/parse`,
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
   * @name FramedataParseCharactersOnlyCreate
   * @request POST:/api/Framedata/parse-characters-only
   * @response `200` `ParseResult` OK
   */
  framedataParseCharactersOnlyCreate = (
    data: ParseRequest,
    params: RequestParams = {},
  ) =>
    this.request<ParseResult, any>({
      path: `/api/Framedata/parse-characters-only`,
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
   * @name FramedataSupplementCreate
   * @request POST:/api/Framedata/supplement
   * @response `200` `ParseResult` OK
   */
  framedataSupplementCreate = (
    data: SupplementRequest,
    params: RequestParams = {},
  ) =>
    this.request<ParseResult, any>({
      path: `/api/Framedata/supplement`,
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
   * @name FramedataSupplementCreate2
   * @request POST:/api/Framedata/supplement/{source}
   * @originalName framedataSupplementCreate
   * @duplicate
   * @response `200` `ParseResult` OK
   */
  framedataSupplementCreate2 = (
    source: FramedataSupplementCreate2ParamsEnum,
    params: RequestParams = {},
  ) =>
    this.request<ParseResult, any>({
      path: `/api/Framedata/supplement/${source}`,
      method: "POST",
      format: "json",
      ...params,
    });
}

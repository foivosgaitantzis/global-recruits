/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type ValidationErrorsResponse = { title: string; detail: string; pointer: string }[];

export interface ErrorResponse {
  title?: string;
  detail?: string;
}

/**
 * @format uuid
 */
export type MemberIdParameter = string;

export enum MemberType {
  Athlete = "athlete",
  Staff = "staff",
  Administrator = "administrator",
}

export enum ActionType {
  Add = "add",
  Edit = "edit",
  Delete = "delete",
}

export enum TeamType {
  HighSchool = "high_school",
  College = "college",
  Club = "club",
  Aau = "aau",
}

export enum PositionType {
  Pg = "pg",
  Sg = "sg",
  Sf = "sf",
  Pf = "pf",
  C = "c",
}

export enum HeightUnit {
  Meters = "meters",
  Feet = "feet",
}

export interface HeightFeetMeasurementData {
  unit: "feet";

  /**
   * @min 4
   * @max 10
   */
  value: number;
}

export interface HeightMeterMeasurementData {
  unit: "meters";

  /**
   * @min 1
   * @max 2.5
   */
  value: number;
}

export enum WeightUnit {
  Kg = "kg",
  Pounds = "pounds",
}

export interface WeightKgMeasurementData {
  unit: "kg";

  /**
   * @format int32
   * @min 30
   * @max 200
   */
  value: number;
}

export interface WeightPoundMeasurementData {
  unit: "pounds";

  /**
   * @format int32
   * @min 60
   * @max 400
   */
  value: number;
}

export interface JoinMailingListRequestBody {
  data: { emailAddress: string };
}

export interface InviteMemberRequestBody {
  type: MemberType;
  data: { emailAddress: string };
}

export interface UpdateAthleteDetailsRequestBody {
  type: "athlete";
  data: {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    country?: string;
    city?: string;
    height?: HeightFeetMeasurementData | HeightMeterMeasurementData;
    weight?: WeightKgMeasurementData | WeightPoundMeasurementData;
    team?: {
      action: ActionType;
      id?: string;
      data?: {
        type?: TeamType;
        name?: string;
        position?: PositionType;
        country?: string;
        city?: string;
        school?: string;
        years?: {
          action: ActionType;
          id?: string;
          data?: { year?: number; stats?: { avgPpg?: number; avgApg?: number; avgRpg?: number } };
        }[];
      };
    }[];
    highlights?: { action: ActionType; id?: string; data?: string }[];
  };
}

export interface UpdateStaffDetailsRequestBody {
  type: "staff";
  data: {
    firstName?: string;
    lastName?: string;
    team?: {
      type?: TeamType;
      name?: string;
      school?: string | null;
      position?: string;
      country?: string | null;
      city?: string | null;
    };
  };
}

export interface GetAthleteDetailsResponse {
  type: "athlete";
  data: {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    country?: string;
    city?: string;
    height?: HeightFeetMeasurementData | HeightMeterMeasurementData;
    weight?: WeightKgMeasurementData | WeightPoundMeasurementData;
    team?: {
      id: string;
      data: {
        type: TeamType;
        name: string;
        position: PositionType;
        country?: string;
        city?: string;
        school?: string;
        years?: { id: string; data: { year: number; stats: { avgPpg: number; avgApg: number; avgRpg: number } } }[];
      };
    }[];
    highlights?: { id: string; data: string }[];
  };
}

export interface GetStaffDetailsResponse {
  type: "staff";
  data: {
    firstName?: string;
    lastName?: string;
    team?: { type?: TeamType; name?: string; school?: string; position?: string; country?: string; city?: string };
  };
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "https://api.globalrecruits.net" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      formData.append(
        key,
        property instanceof Blob
          ? property
          : typeof property === "object" && property !== null
          ? JSON.stringify(property)
          : `${property}`,
      );
      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = (format && this.format) || void 0;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      requestParams.headers.common = { Accept: "*/*" };
      requestParams.headers.post = {};
      requestParams.headers.put = {};

      body = this.createFormData(body as Record<string, unknown>);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Global Recruits API
 * @version 2.0.0
 * @baseUrl https://api.globalrecruits.net
 *
 * The Global Recruits API Specification
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  mailinglist = {
    /**
     * @description Adds an Email Address to the MailChimp Mailing List
     *
     * @tags mailingList
     * @name JoinMailingList
     * @summary Adds User to Mailing List
     * @request POST:/mailinglist
     * @secure
     */
    joinMailingList: (data: JoinMailingListRequestBody, params: RequestParams = {}) =>
      this.request<void, ValidationErrorsResponse | ErrorResponse>({
        path: `/mailinglist`,
        method: "POST",
        body: data,
        secure: true,
        ...params,
      }),
  };
  members = {
    /**
     * @description Uses Email Automation to Invite a Member to GlobalRecruits
     *
     * @tags inviteMember
     * @name InviteMember
     * @summary Invite a Member
     * @request POST:/members/invite
     * @secure
     */
    inviteMember: (data: InviteMemberRequestBody, params: RequestParams = {}) =>
      this.request<void, ValidationErrorsResponse | void | ErrorResponse>({
        path: `/members/invite`,
        method: "POST",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * @description Updates a Member's Personal Details
     *
     * @tags updateMember
     * @name UpdateMemberDetails
     * @summary Patch a Member
     * @request PATCH:/members/{memberId}
     * @secure
     */
    updateMemberDetails: (
      memberId: MemberIdParameter,
      data: UpdateAthleteDetailsRequestBody | UpdateStaffDetailsRequestBody,
      params: RequestParams = {},
    ) =>
      this.request<void, ValidationErrorsResponse | void | ErrorResponse>({
        path: `/members/${memberId}`,
        method: "PATCH",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * @description Gets an Athlete or Staff's Personal Details
     *
     * @tags getMember
     * @name GetMemberDetails
     * @summary Gets a Member
     * @request GET:/members/{memberId}
     * @secure
     */
    getMemberDetails: (memberId: MemberIdParameter, params: RequestParams = {}) =>
      this.request<
        GetAthleteDetailsResponse | GetStaffDetailsResponse,
        ValidationErrorsResponse | void | ErrorResponse
      >({
        path: `/members/${memberId}`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  me = {
    /**
     * @description Updates my own Personal Details
     *
     * @tags updatePersonalDetails
     * @name UpdatePersonalDetails
     * @summary Patch Myself
     * @request PATCH:/@me
     * @secure
     */
    updatePersonalDetails: (
      data: UpdateAthleteDetailsRequestBody | UpdateStaffDetailsRequestBody,
      params: RequestParams = {},
    ) =>
      this.request<void, ValidationErrorsResponse | void | ErrorResponse>({
        path: `/@me`,
        method: "PATCH",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * @description Gets my own Personal Details
     *
     * @tags getPersonalDetails
     * @name GetPersonalDetails
     * @summary Gets Myself
     * @request GET:/@me
     * @secure
     */
    getPersonalDetails: (params: RequestParams = {}) =>
      this.request<
        GetAthleteDetailsResponse | GetStaffDetailsResponse,
        ValidationErrorsResponse | void | ErrorResponse
      >({
        path: `/@me`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
}

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

export enum ProductTypeEnum {
  Gold = "Gold",
  Basic = "Basic",
}

export interface JoinMailingListRequestBody {
  data: { emailAddress: string };
}

export interface GetDiscordAccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export interface CreateStripeCustomerRequestBody {
  data: { firstName: string; lastName: string; emailAddress: string };
}

export interface GetMemberDataResponse {
  data: {
    stripeCustomerId: string;
    discordUserId: string;
    firstName: string;
    lastName: string;
    paymentMethod?: { paymentMethodId: string; cardBrand: string; last4: string; expMonth: number; expYear: number };
    subscription?: { subscriptionId: string; productType: ProductTypeEnum };
    guildRoles?: string[];
  };
}

export interface CreateStripeSubscriptionRequestBody {
  data: { productType: ProductTypeEnum };
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
 * @version 1.0.0
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
  auth = {
    /**
     * @description Authentication for Discord - Code Exchange/Refresh Token Renewal
     *
     * @tags discordAuth
     * @name GetDiscordAccessToken
     * @summary Retrieves Discord Access Token
     * @request POST:/auth
     * @secure
     */
    getDiscordAccessToken: (query: { grantType: "authorization_code" | "refresh_token" }, params: RequestParams = {}) =>
      this.request<GetDiscordAccessTokenResponse, ValidationErrorsResponse | void>({
        path: `/auth`,
        method: "POST",
        query: query,
        secure: true,
        ...params,
      }),
  };
  member = {
    /**
     * @description Creates a New Customer on Stripe - Links with Discord Account
     *
     * @tags stripe, discordAuth
     * @name CreateStripeCustomer
     * @summary Creates a New Customer on Stripe
     * @request POST:/member
     * @secure
     */
    createStripeCustomer: (data: CreateStripeCustomerRequestBody, params: RequestParams = {}) =>
      this.request<void, ValidationErrorsResponse | void | ErrorResponse>({
        path: `/member`,
        method: "POST",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * @description Gets Member Data from Both Stripe & Discord
     *
     * @tags stripe, discordAuth
     * @name GetMemberData
     * @summary Gets Member data
     * @request GET:/member
     * @secure
     */
    getMemberData: (
      query?: { expand?: ("paymentMethod" | "subscription" | "guildRoles")[] },
      params: RequestParams = {},
    ) =>
      this.request<GetMemberDataResponse, ValidationErrorsResponse | void | ErrorResponse>({
        path: `/member`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Gets the Member's Avatar from Discord
     *
     * @tags discordAuth
     * @name GetMemberAvatar
     * @summary Gets Member Avatar
     * @request GET:/member/avatar
     * @secure
     */
    getMemberAvatar: (params: RequestParams = {}) =>
      this.request<File, void | ErrorResponse>({
        path: `/member/avatar`,
        method: "GET",
        secure: true,
        format: "blob",
        ...params,
      }),
  };
  subscription = {
    /**
     * @description Creates a New Stripe Subscription for Customer using Stripe Price identifier
     *
     * @tags stripe, discordAuth
     * @name CreateStripeSubscription
     * @summary Creates a New Stripe Subscription
     * @request POST:/subscription
     * @secure
     */
    createStripeSubscription: (data: CreateStripeSubscriptionRequestBody, params: RequestParams = {}) =>
      this.request<void, ValidationErrorsResponse | void | ErrorResponse>({
        path: `/subscription`,
        method: "POST",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * @description Cancels an Existing Stripe Subscription
     *
     * @tags stripe, discordAuth
     * @name CancelStripeSubscription
     * @summary Cancels Stripe Subscription
     * @request DELETE:/subscription
     * @secure
     */
    cancelStripeSubscription: (params: RequestParams = {}) =>
      this.request<void, void | ErrorResponse>({
        path: `/subscription`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}

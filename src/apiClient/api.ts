/* tslint:disable */
/* eslint-disable */
/**
 * sdk_api
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface InlineResponse200
 */
export interface InlineResponse200 {
    /**
     * 
     * @type {ItemShippingInfo}
     * @memberof InlineResponse200
     */
    data: ItemShippingInfo;
    /**
     * 
     * @type {object}
     * @memberof InlineResponse200
     */
    meta: object;
}
/**
 * 
 * @export
 * @interface InlineResponse2001
 */
export interface InlineResponse2001 {
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2001
     */
    data?: string;
    /**
     * 
     * @type {object}
     * @memberof InlineResponse2001
     */
    meta?: object;
}
/**
 * 
 * @export
 * @interface ItemShippingInfo
 */
export interface ItemShippingInfo {
    /**
     * 
     * @type {string}
     * @memberof ItemShippingInfo
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof ItemShippingInfo
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof ItemShippingInfo
     */
    postalCode: string;
    /**
     * 
     * @type {string}
     * @memberof ItemShippingInfo
     */
    prefecture: string;
    /**
     * 
     * @type {string}
     * @memberof ItemShippingInfo
     */
    city: string;
    /**
     * 
     * @type {string}
     * @memberof ItemShippingInfo
     */
    address1: string;
    /**
     * 
     * @type {string}
     * @memberof ItemShippingInfo
     */
    address2: string;
    /**
     * 
     * @type {string}
     * @memberof ItemShippingInfo
     */
    tel: string;
    /**
     * 
     * @type {string}
     * @memberof ItemShippingInfo
     */
    memo: string;
}
/**
 * 
 * @export
 * @interface RegisterItemShippingInfoRequestBody
 */
export interface RegisterItemShippingInfoRequestBody {
    /**
     * 以下の項目データにSignしたもの
     * @type {string}
     * @memberof RegisterItemShippingInfoRequestBody
     */
    signedData: string;
    /**
     * 
     * @type {string}
     * @memberof RegisterItemShippingInfoRequestBody
     */
    chainType: RegisterItemShippingInfoRequestBodyChainTypeEnum;
    /**
     * 
     * @type {number}
     * @memberof RegisterItemShippingInfoRequestBody
     */
    networkId: RegisterItemShippingInfoRequestBodyNetworkIdEnum;
    /**
     * 
     * @type {string}
     * @memberof RegisterItemShippingInfoRequestBody
     */
    contractAddress: string;
    /**
     * 
     * @type {number}
     * @memberof RegisterItemShippingInfoRequestBody
     */
    tokenId: number;
    /**
     * 
     * @type {string}
     * @memberof RegisterItemShippingInfoRequestBody
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof RegisterItemShippingInfoRequestBody
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof RegisterItemShippingInfoRequestBody
     */
    postalCode: string;
    /**
     * 
     * @type {string}
     * @memberof RegisterItemShippingInfoRequestBody
     */
    prefecture: string;
    /**
     * 
     * @type {string}
     * @memberof RegisterItemShippingInfoRequestBody
     */
    city: string;
    /**
     * 
     * @type {string}
     * @memberof RegisterItemShippingInfoRequestBody
     */
    address1: string;
    /**
     * 
     * @type {string}
     * @memberof RegisterItemShippingInfoRequestBody
     */
    address2: string;
    /**
     * 
     * @type {string}
     * @memberof RegisterItemShippingInfoRequestBody
     */
    tel: string;
    /**
     * 
     * @type {string}
     * @memberof RegisterItemShippingInfoRequestBody
     */
    memo: string;
}

/**
    * @export
    * @enum {string}
    */
export enum RegisterItemShippingInfoRequestBodyChainTypeEnum {
    Ethereum = 'ethereum'
}
/**
    * @export
    * @enum {string}
    */
export enum RegisterItemShippingInfoRequestBodyNetworkIdEnum {
    NUMBER_1 = 1,
    NUMBER_4 = 4,
    NUMBER_80001 = 80001,
    NUMBER_137 = 137,
    NUMBER_31337 = 31337
}


/**
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 登録されているフィジカルアイテム付きItemに配送先住所を取得。（個人情報なので、WalletのSignが必要）
         * @param {string} annapurnaAccessToken 
         * @param {string} itemId 
         * @param {string} walletAddress 
         * @param {string} signedData Walletアドレスの文字列にSignしたもの
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getItemShippingInfo: async (annapurnaAccessToken: string, itemId: string, walletAddress: string, signedData: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'annapurnaAccessToken' is not null or undefined
            assertParamExists('getItemShippingInfo', 'annapurnaAccessToken', annapurnaAccessToken)
            // verify required parameter 'itemId' is not null or undefined
            assertParamExists('getItemShippingInfo', 'itemId', itemId)
            // verify required parameter 'walletAddress' is not null or undefined
            assertParamExists('getItemShippingInfo', 'walletAddress', walletAddress)
            // verify required parameter 'signedData' is not null or undefined
            assertParamExists('getItemShippingInfo', 'signedData', signedData)
            const localVarPath = `/v3_items/{itemId}/shipping_info`
                .replace(`{${"itemId"}}`, encodeURIComponent(String(itemId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (walletAddress !== undefined) {
                localVarQueryParameter['walletAddress'] = walletAddress;
            }

            if (signedData !== undefined) {
                localVarQueryParameter['signedData'] = signedData;
            }

            if (annapurnaAccessToken !== undefined && annapurnaAccessToken !== null) {
                localVarHeaderParameter['annapurna-access-token'] = String(annapurnaAccessToken);
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary フィジカルアイテム付きItemに配送先住所を登録する
         * @param {string} annapurnaAccessToken 
         * @param {string} itemId 
         * @param {RegisterItemShippingInfoRequestBody} [registerItemShippingInfoRequestBody] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        registerItemShippingInfo: async (annapurnaAccessToken: string, itemId: string, registerItemShippingInfoRequestBody?: RegisterItemShippingInfoRequestBody, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'annapurnaAccessToken' is not null or undefined
            assertParamExists('registerItemShippingInfo', 'annapurnaAccessToken', annapurnaAccessToken)
            // verify required parameter 'itemId' is not null or undefined
            assertParamExists('registerItemShippingInfo', 'itemId', itemId)
            const localVarPath = `/v3_items/{itemId}/shipping_info`
                .replace(`{${"itemId"}}`, encodeURIComponent(String(itemId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (annapurnaAccessToken !== undefined && annapurnaAccessToken !== null) {
                localVarHeaderParameter['annapurna-access-token'] = String(annapurnaAccessToken);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(registerItemShippingInfoRequestBody, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = DefaultApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary 登録されているフィジカルアイテム付きItemに配送先住所を取得。（個人情報なので、WalletのSignが必要）
         * @param {string} annapurnaAccessToken 
         * @param {string} itemId 
         * @param {string} walletAddress 
         * @param {string} signedData Walletアドレスの文字列にSignしたもの
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getItemShippingInfo(annapurnaAccessToken: string, itemId: string, walletAddress: string, signedData: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse200>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getItemShippingInfo(annapurnaAccessToken, itemId, walletAddress, signedData, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary フィジカルアイテム付きItemに配送先住所を登録する
         * @param {string} annapurnaAccessToken 
         * @param {string} itemId 
         * @param {RegisterItemShippingInfoRequestBody} [registerItemShippingInfoRequestBody] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async registerItemShippingInfo(annapurnaAccessToken: string, itemId: string, registerItemShippingInfoRequestBody?: RegisterItemShippingInfoRequestBody, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2001>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.registerItemShippingInfo(annapurnaAccessToken, itemId, registerItemShippingInfoRequestBody, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DefaultApiFp(configuration)
    return {
        /**
         * 
         * @summary 登録されているフィジカルアイテム付きItemに配送先住所を取得。（個人情報なので、WalletのSignが必要）
         * @param {string} annapurnaAccessToken 
         * @param {string} itemId 
         * @param {string} walletAddress 
         * @param {string} signedData Walletアドレスの文字列にSignしたもの
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getItemShippingInfo(annapurnaAccessToken: string, itemId: string, walletAddress: string, signedData: string, options?: any): AxiosPromise<InlineResponse200> {
            return localVarFp.getItemShippingInfo(annapurnaAccessToken, itemId, walletAddress, signedData, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary フィジカルアイテム付きItemに配送先住所を登録する
         * @param {string} annapurnaAccessToken 
         * @param {string} itemId 
         * @param {RegisterItemShippingInfoRequestBody} [registerItemShippingInfoRequestBody] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        registerItemShippingInfo(annapurnaAccessToken: string, itemId: string, registerItemShippingInfoRequestBody?: RegisterItemShippingInfoRequestBody, options?: any): AxiosPromise<InlineResponse2001> {
            return localVarFp.registerItemShippingInfo(annapurnaAccessToken, itemId, registerItemShippingInfoRequestBody, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
    /**
     * 
     * @summary 登録されているフィジカルアイテム付きItemに配送先住所を取得。（個人情報なので、WalletのSignが必要）
     * @param {string} annapurnaAccessToken 
     * @param {string} itemId 
     * @param {string} walletAddress 
     * @param {string} signedData Walletアドレスの文字列にSignしたもの
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public getItemShippingInfo(annapurnaAccessToken: string, itemId: string, walletAddress: string, signedData: string, options?: any) {
        return DefaultApiFp(this.configuration).getItemShippingInfo(annapurnaAccessToken, itemId, walletAddress, signedData, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary フィジカルアイテム付きItemに配送先住所を登録する
     * @param {string} annapurnaAccessToken 
     * @param {string} itemId 
     * @param {RegisterItemShippingInfoRequestBody} [registerItemShippingInfoRequestBody] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public registerItemShippingInfo(annapurnaAccessToken: string, itemId: string, registerItemShippingInfoRequestBody?: RegisterItemShippingInfoRequestBody, options?: any) {
        return DefaultApiFp(this.configuration).registerItemShippingInfo(annapurnaAccessToken, itemId, registerItemShippingInfoRequestBody, options).then((request) => request(this.axios, this.basePath));
    }
}


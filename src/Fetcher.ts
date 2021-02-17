import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { iSteamWebApiOptions } from '@/interfaces';
import { tSteamWebApiMethods } from '@/types';

/**
 * Steam Web Api data fetcher
 */
class Fetcher {
  /**
   * Steam Web Api Url
   */
  private readonly STEAM_WEB_API_URL = 'http://api.steampowered.com';

  /**
   * Private user steam web api key
   */
  private apiKey: string;

  /**
   * CORS Proxy
   */
  public proxy = '';

  /**
   * Class constructor
   *
   * @param apiKey Steam Web Api secret key
   */
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Convert iSteamWebApiOptions type to Steam web api url query string
   *
   * @param options Steam Web Api request query parameters
   */
  private convertOptionsToQuery(options: iSteamWebApiOptions): string {
    return Object.entries(options).join('&').replace(new RegExp(',', 'g'), '=');
  }

  /**
   * Fetch json from Steam web api
   *
   * @param method Methods available on Steam Web Api (https://developer.valvesoftware.com/wiki/Steam_Web_API#Interfaces_and_method)]
   * @param options Steam Web Api request query parameters
   */
  public async fetch<T>(
    method: tSteamWebApiMethods,
    options: iSteamWebApiOptions
  ): Promise<AxiosResponse<T>> {
    // Return object
    let response: AxiosResponse<T>;

    // Data request
    await axios
      .get(`${method}`, this.resolveRequestConfig(options))
      .then((data: AxiosResponse<T>) => {
        response = data;
      })
      .catch((err: AxiosError<T>) => {
        response = err.response;
      });

    return response;
  }

  /**
   * Parse steam web api url
   *
   * @param method Methods available on Steam Web Api (https://developer.valvesoftware.com/wiki/Steam_Web_API#Interfaces_and_method)
   * @param options Steam Web Api request query parameters
   */
  private resolveRequestConfig(
    options: iSteamWebApiOptions
  ): AxiosRequestConfig {
    // AxiosRequestConfig object
    const requestConfig: AxiosRequestConfig = {};

    // Pass key as iSteamWebApiOptions option
    options.key = this.apiKey;

    // Cors proxy
    requestConfig.baseURL =
      this.proxy.length > 0
        ? `${this.proxy}${this.STEAM_WEB_API_URL}`
        : this.STEAM_WEB_API_URL;

    // Creating axios params
    requestConfig.params = new URLSearchParams(Object.entries(options));

    return requestConfig;
  }
}

export default Fetcher;

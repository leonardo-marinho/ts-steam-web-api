import axios, { AxiosError, AxiosResponse } from 'axios';
import { iSteamWebApiOptions } from '@/core/interfaces';
import { tSteamWebApiMethods } from '@/core/types';

/**
 * Steam Web Api data fetcher
 */
class Fetcher {
  /**
   * Url da Steam Web Api
   */
  private readonly STEAM_WEB_API_URL = 'http://api.steampowered.com';

  /**
   * Cors Anywhere Proxy
   * A service from https://cors-anywhere.herokuapp.com/
   */
  private readonly CORS_ANYWHERE_PROXY_URL: string =
    'https://cors-anywhere.herokuapp.com/';

  /**
   * Private user steam web api key
   */
  private apiKey: string;

  /**
   * Use the proxy flag
   */
  public useCorsAnywhereProxy = false;

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
    let response: AxiosResponse<T>;

    await axios
      .get(this.parseUrl(method, options))
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
  private parseUrl(
    method: tSteamWebApiMethods,
    options: iSteamWebApiOptions
  ): string {
    options.key = this.apiKey;
    return `${this.STEAM_WEB_API_URL}/${method}/?${this.convertOptionsToQuery(
      options
    )}`;
  }
}

export default Fetcher;

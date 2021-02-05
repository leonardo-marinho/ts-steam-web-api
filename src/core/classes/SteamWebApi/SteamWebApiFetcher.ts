import axios from 'axios';
import {
  iSteamWebApiFetcherResponse,
  iSteamWebApiOptions,
} from '@/core/interfaces/SteamWebApi';
import { tSteamWebApiMethods } from '@/core/types';

/**
 * Steam's player summaries version 2
 * Steam Documentation: https://developer.valvesoftware.com/wiki/Steam_Web_API#GetPlayerSummaries_.28v0002.29
 */
class SteamWebApiFetcher {
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
   * @param options Steam Web Api request query parameters
   */
  private convertOptionsToQuery(options: iSteamWebApiOptions): string {
    return Object.entries(options).join('&').replace(new RegExp(',', 'g'), '=');
  }

  /**
   * Fetch json from Steam web api
   *
   * @param method Methods available on Steam Web Api (https://developer.valvesoftware.com/wiki/Steam_Web_API#Interfaces_and_method)
   * @param options Steam Web Api request query parameters
   */
  public async fetch<T>(
    method: tSteamWebApiMethods,
    options: iSteamWebApiOptions
  ): Promise<iSteamWebApiFetcherResponse<T>> {
    options.key = this.apiKey;
    const query = this.convertOptionsToQuery(options);

    const url = `${this.STEAM_WEB_API_URL}/${method}/?${query}`;

    console.log(url);

    const response = await axios.get(
      this.useCorsAnywhereProxy
        ? `${this.CORS_ANYWHERE_PROXY_URL}/${url}`
        : `${url}`
    );

    const status = response.status;

    return {
      status: status,
      useCorsAnywhereProxy: this.useCorsAnywhereProxy,
      url: url,
      query: query,
      body:
        status === 200
          ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            (response.data as T)
          : ({} as T),
    };
  }
}

export default SteamWebApiFetcher;

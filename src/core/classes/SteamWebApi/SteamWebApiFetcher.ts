import axios from 'axios';
import {
  iSteamWebApiFetcherResponse,
  iSteamWebApiOptions
} from '@/core/interfaces';
import { tSteamWebApiMethods } from '@/core/types';

/**
 * Steam's player summaries version 2
 * Steam Documentation: https://developer.valvesoftware.com/wiki/Steam_Web_API#GetPlayerSummaries_.28v0002.29
 */
class SteamWebApiFetcher {
  /**
   * Url da Steam Web Api
   */
  private STEAM_WEB_API_URL = 'http://api.steampowered.com';

  /**
   * Proxy
   */
  proxy = '';

  /**
   * Convert iSteamWebApiOptions type to Steam web api url query string
   * @param options Steam Web Api request query parameters
   */
  convertOptionsToQuery(options: iSteamWebApiOptions): string {
    return Object.entries(options)
      .join('&')
      .replace(new RegExp(',', 'g'), '=');
  }

  /**
   * Fetch json from Steam web api
   *
   * @param method Methods available on Steam Web Api (https://developer.valvesoftware.com/wiki/Steam_Web_API#Interfaces_and_method)
   * @param options Steam Web Api request query parameters
   */
  async fetch<T>(
    method: tSteamWebApiMethods,
    options: iSteamWebApiOptions
  ): Promise<iSteamWebApiFetcherResponse<T>> {
    const query = this.convertOptionsToQuery(options);
    console.log(
      `URL: ${this.proxy}${this.STEAM_WEB_API_URL}/${method}/?${query}`
    );
    const response = await axios.get(
      `${this.proxy}${this.STEAM_WEB_API_URL}/${method}/?${query}`
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const status = response.status;

    return {
      status: status,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      body: status === 200 ? (response.data.response.players as T) : ({} as T),
      query: query
    };
  }
}

export default SteamWebApiFetcher;

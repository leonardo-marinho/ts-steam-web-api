/**
 * Steam Web Api fetcher response
 */
export default interface iSteamWebApiFetcherResponse<T> {
  status: number;
  useCorsAnywhereProxy: boolean;
  url: string;
  query: string;
  body: T;
}

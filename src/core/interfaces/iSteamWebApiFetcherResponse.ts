/**
 * Steam Web Api fetcher response
 */
export default interface iSteamWebApiFetcherResponse<T> {
  status: number;
  query: string;
  body: T;
}

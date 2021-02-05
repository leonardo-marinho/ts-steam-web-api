/**
 * Steam Api, template class, data manager
 */
class SteamWebApiData<T> {
  /**
   * Steam Api data
   */
  protected data: T;

  /**
   * Class constructor
   */
  constructor(data?: T) {
    this.data = !!data ? data : ({} as T);
  }

  /**
   * Returns data as JSON
   */
  json(): T {
    return this.data;
  }

  /**
   * Returns data as string
   */
  stringfy(): string {
    return JSON.stringify(this.data);
  }
}

export default SteamWebApiData;

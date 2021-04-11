/**
 * Steam Web Api request query parameters
 */
export default interface iSteamWebApiOption {
  /**
   * Steam unique user web api key
   */
  key?: string;

  /**
   * Steam product id (ex: 420 stands for Team Fortress 2, 4000 for Garry's Mod).
   * Search in https://steamdb.info/
   */
  appId?: string;

  /**
   * Max number of elements to return.
   * Ex, if you request the most recent games of a player, you can specify the max number of games to be retrivied with the property count
   */
  count?: number;

  /**
   * Specify if extra data should be retrived (game name, logo and image).
   * Exclusive to method OwnedGames
   */
  include_appinfo?: boolean;

  /**
   * Specify if free games owned by the user should be retrived.
   * Exclusive to method OwnedGames
   */
  include_played_free_games?: boolean;

  /**
   * Language of the retrivied data.
   * \* No effect. Not implemented yet.
   * Exclusive to methods UserStatsForGame and PlayerAchievements
   */
  l?: string;

  /**
   * Relationship filter
   * Exclusive to method FriendList
   */
  relationship?: 'all' | 'friend';

  /**
   * 64 bit Steam ID of player
   */
  steamid?: string;

  /**
   * Array of 64 bit Steam ID of player
   * Exclusive to method PlayerSummaries
   */
  steamids?: Array<string>;
}

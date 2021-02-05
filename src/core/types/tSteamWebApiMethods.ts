/**
 * Methods available on Steam Web Api
 */
type tSteamWebApiMethods =
  | 'ISteamUser/GetPlayerSummaries/v0002'
  | 'ISteamUser/GetFriendList/v0001'
  | 'ISteamUserStats/GetPlayerAchievements/v0001'
  | 'ISteamUserStats/GetUserStatsForGame/v0002'
  | 'IPlayerService/GetOwnedGames/v0001'
  | 'IPlayerService/GetRecentlyPlayedGames/v0001';

export default tSteamWebApiMethods;

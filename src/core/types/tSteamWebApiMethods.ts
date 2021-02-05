/**
 * Methods available on Steam Web Api
 */
type tSteamWebApiMethods =
  | 'ISteamNews/GetNewsForApp/v0002'
  | 'ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002'
  | 'ISteamUser/GetPlayerSummaries/v0002'
  | 'ISteamUser/GetFriendList/v0001'
  | 'ISteamUserStats/GetPlayerAchievements/v0001'
  | 'ISteamUserStats/GetUserStatsForGame/v0002'
  | 'IPlayerService/GetOwnedGames/v0001'
  | 'IPlayerService/GetRecentlyPlayedGames/v0001';

export default tSteamWebApiMethods;

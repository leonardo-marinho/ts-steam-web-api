// Classes
import { SteamWebApi } from '@/core/classes';
// Interfaces
import { iSteamWebApi } from '@/core/interfaces';
// Types
import * as Types from '@/core/types';

const routine = async (): Promise<void> => {
  const key = 'FBD7FBEFA49EDA350FF07987F43B919C';
  const fetcher = new SteamWebApi.Fetcher(key);

  fetcher.useCorsAnywhereProxy = false;

  // OK
  const playersSummary = await fetcher.fetch<iSteamWebApi.iPlayerSummariesV2>(
    'ISteamUser/GetPlayerSummaries/v0002',
    {
      steamids: ['76561198066950386'],
    } as iSteamWebApi.iSteamWebApiOptions
  );

  // OK
  const playerFriends = await fetcher.fetch<iSteamWebApi.iFriendListV2>(
    'ISteamUser/GetFriendList/v0001',
    {
      steamid: '76561198066950386',
    } as iSteamWebApi.iSteamWebApiOptions
  );

  // OK
  const playerAchievements = await fetcher.fetch<iSteamWebApi.iPlayerAchievementsV1>(
    'ISteamUserStats/GetPlayerAchievements/v0001',
    {
      steamid: '76561198066950386',
      appId: '440',
    } as iSteamWebApi.iSteamWebApiOptions
  );

  // OK
  const playerOwnedGames = await fetcher.fetch<iSteamWebApi.iOwnedGames>(
    'IPlayerService/GetOwnedGames/v0001',
    {
      steamid: '76561198066950386',
      include_appinfo: false,
      include_played_free_games: true,
    } as iSteamWebApi.iSteamWebApiOptions
  );

  // OK
  const playerStatsForGame = await fetcher.fetch<iSteamWebApi.iUserStatsForGameV2>(
    'ISteamUserStats/GetUserStatsForGame/v0002',
    {
      steamid: '76561198066950386',
      appId: '440',
    } as iSteamWebApi.iSteamWebApiOptions
  );

  // OK
  const playerRecentlyPlayedGames = await fetcher.fetch<iSteamWebApi.iRecentlyPlayedGamesV1>(
    'IPlayerService/GetRecentlyPlayedGames/v0001',
    {
      steamid: '76561198066950386',
      count: 10,
    } as iSteamWebApi.iSteamWebApiOptions
  );
};

void routine();

export { SteamWebApi, iSteamWebApi, Types };

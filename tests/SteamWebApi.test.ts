import dotenv from 'dotenv';
import SteamWebApiFetcher from '../src/core/classes/SteamWebApi/Fetcher';
import { iSteamWebApi } from '@/core/interfaces';

<<<<<<< HEAD
dotenv.config();

const key = process.env.STEAM_WEB_API_KEY;
=======
const key = 'KEY';
>>>>>>> be7aaf2b981036dded75845d8fc505a83e7596eb
const fetcher = new SteamWebApiFetcher(key);
fetcher.useCorsAnywhereProxy = false;

test('Fetch players summaries', async () => {
  const response = await fetcher.fetch<iSteamWebApi.iPlayerSummariesV2>(
    'ISteamUser/GetPlayerSummaries/v0002',
    {
      steamids: ['76561198066950386'],
    } as iSteamWebApi.iSteamWebApiOptions
  );

  expect(response.status).toBe(200);
});

test('Fetch player friends', async () => {
  const response = await fetcher.fetch<iSteamWebApi.iFriendListV2>(
    'ISteamUser/GetFriendList/v0001',
    {
      steamid: '76561198066950386',
    } as iSteamWebApi.iSteamWebApiOptions
  );

  expect(response.status).toBe(200);
});

test('Fetch player achievements', async () => {
  const response = await fetcher.fetch<iSteamWebApi.iPlayerAchievementsV1>(
    'ISteamUserStats/GetPlayerAchievements/v0001',
    {
      steamid: '76561198066950386',
      appId: '440',
    } as iSteamWebApi.iSteamWebApiOptions
  );

  expect(response.status).toBe(200);
});

test('Fetch player owned games', async () => {
  const response = await fetcher.fetch<iSteamWebApi.iOwnedGames>(
    'IPlayerService/GetOwnedGames/v0001',
    {
      steamid: '76561198066950386',
      include_appinfo: false,
      include_played_free_games: true,
    } as iSteamWebApi.iSteamWebApiOptions
  );

  expect(response.status).toBe(200);
});

test('Fetch player stats for game', async () => {
  const response = await fetcher.fetch<iSteamWebApi.iUserStatsForGameV2>(
    'ISteamUserStats/GetUserStatsForGame/v0002',
    {
      steamid: '76561198066950386',
      appId: '440',
    } as iSteamWebApi.iSteamWebApiOptions
  );

  expect(response.status).toBe(200);
});

test('Fetch player recently played games', async () => {
  const response = await fetcher.fetch<iSteamWebApi.iRecentlyPlayedGamesV1>(
    'IPlayerService/GetRecentlyPlayedGames/v0001',
    {
      steamid: '76561198066950386',
      count: 10,
    } as iSteamWebApi.iSteamWebApiOptions
  );

  expect(response.status).toBe(200);
});

test('Fetch players summaries with missing query options', async () => {
  const response = await fetcher.fetch<iSteamWebApi.iPlayerSummariesV2>(
    'ISteamUser/GetPlayerSummaries/v0002',
    {} as iSteamWebApi.iSteamWebApiOptions
  );

  expect(response.status).toBe(400);
});

test('Fetch players summaries with wrong key', async () => {
  const key_wrong = 'FBD7FBEFA49EDA350FF07987F43B9';
  const fetcher_wrong = new SteamWebApiFetcher(key_wrong);
  fetcher.useCorsAnywhereProxy = false;

  const response = await fetcher_wrong.fetch<iSteamWebApi.iPlayerSummariesV2>(
    'ISteamUser/GetPlayerSummaries/v0002',
    {
      steamids: ['76561198066950386'],
    } as iSteamWebApi.iSteamWebApiOptions
  );

  expect(response.status).toBe(403);
});

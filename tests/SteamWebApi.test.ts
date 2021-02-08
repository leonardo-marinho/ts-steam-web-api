import { AxiosResponse } from 'axios';
import dotenv from 'dotenv';
import SteamWebApiFetcher from '../src/core/Fetcher';
import * as iSteamWebApi from '@/core/interfaces';
import { tSteam64Id } from '@/core/types';

dotenv.config();
const key = process.env.STEAM_WEB_API_KEY;

const steam_id: tSteam64Id = '76561198066950386';

const fetcher = new SteamWebApiFetcher(key);
fetcher.useCorsAnywhereProxy = false;

test('Fetch players summaries', async () => {
  const response = await fetcher.fetch<iSteamWebApi.iPlayerSummariesV2>(
    'ISteamUser/GetPlayerSummaries/v0002',
    {
      steamids: [steam_id],
    }
  );

  expect(response.status).toBe(200);
});

test('Fetch player friends', async () => {
  const response = await fetcher.fetch<iSteamWebApi.iFriendListV2>(
    'ISteamUser/GetFriendList/v0001',
    {
      steamid: steam_id,
    }
  );

  expect(response.status).toBe(200);
});

test('Fetch player achievements', async () => {
  const response = await fetcher.fetch<iSteamWebApi.iPlayerAchievementsV1>(
    'ISteamUserStats/GetPlayerAchievements/v0001',
    {
      steamid: steam_id,
      appId: '440',
    }
  );

  expect(response.status).toBe(200);
});

test('Fetch player owned games', async () => {
  const response = await fetcher.fetch<iSteamWebApi.iOwnedGames>(
    'IPlayerService/GetOwnedGames/v0001',
    {
      steamid: steam_id,
      include_appinfo: false,
      include_played_free_games: true,
    }
  );

  expect(response.status).toBe(200);
});

test('Fetch player stats for game', async () => {
  const response = await fetcher.fetch<iSteamWebApi.iUserStatsForGameV2>(
    'ISteamUserStats/GetUserStatsForGame/v0002',
    {
      steamid: steam_id,
      appId: '440',
    }
  );

  expect(response.status).toBe(200);
});

test('Fetch player recently played games', async () => {
  const response = await fetcher.fetch<iSteamWebApi.iRecentlyPlayedGamesV1>(
    'IPlayerService/GetRecentlyPlayedGames/v0001',
    {
      steamid: steam_id,
      count: 10,
    }
  );

  expect(response.status).toBe(200);
});

test('Fetch with callback', async () => {
  let response: AxiosResponse<iSteamWebApi.iPlayerSummariesV2>;

  await fetcher.fetch<iSteamWebApi.iPlayerSummariesV2>(
    'ISteamUser/GetPlayerSummaries/v0002',
    {
      steamids: ['76561198066950'],
    },
  ).then(
    (res) => (response = res));


  expect(response.status).toBe(200);
});

test('Fetch players summaries with missing query options', async () => {
  const response = await fetcher.fetch<iSteamWebApi.iPlayerSummariesV2>(
    'ISteamUser/GetPlayerSummaries/v0002',
    {}
  );

  expect(response.status).toBe(400);
});

test('Fetch players summaries with wrong key', async () => {
  const key_wrong = 'some_wrong_key';
  const fetcher_wrong = new SteamWebApiFetcher(key_wrong);
  fetcher.useCorsAnywhereProxy = false;

  const response = await fetcher_wrong.fetch<iSteamWebApi.iPlayerSummariesV2>(
    'ISteamUser/GetPlayerSummaries/v0002',
    {
      steamids: [steam_id],
    }
  );

  expect(response.status).toBe(403);
});

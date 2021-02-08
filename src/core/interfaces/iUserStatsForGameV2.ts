import { tSteam64Id } from '@/core/types';

/**
 * UserStatsForGame method properties interface
 * https://developer.valvesoftware.com/wiki/Steam_Web_API#GetUserStatsForGame_.28v0002.29
 *
 */
export default interface iUserStatsForGameV2 {
  playerstats: {
    steamID: tSteam64Id;
    gameName: string;
    stats: Array<{
      name: string;
      value: number;
    }>;
  };
}

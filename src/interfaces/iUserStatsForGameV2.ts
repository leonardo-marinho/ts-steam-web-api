/**
 * UserStatsForGame method properties interface
 * https://developer.valvesoftware.com/wiki/Steam_Web_API#GetUserStatsForGame_.28v0002.29
 *
 */
export default interface iUserStatsForGameV2 {
  playerstats: {
    steamID: string;
    gameName: string;
    stats: Array<{
      name: string;
      value: number;
    }>;
  };
}

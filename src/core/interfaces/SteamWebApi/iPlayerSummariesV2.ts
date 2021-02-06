import { tSteam64Id } from '@/core/types';

/**
 * PlayerSummariesV2 method properties interface
 * https://developer.valvesoftware.com/wiki/Steam_Web_API#GetPlayerSummaries_.28v0002.29
 */
export default interface iPlayerSummariesV2 {
  response: {
    players: Array<{
      steamid: tSteam64Id;
      communityvisibilitystate: string;
      profilestate: string;
      personaname: string;
      profileurl: string;
      avatar: string;
      avatarmedium: string;
      avatarfull: string;
      avatarhash: string;
      personastate: string;
      realname: string;
      primaryclanid: string;
      timecreated: string;
      personastateflags: string;
      loccountrycode: string;
      locstatecode: string;
      loccityid: string;
    }>;
  };
}

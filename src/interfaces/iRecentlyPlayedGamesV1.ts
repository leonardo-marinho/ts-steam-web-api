/**
 * RecentlyPlayedGames method properties interface
 * https://developer.valvesoftware.com/wiki/Steam_Web_API#GetRecentlyPlayedGames_.28v0001.29
 *
 */
export default interface iFriendListV2 {
  response: {
    total_count: number;
    games: Array<{
      appid: number;
      name: string;
      playtime_2weeks: number;
      playtime_forever: number;
      img_icon_url: string;
      img_logo_url: string;
      playtime_windows_forever: number;
      playtime_mac_forever: number;
      playtime_linux_forever: number;
    }>;
  };
}

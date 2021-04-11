/**
 * OwnedGames method properties interface
 * https://developer.valvesoftware.com/wiki/Steam_Web_API#GetOwnedGames_.28v0001.29
 *
 */
export default interface iOwnedGamesV1 {
  response: {
    game_count: number;
    games: Array<{
      appid: number;
      name?: string;
      img_icon_url?: string;
      img_logo_url?: string;
      playtime_forever: number;
      playtime_windows_forever: number;
      playtime_mac_forever: number;
      playtime_linux_forever: number;
    }>;
  };
}

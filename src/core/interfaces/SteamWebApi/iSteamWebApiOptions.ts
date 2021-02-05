import { tSteam64Id } from '@/core/types';

/**
 * Steam Web Api request query parameters
 */
export default interface iSteamWebApiOption {
  key?: string;
  appId?: string;
  count?: number;
  include_appinfo?: boolean;
  include_played_free_games?: boolean;
  language?: string;
  maxLength?: number;
  relationship?: 'all' | 'friend';
  steamid?: tSteam64Id;
  steamids?: Array<tSteam64Id>;
}

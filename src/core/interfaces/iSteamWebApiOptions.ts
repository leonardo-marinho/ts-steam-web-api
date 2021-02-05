import { tSteam64Id } from '@/core/types';

/**
 * Steam Web Api request query parameters
 */
export default interface iSteamWebApiOption {
  key: string;
  appId?: string;
  count?: number;
  includeAppInfo?: boolean;
  includePlayedFreeGames?: boolean;
  language?: string;
  maxLength?: number;
  relationship?: 'all' | 'friend';
  steamiId?: tSteam64Id;
  steamids?: Array<tSteam64Id>;
}

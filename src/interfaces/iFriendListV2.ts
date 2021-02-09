import { tSteam64Id } from '@/types';

/**
 * FriendList method properties interface
 * https://developer.valvesoftware.com/wiki/Steam_Web_API#GetFriendList_.28v0001.29
 *
 */
export default interface iFriendListV2 {
  friendslist: {
    friends: Array<{
      steamid: tSteam64Id;
      relationship: string;
      friend_since: string;
    }>;
  };
}

/**
 * FriendList method properties interface
 * https://developer.valvesoftware.com/wiki/Steam_Web_API#GetFriendList_.28v0001.29
 *
 */
export default interface iFriendListV2 {
  friendslist: {
    friends: Array<{
      steamid: string;
      relationship: string;
      friend_since: string;
    }>;
  };
}

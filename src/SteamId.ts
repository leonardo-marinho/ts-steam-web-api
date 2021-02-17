/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import Long from 'long';

/**
 * Exception case Steam Id passed is not valid (not in the idTypes (enum))
 */
const EXCEPTION_ERROR_UNKNOWN_ID_TYPE =
  'Unknown ID type. Provide any of these types: Steam ID | ID3 | 32 bits ID | 64 bits ID | 64 bits ID hex';

/**
 * 64 bits conversion number
 */
const CONVERSION_64_TO_32_NUMBER = '76561197960265728';

/**
 * Types of Steam ids
 */
export enum idTypes {
  unknown,
  raw,
  id3,
  id32,
  id64,
}

/**
 * Account types
 * For more info: https://developer.valvesoftware.com/wiki/SteamID
 *
 */
const ACCOUNT_TYPES = [
  'I',
  'U',
  'M',
  'G',
  'A',
  'P',
  'C',
  'g',
  'T/L/c',
  '',
  'a',
];

/**
 * SteamId class
 */
class SteamId {
  /**
   * Calculate account number
   *
   * @param id 64 bits id of player
   */
  static calculateAccountNumberFrom64Id(id: string): number {
    // Calculation of account number: (32 bits id - id digit) / 2
    return Long.fromString(SteamId.convertSteam64IdTo32Id(id))
      .sub(SteamId.calculateIdDigitFrom64Id(id))
      .div(2)
      .toInt();
  }

  /**
   * Calculate id digit
   *
   * @param steamId64 64 bits id of player
   */
  static calculateIdDigitFrom64Id(id: string): number {
    // Calculation of id digit by checking the lowest bit
    return +Long.fromString(id).isOdd();
  }

  /**
   * Calculate Steam 32 bits Id from digit and account number
   * For more info: https://developer.valvesoftware.com/wiki/SteamID
   *
   * @param digit Digit of the account
   * @param account Account number
   */
  static calculateSteam32Id(digit: number, account: number): string {
    // Calculation of 32 bits id from account and digit
    return `${account * 2 + digit}`;
  }

  /**
   * Calculate type
   *
   * @param id 64 bits id of player
   */
  static calculateTypeFrom64Id(id: string): number {
    // Calculate type by checking the 2nd half high byte
    return Long.fromString(id).toBytes()[2] >> 4;
  }

  /**
   * Calculate account universe
   *
   * @param id 64 bits id of player
   */
  static calculateUniverseFrom64Id(id: string): number {
    // Calculate universe by checking the first 64 bits id byte
    return Long.fromString(id).toBytes()[0];
  }

  /**
   * Convert any id to Steam 64 bits Id
   *
   * @param id Id of any kind
   */
  static convertSteamIdTo64Id(id: string): string {
    // Digit from account
    const digit = parseInt(id.slice(8, 9));

    // Account number
    const account = parseInt(id.slice(10, 18));

    // Creation of steam 32 bits id from digit and account number
    const steam32Id = SteamId.calculateSteam32Id(digit, account);

    // Conversion from 32 bits to 64 bits
    return SteamId.convertSteam32IdTo64Id(steam32Id);
  }

  /**
   * Convert id3 to 32 bits id
   *
   * @param id id3
   */
  static convertSteamId3To32Id(id: string): string {
    // Conversion from id3 to 32 bits id
    return id.replace('U:1:', '');
  }

  /**
   * Convert id3 to 64 bits id
   *
   * @param id id3
   */
  static convertSteamId3To64Id(id: string): string {
    // Conversion from id3 to 32 bits id
    const steam32Id = SteamId.convertSteamId3To32Id(id);

    // Conversion from id32 to 64 bits id
    return SteamId.convertSteam32IdTo64Id(steam32Id);
  }

  /**
   * Convert 32 bits id to id3
   *
   * @param id 32 bits id
   * @param universe Universes of Steam accounts
   * @param type Type of Steam accounts
   */
  static convertSteam32IdToId3(id: string, universe = 1, type = 1): string {
    // Resolving the type acronym
    const acronym = SteamId.resolveTypeAcronym(type);

    // Creation of id3
    return `${acronym}:${universe}:${id}`;
  }

  /**
   * Convert 32 bits id to 64 bits id
   *
   * @param id 32 bits id
   * @param universe Universes of Steam accounts
   * @param type Type of Steam accounts
   * @param instance Instance of Steam accounts
   */
  static convertSteam32IdTo64Id(id: string, type = 1, instance = 1): string {
    // Calculation of 64 bit id
    const old64Id = Long.fromString(id)
      .add(CONVERSION_64_TO_32_NUMBER)
      .toString();

    // Decomposition from long to byte array
    const new64IdBytes = Long.fromString(old64Id).toBytes();

    // Apply of type value
    new64IdBytes[1] = type << 4;

    // Apply of instance value
    new64IdBytes[3] = instance;

    // New id (byte array) to string
    return Long.fromBytes(new64IdBytes).toString();
  }

  /**
   * Convert 64 bits id to id
   *
   * @param id 64 bits id
   */

  static convertSteam64IdToId(id: string): string {
    // Account number from account
    const account = SteamId.calculateAccountNumberFrom64Id(id);

    // Digit from account
    const digit = SteamId.calculateIdDigitFrom64Id(id);

    // Creation of Steam Id
    return `STEAM_0:${digit}:${account}`;
  }

  /**
   * Convert 64 bits id to id3
   *
   * @param id 64 bits id
   */
  static convertSteam64IdToId3(id: string): string {
    // Calculation of universe
    const universe = SteamId.calculateUniverseFrom64Id(id);

    // Calculation of type
    const type = SteamId.calculateTypeFrom64Id(id);

    // Conversion from 64 bits id to 32 bits id
    const steam32Id = SteamId.convertSteam64IdTo32Id(id);

    // Creation of id3
    return SteamId.convertSteam32IdToId3(steam32Id, universe, type);
  }

  /**
   * Convert 64 bits id to 32 bits id
   *
   * @param id 64 bits id
   */
  static convertSteam64IdTo32Id(id: string): string {
    // Conversion from 64 bits id to 32 bits id: 64 bits id - 76561197960265728
    return Long.fromString(id).sub(CONVERSION_64_TO_32_NUMBER).toString();
  }

  /**
   * Convert Steam Id 64 to Steam Id 64 Hex
   *
   * @param steamId64 Steamid64 of player
   */
  static convertSteamId64ToSteamId64Hex(id: string): string {
    // Convert to hex
    return SteamId.convertToHex(id);
  }

  /**
   * Convert any number to hex
   *
   * @param value Number as string
   */
  private static convertToHex(value: string | number): string {
    const longValue =
      typeof value === 'string' ? Long.fromString(value) : new Long(value);

    return Array.from(longValue.toBytes(), (byte, index) => {
      let hex = (byte & 0xff).toString(16);

      if (index !== 0) {
        hex.length === 1 && (hex = `0${hex}`);
        hex === '0' && (hex = `00`);
      }

      return hex;
    }).join('');
  }

  /**
   * Convert any id to Steam Id
   *
   * @param id Id of any kind
   * @param idType Optional type of the id
   */
  static convertToSteamId(id: string, idType?: idTypes): string {
    // Detect id type if not passed as parameter
    !!!idType && (idType = SteamId.detectType(id));

    // If passed id already is of expected type, returns id
    if (idType === idTypes.raw) return id;

    // Conversion from given id type to 64 bits id
    const id64 = SteamId.convertToSteam64Id(id);

    // Conversion from 64 bits id to id
    return SteamId.convertSteam64IdToId(id64);
  }

  /**
   * Convert any id to Steam Id3
   *
   * @param id Id of any kind
   * @param idType Optional type of the id
   */
  static convertToSteamId3(id: string, idType?: idTypes): string {
    // Detect id type if not passed as parameter
    !!!idType && (idType = SteamId.detectType(id));

    // If passed id already is of expected type, returns id
    if (idType === idTypes.id3) return id;

    // Conversion from given id type to 64 bits id
    const id32 = SteamId.convertToSteam32Id(id);

    // Conversion from 64 bits id to 32 bits id
    return SteamId.convertSteam32IdToId3(id32);
  }

  /**
   * Convert any id to Steam 32 bits Id
   *
   * @param id Id of any kind
   * @param idType Optional type of the id
   */
  static convertToSteam32Id(id: string, idType?: idTypes): string {
    // Detect id type if not passed as parameter
    !!!idType && (idType = SteamId.detectType(id));

    // If passed id already is of expected type, returns id
    if (idType === idTypes.id32) return id;

    // Conversion from given id type to 64 bits id
    const id64 = SteamId.convertToSteam64Id(id);

    // Conversion from 64 bits id to 32 bits id
    return SteamId.convertSteam64IdTo32Id(id64);
  }

  /**
   * Convert any id to Steam 64 bits Id
   *
   * @param id Id of any kind
   * @param idType Optional type of the id
   */
  static convertToSteam64Id(id: string, idType?: idTypes): string {
    // Detect id type if not passed as parameter
    !!!idType && (idType = SteamId.detectType(id));

    // If already 64, return id
    if (idType === idTypes.id64) return id;
    // If Steam Id type
    else if (idType === idTypes.raw) return SteamId.convertSteamIdTo64Id(id);
    // If Steam Id3 type
    else if (idType === idTypes.id3) return SteamId.convertSteamId3To64Id(id);
    // If Steam 32 bits Id type
    else if (idType === idTypes.id32) return SteamId.convertSteam32IdTo64Id(id);
  }

  /**
   * Detect a Steam Id type
   *
   * @param id Id of any kind to be resolved
   */
  static detectType(id: string): idTypes {
    // Validation of 64 bits id
    if (id.length === 17) return idTypes.id64;
    // Validation if 32 bits id
    else if (id.length === 9 && !isNaN(id as any)) return idTypes.id32;
    // Validation of id3
    else if (
      id.search(':') > -1 &&
      id.search('STEAM_') == -1 &&
      isNaN(id as any)
    )
      return idTypes.id3;
    // Validation of id raw
    else if (id.search('STEAM_') > -1) return idTypes.raw;

    // If any is valid, throw error
    throw EXCEPTION_ERROR_UNKNOWN_ID_TYPE;
  }

  /**
   * Resolve the account type acronum
   * For more info: https://developer.valvesoftware.com/wiki/SteamID
   *
   * @param type Account type
   */
  static resolveTypeAcronym(type: number): string {
    // Retrieve from const ACCOUNT_TYPE
    return ACCOUNT_TYPES[type];
  }
}

export default SteamId;

import SteamId, { idTypes } from '../src/SteamId';

const steamId = {
  raw: 'STEAM_0:0:53342329',
  id3: 'U:1:106684658',
  id32: '106684658',
  id64: '76561198066950386',
};

test('Detect id as Steam Id', () =>
  expect(SteamId.detectType(steamId.raw)).toBe(idTypes.raw));

test('Detect id as Steam Id3', () =>
  expect(SteamId.detectType(steamId.id3)).toBe(idTypes.id3));

test('Detect id as Steam 32 bits Id', () =>
  expect(SteamId.detectType(steamId.id32)).toBe(idTypes.id32));

test('Detect id as Steam 64 bits Id', () =>
  expect(SteamId.detectType(steamId.id64)).toBe(idTypes.id64));

test('Convert raw to raw', () =>
  expect(SteamId.convertToSteamId(steamId.raw)).toBe(steamId.raw));

test('Convert id3 to raw', () =>
  expect(SteamId.convertToSteamId(steamId.id3)).toBe(steamId.raw));

test('Convert id32 to raw', () =>
  expect(SteamId.convertToSteamId(steamId.id32)).toBe(steamId.raw));

test('Convert id64 to raw', () =>
  expect(SteamId.convertToSteamId(steamId.id64)).toBe(steamId.raw));

test('Convert raw to id3', () =>
  expect(SteamId.convertToSteamId3(steamId.raw)).toBe(steamId.id3));

test('Convert id3 to id3', () =>
  expect(SteamId.convertToSteamId3(steamId.id3)).toBe(steamId.id3));

test('Convert id32 to id3', () =>
  expect(SteamId.convertToSteamId3(steamId.id32)).toBe(steamId.id3));

test('Convert id64 to id3', () =>
  expect(SteamId.convertToSteamId3(steamId.id64)).toBe(steamId.id3));

test('Convert raw to id32', () =>
  expect(SteamId.convertToSteam32Id(steamId.raw)).toBe(steamId.id32));

test('Convert id3 to id32', () =>
  expect(SteamId.convertToSteam32Id(steamId.id3)).toBe(steamId.id32));

test('Convert id32 to id32', () =>
  expect(SteamId.convertToSteam32Id(steamId.id32)).toBe(steamId.id32));

test('Convert id64 to id32', () =>
  expect(SteamId.convertToSteam32Id(steamId.id64)).toBe(steamId.id32));

test('Convert raw to id64', () =>
  expect(SteamId.convertToSteam64Id(steamId.raw)).toBe(steamId.id64));

test('Convert id3 to id64', () =>
  expect(SteamId.convertToSteam64Id(steamId.id3)).toBe(steamId.id64));

test('Convert id32 to id64', () =>
  expect(SteamId.convertToSteam64Id(steamId.id32)).toBe(steamId.id64));

test('Convert id64 to id64', () =>
  expect(SteamId.convertToSteam64Id(steamId.id64)).toBe(steamId.id64));

// test('Calculate account number', () => {
//   expect(SteamId.calculateAccountNumber(steamId64)).toBe(53342329);
// });

// test('Calculate Id digit', () => {
//   expect(SteamId.calculateIdDigit(steamId64)).toBe(0);
// });

// test('Calculate universe', () => {
//   expect(SteamId.calculateUniverse(steamId64)).toBe(1);
// });

// test('Convert Steam Id', () => {
//   expect(SteamId.convertSteamId64ToSteamId(steamId64)).toBe(
//     'STEAM_0:0:53342329'
//   );
// });

// test('Convert Steam Id 3', () => {
//   expect(SteamId.convertSteamId64ToSteamId3(steamId64)).toBe('U:1:106684658');
// });

// test('Convert Steam Id 32', () => {
//   expect(SteamId.convertSteamId64ToSteamId32(steamId64)).toBe(106684658);
// });
// test('Convert Steam Id 64 Hex', () => {
//   expect(SteamId.convertSteamId64ToSteamId64Hex(steamId64)).toBe(
//     '1100001065be0f2'
//   );
// });

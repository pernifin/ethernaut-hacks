// Import all files within the attacks directory

const fallback = require('./1_fallback');
const fallout = require('./2_fallout');
const coinflip = require('./3_coinflip');
const gateKeeperOne = require('./13_gatekeeper_one');
const gateKeeperTwo = require('./14_gatekeeper_two');
const naughtCoin = require('./15_naught_coin');
const preservation = require('./16_preservation');
const recovery = require('./17_recovery');
const magicNumber = require('./18_magic_number');
const alienCodex = require('./19_alien_codex');
const denial = require('./20_denial');
const shop = require('./21_shop');
const dex = require('./22_dex');
const dexTwo = require('./23_dex_two');
const puzzleWallet = require('./24_puzzle_wallet');
const motorbike = require('./25_motorbike');
const doubleEntryPoint = require('./26_double_entry_point');
const goodSamaritan = require('./27_good_samaritan');
const gateKeeperThree = require('./28_gatekeeper_three');

module.exports = {
  'Fallback': fallback,
  'Fallout': fallout,
  'Coin Flip': coinflip,
  'Gatekeeper One': gateKeeperOne,
  'Gatekeeper Two': gateKeeperTwo,
  'Naught Coin': naughtCoin,
  'Preservation': preservation,
  'Recovery': recovery,
  'MagicNumber': magicNumber,
  'Alien Codex': alienCodex,
  'Denial': denial,
  'Shop': shop,
  'Dex': dex,
  'Dex Two': dexTwo,
  'Puzzle Wallet': puzzleWallet,
  'Motorbike': motorbike,
  'DoubleEntryPoint': doubleEntryPoint,
  'Good Samaritan': goodSamaritan,
  'Gatekeeper Three': gateKeeperThree,
};

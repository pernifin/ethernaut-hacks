const { task } = require('hardhat/config');
const config = require('../config/ethernaut.sepolia');
const attacks = require('./attacks');
const ethernaut = require('./ethernaut');

task('solve', 'Solve a level')
  .addParam('level', 'Level ID')
  .setAction(async ({ level }, { ethers }) => {
    const lvlRecord = config.levels.find(lvl => lvl.idx === Number(level));
    if (!lvlRecord || !attacks[lvlRecord.name]) {
      console.error('Invalid level id');
      return;
    }

    try {
      const attack = attacks[lvlRecord.name];
      const result = await attack({
        ethernaut: ethernaut(ethers, config, lvlRecord),
        ethers,
        config
      });
      console.log('success: ', !!result);
    } catch (error) {
      console.error(error);
    }
  });

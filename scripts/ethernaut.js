const debug = require('debug')('ethernaut');
const config = require('../config/ethernaut.sepolia');

const ethernautABI = [
  {
    name: 'createLevelInstance',
    type: 'function',
    inputs: [
      {
        type: 'address',
        name: '_level',
      }
    ],
  },
  {
    name: 'submitLevelInstance',
    type: 'function',
    inputs: [
      {
        type: 'address',
        name: '_instance',
      }
    ],
  },
  {
    name: 'LevelInstanceCreatedLog',
    type: 'event',
    inputs: [
      { type: 'address', name: 'player', 'indexed': true },
      { type: 'address', name: 'instance', 'indexed': true },
      { type: 'address', name: 'level', 'indexed': true }
    ],
  }
];

module.exports = function(web3) {
  let accounts;

  async function getSenderAddress(accountIdx = 0) {
    if (!accounts) {
      accounts = await web3.eth.getAccounts();
    }

    return accounts[accountIdx];
  }
  
  async function createInstance(levelId, options = {}) {
    const level = config.levels.find(lvl => lvl.name === levelId).deployedAddress;
    const contract = await getContract(config.ethernautAddress, ethernautABI);
    const receipt = await contract.methods.createLevelInstance(level).send({
      from: await getSenderAddress(),
      ...options
    });
  
    debug('createLevelInstance TX', receipt);
  
    return receipt.events.LevelInstanceCreatedLog.returnValues.instance;
  }
  
  async function submitInstance(instance, options = {}) {
    const contract = await getContract(config.ethernautAddress, ethernautABI);
    const receipt = await contract.methods.submitLevelInstance(instance).send({
      from: await getSenderAddress(),
      ...options
    });
  
    debug('submitLevelInstance TX', receipt);
  
    return receipt.status;
  }
  
  async function getContract(address, abi) {
    const from = await getSenderAddress(web3);
    return new web3.eth.Contract(abi, address, { from });
  }

  return {
    address: config.ethernautAddress,
    getSenderAddress,
    createInstance,
    submitInstance
  };
};

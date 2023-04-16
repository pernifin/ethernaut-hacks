const debug = require('debug')('ethernaut');

const ethernautABI = [
  {
    name: 'createLevelInstance',
    type: 'function',
    stateMutability: 'payable',
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
    stateMutability: 'nonpayable',
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

module.exports = function(ethers, config, level) {
  let accounts;
  async function getSenderAddress(accountIdx = 0) {
    if (!accounts) {
      accounts = await ethers.getSigners();
    }

    return accounts[accountIdx];
  }
  
  async function createInstance(options = {}) {
    const contract = await getContract(config.ethernautAddress, ethernautABI);
    const receipt = await contract.createLevelInstance(level.deployedAddress, { ...options })
      .then(tx => tx.wait());

    debug('createLevelInstance TX', receipt);

    return receipt.events?.find(event => event.event === 'LevelInstanceCreatedLog')?.args.instance;
  }
  
  async function submitInstance(instanceAddress, options = {}) {
    const contract = await getContract(config.ethernautAddress, ethernautABI);
    const response = await contract.submitLevelInstance(instanceAddress, { ...options });
    const receipt = await response.wait();

    debug('submitLevelInstance TX', receipt);
  
    return receipt.status;
  }
  
  async function getContract(address, abi) {
    const from = await getSenderAddress();
    return new ethers.Contract(address, abi, from);
  }

  return {
    address: config.ethernautAddress,
    getSenderAddress,
    createInstance,
    submitInstance
  };
};

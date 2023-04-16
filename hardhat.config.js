require('dotenv').config();
require('@nomicfoundation/hardhat-toolbox');

require('./scripts/solver');

const { KEY, PROJECT_ID } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.19',
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${PROJECT_ID}`,
      accounts: [KEY]
    }
  }
};

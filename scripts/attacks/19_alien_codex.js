module.exports = async function({ artifacts, web3, ethernaut }) {
  const AlienCodexHack = artifacts.require('AlienCodexHack');
  const instanceAddress = await ethernaut.createInstance(web3, 'Alien Codex');

  await AlienCodexHack.new(instanceAddress);
  return ethernaut.submitInstance(web3, instanceAddress);
};
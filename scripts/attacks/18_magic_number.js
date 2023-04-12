module.exports = async function({ artifacts, web3, ethernaut }) {
  const MagicNumberSolver = artifacts.require('MagicNumberSolver');
  const instanceAddress = await ethernaut.createInstance(web3, 'MagicNumber');

  await MagicNumberSolver.new(instanceAddress);
  return ethernaut.submitInstance(web3, instanceAddress);
};
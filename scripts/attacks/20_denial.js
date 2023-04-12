module.exports = async function({ artifacts, web3, ethernaut }) {
  const HackDenial = artifacts.require('HackDenial');
  const instanceAddress = await ethernaut.createInstance(web3, 'Denial', { value: web3.utils.toWei('0.001', 'ether') });

  await HackDenial.new(instanceAddress);
  return ethernaut.submitInstance(web3, instanceAddress);
};
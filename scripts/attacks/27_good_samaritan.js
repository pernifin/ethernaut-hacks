module.exports = async function({ artifacts, web3, ethernaut }) {
  const GoodSamaritanHack = artifacts.require('GoodSamaritanHack');
  const instanceAddress = await ethernaut.createInstance(web3, 'Good Samaritan');
  console.log('Created instance at', instanceAddress);

  const hackInstance = await GoodSamaritanHack.new(instanceAddress);
  await hackInstance.hack();

  return ethernaut.submitInstance(web3, instanceAddress);
};
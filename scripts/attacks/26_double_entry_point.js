module.exports = async function({ artifacts, web3, ethernaut }) {
  const FortaBot = artifacts.require('FortaBot');
  const DoubleEntryPoint = artifacts.require('DoubleEntryPoint');
  const IForta = artifacts.require('IForta');
  const instanceAddress = await ethernaut.createInstance(web3, 'DoubleEntryPoint');
  console.log('Created instance at', instanceAddress);

  const levelInstance = await DoubleEntryPoint.at(instanceAddress);
  const botInstance = await FortaBot.new(await levelInstance.cryptoVault());

  const fortaInstance = await IForta.at(await levelInstance.forta());
  await fortaInstance.setDetectionBot(botInstance.address);

  return ethernaut.submitInstance(web3, instanceAddress);
};
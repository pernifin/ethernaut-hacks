// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

interface IDetectionBot {
  function handleTransaction(address user, bytes calldata msgData) external;
}

interface IForta {
  function setDetectionBot(address detectionBotAddress) external;
  function notify(address user, bytes calldata msgData) external;
  function raiseAlert(address user) external;
}

interface DoubleEntryPoint {
  function cryptoVault() external view returns (address);
  function forta() external view returns (address);
}

contract FortaBot is IDetectionBot {
  event Data(bytes4, bytes4, bytes);

  address vault;
  constructor(address _vault) {
    vault = _vault;
  }

  function handleTransaction(address user, bytes calldata msgData) external {
    (address player, uint256 amount, address from) = 
      abi.decode(msgData[4:], (address, uint256, address));

    bytes4 funcSig = bytes4(msgData[:4]);
    bytes4 origFuncSig = bytes4(keccak256('delegateTransfer(address,uint256,address)'));

    emit Data(funcSig, origFuncSig, msgData);

    if (funcSig == origFuncSig && from == vault) {
      IForta(msg.sender).raiseAlert(user);
    }
  }
}
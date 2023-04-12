// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

interface SimpleToken {
  function destroy(address payable) external;
}

contract RecoveryHack {
  function recover(address factory) external pure returns (address) {
    return address(uint160(uint256(keccak256(abi.encodePacked(bytes1(0xd6), bytes1(0x94), factory, bytes1(0x01))))));
  }
}
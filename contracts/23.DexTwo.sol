// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

interface DexTwo {
  function token1() external view returns (address);
  function token2() external view returns (address);

  function swap(address from, address to, uint amount) external;
  function getSwapAmount(address from, address to, uint amount) external view returns(uint);
  function approve(address spender, uint amount) external;
  function balanceOf(address token, address account) external view returns (uint);
}

contract MySwappableToken is ERC20 {
  constructor(string memory name, string memory symbol, uint initialSupply) ERC20(name, symbol) {
    _mint(msg.sender, initialSupply);
  }
}
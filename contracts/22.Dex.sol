// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

interface Dex {
  function token1() external view returns (address);
  function token2() external view returns (address);

  function swap(address from, address to, uint amount) external;
  function getSwapPrice(address from, address to, uint amount) external view returns(uint);
  function approve(address spender, uint amount) external;
  function balanceOf(address token, address account) external view returns (uint);
}
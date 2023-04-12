// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

interface MagicNumber {
  function setSolver(address) external;
}

contract MagicNumberSolver {
  constructor(MagicNumber target) {
    address solver;
    bytes memory bytecode = hex'69602A60005260206000F3600052600A6016F3'; 
    assembly {
      solver := create(0, add(bytecode, 32), 19)
    }
    require(solver != address(0), 'create failed');

    target.setSolver(solver);
  }
}
// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

// import '@ganache/console.log/console.sol';

contract Fallback {
  mapping(address => uint) public contributions;
  address public owner;

  constructor() {
    owner = msg.sender;
    contributions[msg.sender] = 1000 * (1 ether);
    // console.log('owner: %s', owner);
  }

  modifier onlyOwner {
    require(
      msg.sender == owner,
      'caller is not the owner'
    );
    _;
  }

  function contribute() public payable {
    // console.log('contribute: [msg.value = %f]', msg.value);
    require(msg.value < 0.001 ether);
    contributions[msg.sender] += msg.value;
    if(contributions[msg.sender] > contributions[owner]) {
      owner = msg.sender;
    }
  }

  function getContribution() public view returns (uint) {
    return contributions[msg.sender];
  }

  function withdraw() public onlyOwner {
    // console.log('withdraw: [balance = %f]', address(this).balance);
    payable(owner).transfer(address(this).balance);
  }

  receive() external payable {
    // console.log('receive: [msg.value = %f]', msg.value);
    require(msg.value > 0 && contributions[msg.sender] > 0);
    owner = msg.sender;
  }
}

contract FallbackHack {
  Fallback victim;

  constructor(Fallback _fallback) {
    victim = _fallback;
  }

  function hack() external payable {
    victim.contribute{value: 0.0001 ether}();
  }
}
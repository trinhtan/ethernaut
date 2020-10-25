const { ether, expectRevert, expectEvent } = require('@openzeppelin/test-helpers');

const CoinFlip = artifacts.require('CoinFlip');
const AttackCoinFlip = artifacts.require('AttackCoinFlip');

const { expect } = require('chai');

contract('[Challenge] Coin Flip', function ([deployer, attacker, someUser, ...otherAccounts]) {
  // const [deployer, attacker, someUser, ...otherAccounts] = accounts;

  before(async function () {
    /** SETUP SCENARIO */
    this.coinFlip = await CoinFlip.new({ from: deployer });
    this.attackCoinFlip = await AttackCoinFlip.new(this.coinFlip.address, { from: attacker });
  });

  it('Exploit', async function () {
    /** YOUR EXPLOIT GOES HERE */
    for (let i = 0; i < 10; i++) {
      await this.attackCoinFlip.attack({ from: attacker });
    }
  });

  after(async function () {
    /** SUCCESS CONDITIONS */
    expect(await this.coinFlip.consecutiveWins()).to.be.bignumber.eq('10');
  });
});

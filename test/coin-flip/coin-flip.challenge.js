const { ether, expectRevert, expectEvent, } = require('@openzeppelin/test-helpers');
const { accounts, contract } = require('@openzeppelin/test-environment');

const CoinFlip = contract.fromArtifact('CoinFlip');
const AttackCoinFlip = contract.fromArtifact('AttackCoinFlip');

const { expect } = require('chai');

describe('[Challenge] Fallback', function () {

  const [deployer, attacker, someUser, ...otherAccounts] = accounts;

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

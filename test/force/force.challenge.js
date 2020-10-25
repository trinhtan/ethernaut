const { ether, expectRevert, expectEvent } = require('@openzeppelin/test-helpers');

const Force = artifacts.require('Force');
const AttackForce = artifacts.require('AttackForce');

const { expect } = require('chai');
const balance = require('@openzeppelin/test-helpers/src/balance');

contract('[Challenge] Force', function ([deployer, attacker, someUser, ...otherAccounts]) {
  before(async function () {
    /** SETUP SCENARIO */
    this.force = await Force.new({ from: deployer });
    this.attackForce = await AttackForce.new(this.force.address, { from: attacker });
  });

  it('Exploit', async function () {
    /** YOUR EXPLOIT GOES HERE */
    await this.attackForce.attack({ from: attacker, value: '1' });
  });

  after(async function () {
    /** SUCCESS CONDITIONS */
    expect(await balance.current(this.force.address)).to.be.bignumber.eq('1');
  });
});

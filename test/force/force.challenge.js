const { ether, expectRevert, expectEvent, } = require('@openzeppelin/test-helpers');
const { accounts, contract } = require('@openzeppelin/test-environment');

const Force = contract.fromArtifact('Force');
const AttackForce = contract.fromArtifact('AttackForce');

const { expect } = require('chai');
const balance = require('@openzeppelin/test-helpers/src/balance');

describe('[Challenge] Fallout', function () {

  const [deployer, attacker, someUser, ...otherAccounts] = accounts;

  before(async function () {
    /** SETUP SCENARIO */
    this.force = await Force.new({ from: deployer });
    this.attackForce = await AttackForce.new(this.force.address, { from: attacker });
    await this.attackForce.attack({ from: attacker, value: '1' });
  });

  it('Exploit', async function () {
    /** YOUR EXPLOIT GOES HERE */
    // await this.fallout.Fal1out({ from: attacker });

  });

  after(async function () {
    /** SUCCESS CONDITIONS */
    expect(await balance.current(this.force.address)).to.be.bignumber.eq('1');

  });
});

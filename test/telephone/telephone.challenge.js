const Telephone = artifacts.require('Telephone');
const AttackTelephone = artifacts.require('AttackTelephone');

const { expect } = require('chai');

contract('[Challenge] Telephone', function ([deployer, attacker, someUser, ...otherAccounts]) {
  before(async function () {
    /** SETUP SCENARIO */
    this.telephone = await Telephone.new({ from: deployer });
    this.attackTelephone = await AttackTelephone.new(this.telephone.address, { from: attacker });
  });

  it('Exploit', async function () {
    /** YOUR EXPLOIT GOES HERE */
    await this.attackTelephone.attack({ from: attacker });
  });

  after(async function () {
    /** SUCCESS CONDITIONS */
    expect(await this.telephone.owner()).eq(attacker);
  });
});

const { ether, expectRevert, expectEvent, } = require('@openzeppelin/test-helpers');
const { accounts, contract } = require('@openzeppelin/test-environment');

const Telephone = contract.fromArtifact('Telephone');
const AttackTelephone = contract.fromArtifact('AttackTelephone');

const { expect } = require('chai');

describe('[Challenge] Telephone', function () {

  const [deployer, attacker, someUser, ...otherAccounts] = accounts;

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

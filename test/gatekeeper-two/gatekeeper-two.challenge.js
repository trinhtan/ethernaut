const GatekeeperTwo = artifacts.require('GatekeeperTwo');
const AttackGatekeeperTwo = artifacts.require('AttackGatekeeperTwo');
const { expect } = require('chai');

contract('[Challenge] GatekeeperTwo', function ([deployer, attacker, someUser, ...otherAccounts]) {
  before(async function () {
    /** SETUP SCENARIO */
    this.gatekeeperTwo = await GatekeeperTwo.new({ from: deployer });
  });

  it('Exploit', async function () {
    this.attackGatekeeperTwo = await AttackGatekeeperTwo.new(this.gatekeeperTwo.address, {
      from: attacker,
    });

    console.log(await this.attackGatekeeperTwo.result());
  });

  after(async function () {
    expect(await this.gatekeeperTwo.entrant()).eq(attacker);
  });
});

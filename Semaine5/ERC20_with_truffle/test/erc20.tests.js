const { BN, ether } = require('@openzeppelin/test-helpers'); 
const { expect } = require('chai'); 
const ERC20 = artifacts.require('ERC20');

contract('ERC20', function (accounts) { 
    const _name = 'ERC20 Token'; 
    const _symbol = 'TOK'; 
    const _decimals = new BN(18); 
    const owner = accounts[0]; 
    const recipient = accounts[1];

// Avant chaque test unitaire beforeEach(async function () {
beforeEach(async function () {
this.ERC20Instance = await ERC20.new({from: owner}); 
}); 

// Premier test unitaire 
it('a un nom', async function () {
expect(await this.ERC20Instance.name()).to.equal(_name); 
}); 

// Deuxième test unitaire 
it('a un symbole', async function () {
expect(await this.ERC20Instance.symbol()).to.equal(_symbol); 
});


it('a une valeur _decimal', async function () {
expect(await this.ERC20Instance.decimals()).to.be.bignumber.equal(_decimals);
});

it('verifie la balance du proprietaire du contrat', async function () {
    let balanceOwner = await this.ERC20Instance.balanceOf(owner);
    let totalSupply = await this.ERC20Instance.totalSupply();
    expect(balanceOwner).to.be.bignumber.equal(totalSupply);
});

it('verifie la fonction de transfert', async function () {
    let balanceOwnerBefore = await this.ERC20Instance.balanceOf(owner);
    let balanceRecipientBefore = await this.ERC20Instance.balanceOf(recipient);
    let amount = new BN(10);

    await this.ERC20Instance.transfer(recipient,amount, {from: owner});

    let balanceOwnerAfter = await this.ERC20Instance.balanceOf(owner);
    let balanceRecipientAfter = await this.ERC20Instance.balanceOf(recipient);

    expect (balanceOwnerAfter).to.be.bignumber.equal(balanceOwnerBefore.sub(amount));
    expect (balanceRecipientAfter).to.be.bignumber.equal(balanceRecipientBefore.add(amount));
});



});



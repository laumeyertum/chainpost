const TokenEconomy = artifacts.require("TokenEconomy");
const MemeCoin = artifacts.require('MemeCoin');

module.exports =async function(deployer) {
  await deployer.deploy(MemeCoin,100000);
  await deployer.deploy(TokenEconomy, MemeCoin.address,"0xa79824a80dF3234627eba4E47453825fB827C205", 1);
  let memeCoinDeployed = await MemeCoin.deployed();
  await memeCoinDeployed.transfer(TokenEconomy.address, 90000);
};
const Web3 = require('web3');
const fs = require('fs');
//Web3 interface
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:4433'));
//read json file into const from file system
const TokenEconomyJson = fs.readFileSync('build/contracts/TokenEconomy.json', 'utf8');
//parse json file from string to object
const TokenEconomyContractObject = JSON.parse(TokenEconomyJson);
//get the abi part of the json file
const TokenEconomyAbi = TokenEconomyContractObject.abi;
//get address from json file
const TokenEconomyNetworks = TokenEconomyContractObject.networks;
// get network id by array because its an integer not a string
const TokenEconomy5577 = TokenEconomyNetworks[5777];
// get address for contract
const TokenEconomyAddress = TokenEconomy5577.address;
//create the contract object for interaction with smartcontract
const TokenEconomyContract = new web3.eth.Contract(TokenEconomyAbi, TokenEconomyAddress);
//todo fill send
//not sure if needed
async function buyMemeCoin(_address, _value) {
  try {
    await TokenEconomyContract.methods.buyMemeCoin(_address).send({from: _address, value: _value});
  } catch (e) {
    console.log(e);
  }
}

async function giveLike(_from, _to, _postId) {
  try {
    console.log(_postId);
    await TokenEconomyContract.methods.giveLike(_to, _postId).send({from: _from, gas: 6721900});
  } catch (e) {
    console.log(e);
  }
}

async function getLikeWorth() {
  let ret;
  try {
    ret = await TokenEconomyContract.methods.getLikeWorth().call();
  } catch (e) {
    console.log(e);
  }
  return ret;
}

async function setLikeWorth(_worth) {
  try {
    await TokenEconomyContract.methods.setLikeWorth(_worth).
        send({from: '0x1FDA0FDAFe6a622Fc58f14C04dE4ED315e011E97'});
  } catch (e) {
    console.log(e);
  }
}

async function giveDisLike(_from, _to, _postId) {
  try {
    await TokenEconomyContract.methods.giveDisLike(_to, _postId).send({from: _from, gas: 6721900});
  } catch (e) {
    console.log(e);
  }
}

async function giveGift(_from, _to, _amount) {
  try {
    await TokenEconomyContract.methods.giveGift(_to, _amount).send({from: _from});
  } catch (e) {
    console.log(e);
  }
}

async function rewardForLikes(_reportedPostId, _originalPoster, _reporter, _confirmer) {
  try {
    await TokenEconomyContract.methods.rewardForLikes(_reportedPostId, _originalPoster, _reporter,
        _confirmer).send({from: '0xC3d95436213abfb97413FCf15E3E7D8af1E3a238', gas: 6721900});
  } catch (e) {
    console.log(e);
  }
}

function getTokenEconomyContractAbi() {
  return TokenEconomyAbi;
}

function getTokenEconomyContractAddress() {
  return TokenEconomyAddress;
}

module.exports = {
  buyMemeCoin,
  giveLike,
  getLikeWorth,
  setLikeWorth,
  giveDisLike,
  giveGift,
  rewardForLikes,
  getTokenEconomyContractAbi,
  getTokenEconomyContractAddress
};
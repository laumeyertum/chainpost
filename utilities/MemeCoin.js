const Web3 = require('web3');
const fs = require('fs');
//Web3 interface
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:4433'));
//read json file into const from file system
const MemeCoinJson = fs.readFileSync('build/contracts/MemeCoin.json', 'utf8');
//parse json file from string to object
const MemeCoinContractObject = JSON.parse(MemeCoinJson);
//get the abi part of the json file
const MemeCoinAbi = MemeCoinContractObject.abi;
//get address from json file
const MemeCoinNetworks = MemeCoinContractObject.networks;
// get network id by array because its an integer not a string
const MemeCoin5577 = MemeCoinNetworks[5777];
// get address for contract
const MemeCoinAddress = MemeCoin5577.address;
//create the contract object for interaction with smartcontract
const MemeCoinContract = new web3.eth.Contract(MemeCoinAbi, MemeCoinAddress);

//not sure if needed
async function transfer(_to, _value) {
  try {
    await MemeCoinContract.methods.transfer(_to, _value).call();
  } catch (e) {
    console.log(e);
  }
}

async function getTokenOf(_to) {
  let ret;
  try {
    ret = await MemeCoinContract.methods.getTokenOf(_to).call();
  } catch (e) {
    console.log(e);
  }
  return ret;
}



module.exports = {
  transfer,
  getTokenOf
};
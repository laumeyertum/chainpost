const TokenEconomy = require('./../utilities/TokenEconomy');
const MemeCoin = require('./../utilities/MemeCoin');

let sender ="0x6d67283f2A381416Ab76d78260Fc6AADC61DB918" ;
let receiver = "0xd3E63086D481e1Eb994ed5D08f06b1F6BBbCc207";
let amount = 10;

async function giveGift(){
  console.log(await MemeCoin.getBalanceOf(sender));
  console.log(await MemeCoin.getBalanceOf(receiver));
  await TokenEconomy.giveGift(sender,receiver,amount);
  console.log(await MemeCoin.getBalanceOf(sender));
  console.log(await MemeCoin.getBalanceOf(receiver));
}

giveGift();
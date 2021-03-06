const userLogic = require('./../bussinesLogic/userLogic');
const postLogic = require('./../bussinesLogic/postLogic');
const TokenEconomy = require('./../utilities/TokenEconomy');
const prisonLogic = require('./../bussinesLogic/prisonLogic');
const MemeCoin = require('./../utilities/MemeCoin');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:4433'));
let username = "test1";
let address = "0xcA6F3BF738c82F16431a805083D1b8818A8981eb";
let password = "password";
let title = "testTitle";
let content = "testContent";
let type = "text";
let username2 = "test2";
let address2 = "0x544977912e9c8eF0064D43f80fb47b6287D7adC9";
let password2 = "password";

async function testReport() {
  await TokenEconomy.buyMemeCoin(address, 100);
  await TokenEconomy.buyMemeCoin(address2, 100);
  console.log(await MemeCoin.getBalanceOf(address));
  console.log(await MemeCoin.getBalanceOf(address2));
  let user1 = await userLogic.register(username, address, password);
  let user2 = await userLogic.register(username2,address2,password2);
  console.log("login");
  let post1 = await postLogic.createPost(username, title,type,content);
  console.log("post1");
  let post2 = await postLogic.createPost(username2,title,type, content);
  console.log("createdPost");
  await postLogic.addLike(username, post1.get("postId"), true);
  await postLogic.addLike(username, post2.get("postId"), false);
  await postLogic.addLike(username2, post1.get("postId"), true);
  await postLogic.addLike(username2, post2.get("postId"), false);
  console.log("addedLikes");
  let report = await prisonLogic.reportPost(post2.get("postId"), post1.get("postId"),username);
  console.log("reported");
  await prisonLogic.addConfiramtion(username2, post2.get("postId"), true);
  console.log("added confirmation");
  await prisonLogic.resolveReports();
  console.log(await MemeCoin.getBalanceOf(address));
  console.log(await MemeCoin.getBalanceOf(address2));
}
async function test(){
  await prisonLogic.resolveReports();
}
test();
// testReport();
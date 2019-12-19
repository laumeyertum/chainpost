const userLogic = require('./../bussinesLogic/userLogic');
const postLogic = require('./../bussinesLogic/postLogic');
const TokenEconomy = require('./../utilities/TokenEconomy');
const prisonLogic = require('./../bussinesLogic/prisonLogic');
const MemeCoin = require('./../utilities/MemeCoin');

let username = "test1";
let address = "0x6d67283f2A381416Ab76d78260Fc6AADC61DB918";
let password = "password";
let title = "testTitle";
let content = "testContent";
let type = "text";

let username2 = "test2";
let address2 = "0x6bD436D36e0046Ec23c54126A6503d9a75968eCB";
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
  // await prisonLogic.resolveReports();
  // console.log(await MemeCoin.getBalanceOf(address));
  // console.log(await MemeCoin.getBalanceOf(address2));
}

testReport();
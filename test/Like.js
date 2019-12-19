const userLogic = require('./../bussinesLogic/userLogic');
const postLogic = require('./../bussinesLogic/postLogic');
const TokenEconomy = require('./../utilities/TokenEconomy');

let username = "test";
let address = "0x6d67283f2A381416Ab76d78260Fc6AADC61DB918";
let password = "password";
let title = "testTitle";
let content = "testContent";
let type = "text";

async function createUserAndLikePost() {
  await TokenEconomy.buyMemeCoin(address, 1000);
  console.log("start");
  await userLogic.register(username,address, password);
  console.log("register");
  let post = await postLogic.createPost(username, title, type, content);
  console.log("postcreated");
  await postLogic.addLike(username, post.get("postId") , false);
  console.log("addedLike");
}

createUserAndLikePost();
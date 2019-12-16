const user = require("./../dataAccess/user");
const post = require("./../dataAccess/post");
const like = require("./../dataAccess/like");

async function register(_username, _address, _password) {
  if(await user.userExist(_username)){
    return null;
  }
  if(await user.addressExist(_address)){
    return null;
  }
  user.createUser(_username,_address,_password)
}

async function login(_username, _password){
  if(await user.userExist(_username)){
    return null;
  }
  if(!await user.comparePassword(_username, _password)){
    return null;
  }
  return user.getUserByUsername(_username);
}

function getPostsByUsername(_username){
  return post.getPostsByUsername(_username);
}

function getLikesByUsername(_username){
  return like.getLikesByUsername(_username);
}

function usernameExist(_username){
  return user.userExist(_username);
}

function addressExist(_address){
  return user.addressExist(_address);
}

module.exports = {
  register,
  login,
  getPostsByUsername,
  getLikesByUsername,
  usernameExist,
  addressExist
};
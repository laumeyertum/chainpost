const user = require("../dataAccess/user");

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

module.exports = {
  register,
  login
};
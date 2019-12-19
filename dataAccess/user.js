const Sequelize  = require('./../utilities/sequelize');
const sequelize = Sequelize.sequelize;

const User = sequelize.import("../models/Users.js");

function createUser(_username, _address, _password) {
  return User.create({
    username: _username,
    address: _address,
    password: _password,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

function getUserByUsername(_username){
  return User.findByPk(_username);
}

function getUserByAddress(_address){
  return User.findOne({where:{address: _address}});
}

async function comparePassword(_username,_password){
  let user = await User.findByPk(_username);
  return (await user.get("password")) === _password
}

async function userExist(_username){
  return (await User.findByPk(_username)) != null;
}

async function addressExist(_address){
  return (await User.findOne({where:{address: _address}}))!= null;
}

async  function getAddressByUsername(_username){
  return await getUserByUsername(_username).get("address");
}

module.exports = {
  getUserByUsername,
  getUserByAddress,
  createUser,
  comparePassword,
  userExist,
  addressExist,
  getAddressByUsername
};
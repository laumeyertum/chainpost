const bcrypt = require('bcrypt');
const Sequelize  = require('./../utilities/sequelize');
const sequelize = Sequelize.sequelize;

const User = sequelize.import("../models/Users.js");

function createUser(_username, _address, _password) {
  let password = bcrypt.hashSync(_password, 12);
  console.log(password);
  console.log(password.length);
  return User.create({
    username: _username,
    address: _address,
    password: password,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

async function comparePassword(_username,_password){
  let user = await User.findByPk(_username);
  return await bcrypt.compareSync(_password, user.get("password"))
}

async function userExist(_username){
  return await User.findByPk(_username) != null;
}

module.exports = {
  createUser,
  comparePassword
};
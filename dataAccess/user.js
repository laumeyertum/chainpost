const bcrypt = require('bcrypt');
const Sequelize  = require('./../utilities/sequelize');
const sequelize = Sequelize.sequelize;

const User = sequelize.import("../models/Users.js");

// User.findOne({ where: {username: 'test'} }).then(async function (user) {
//   let newuser  = await user.update({username:"newusername"});
//   console.log(newuser.get("username"));
// });
// console.log(typeof User);
// User.update({username:"newusername"},{where: {username: "test"}});
// console.log("here");
async function createUser(_username, _address, _password) {
  let password = bcrypt.hashSync(_password, 12);
  console.log(password);
  console.log(password.length);
  const user = await User.create({
    username: _username,
    address: _address,
    password: password,
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

async function comparePassword(_username,_password){
  let user = await User.findByPk(_username);
  return await bcrypt.compareSync(_password, user.get("password"))
}

// createUser("test1","testAddress1", "password");
let b = comparePassword("test1","testAddress1");
console.log(b);
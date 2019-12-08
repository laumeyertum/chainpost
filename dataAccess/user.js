const Sequelize  = require('./../utilities/sequelize');
const sequelize = Sequelize.sequelize;

const User = sequelize.import("../models/Users.js");

User.findOne({ where: {username: 'test'} }).then(user => {
  console.log(user.get("username"));
});
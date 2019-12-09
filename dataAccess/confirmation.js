const Sequelize  = require('./../utilities/sequelize');
const sequelize = Sequelize.sequelize;

const Confirmation = sequelize.import("../models/Confirmation.js");

function createConfirmation(_postId, _username, _type) {
  return Confirmation.create({
    postId: _postId,
    username: _username,
    type: _type,
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

module.exports ={
  createConfirmation
};
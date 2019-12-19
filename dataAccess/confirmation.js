const Sequelize  = require('./../utilities/sequelize');
const sequelize = Sequelize.sequelize;
const prison  = require('./prison');
const Confirmation = sequelize.import("../models/Confirmations.js");

function createConfirmation(_postId, _username, _type) {
  prison.addConfirmation(_postId,_type);
  return Confirmation.create({
    postId: _postId,
    username: _username,
    type: _type,
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

function getAllConfirmationsByPostId(_postId){
  return Confirmation.findAll({where:{postId: _postId}});
}

module.exports ={
  createConfirmation,
  getAllConfirmationsByPostId
};
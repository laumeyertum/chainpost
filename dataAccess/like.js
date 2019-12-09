const Sequelize  = require('./../utilities/sequelize');
const sequelize = Sequelize.sequelize;

const Like = sequelize.import("../models/Likes.js");

function createLike(_postId, _username,_type) {
  return Like.create({
    username: _username,
    postId: _postId,
    type: _type,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

module.exports = {
  createLike
};
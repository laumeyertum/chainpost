const Sequelize  = require('./../utilities/sequelize');
const sequelize = Sequelize.sequelize;
const post = require("./post");
const Like = sequelize.import("../models/Likes.js");

function createLike(_username, _postId, _type) {
  return Like.create({
    username: _username,
    postId: _postId,
    type: _type,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

function getLikesByUsername(_username){
  return Like.findAll({where:{username:_username}});
}

async function likeExist(_username, _postId){
  return (await Like.findOne({where:{username:_username, postId: _postId}})) != null;
}

module.exports = {
  createLike,
  getLikesByUsername,
  likeExist
};
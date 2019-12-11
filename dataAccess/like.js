const Sequelize  = require('./../utilities/sequelize');
const sequelize = Sequelize.sequelize;
const post = require("./post");

const Like = sequelize.import("../models/Likes.js");

function createLike(_postId, _username, _type) {
  post.addLike(_postId, _type);
  return Like.create({
    username: _username,
    postId: _postId,
    type: _type,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

console.log(post);

module.exports = {
  createLike
};
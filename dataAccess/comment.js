const Sequelize  = require('./../utilities/sequelize');
const sequelize = Sequelize.sequelize;

const Comment = sequelize.import("../models/Comments.js");

function createComment(_username, _postId, _content) {
  return Comment.create({
    username: _username,
    postId: _postId,
    content: _content,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

module.exports = {
  createComment
};
const Sequelize  = require('./../utilities/sequelize');
const sequelize = Sequelize.sequelize;

const Post = sequelize.import("../models/Posts.js");

function createPost(_username, _title,_type, _postContent) {
  return Post.create({
    username: _username,
    title: _title,
    type: _type,
    postContent: _postContent,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

async function postExist(_postId){
  return await Post.findByPk(_postId) != null;
}

module.exports = {
  createPost,
  postExist
};
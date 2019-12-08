const Sequelize  = require('./../utilities/sequelize');
const sequelize = Sequelize.sequelize;

const Post = sequelize.import("../models/Posts.js");

async function createPost(_username, _title,_type, _postContent) {
  const post = await Post.create({
    username: _username,
    title: _title,
    type: _type,
    postContent: _postContent,
    createdAt: new Date(),
    updatedAt: new Date()
  })
}
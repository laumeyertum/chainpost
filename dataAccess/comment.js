const Sequelize  = require('./../utilities/sequelize');
const sequelize = Sequelize.sequelize;

const Comment = sequelize.import("../models/Comments.js");

async function createComment(_username, _title,_type, _postContent) {
  const comment = await Comment.create({
    username: _username,
    title: _title,
    type: _type,
    postContent: _postContent,
    createdAt: new Date(),
    updatedAt: new Date()
  })
}
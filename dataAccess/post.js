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

async function addLike(_postId, _type){
  if(await postExist(_postId)) {
    let i;
    if (_type) {
      i = 1;
    } else {
      i = -1;
    }
    sequelize.query("UPDATE Posts SET likeCount = likeCount +" + i + " WHERE postId = " + _postId);
  }
}

async function postExist(_postId){
  return await Post.findByPk(_postId) != null;
}

function getNewPost(){
  return Post.findAll({
    limit: 20,
    order: [['createdAt', 'DESC']]
  });
}

function getTopPost(){}

addLike(1, false);

module.exports = {
  createPost,
  postExist,
  addLike,
  getNewPost,
  getTopPost
};
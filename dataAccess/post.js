const Sequelize  = require('./../utilities/sequelize');
const sequelize = Sequelize.sequelize;

const Post = sequelize.import("../models/Posts.js");
const Like = require("./like");

function createPost(_username, _title, _type, _postContent) {
  return Post.create({
    username: _username,
    title: _title,
    type: _type,
    likeCount: 0,
    postContent: _postContent,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

async function addLike(_postId, _username, _type){
  if(await postExist(_postId)) {
    Like.createLike(_postId,_username, _type);
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

function getPostById(_postId) {
  return Post.findByPk(_postId);
}

function getTopPost(){
  return  Post.findAll({
    limit: 20,
    order: [['likeCount', 'DESC']]
  });
}

function getPostsByUsername(_username){
  return Post.findAll({where:{username: _username}});
}

module.exports = {
  createPost,
  postExist,
  addLike,
  getNewPost,
  getTopPost,
  getPostById,
  getPostsByUsername
};
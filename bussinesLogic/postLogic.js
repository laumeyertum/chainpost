const post = require("../dataAccess/post");
const like = require("../dataAccess/like");
const comment = require("../dataAccess/comment");
const TokenEconomy = require("../utilities/TokenEconomy");
const user = require("./../dataAccess/user");

function getTopPost() {
  return post.getTopPost();
}

function getNewPost() {
  return post.getNewPost();
}

async function createPost(_username, _title,_type, _postContent) {
  let createdPost = await post.createPost(_username,_title,_type,_postContent);
  like.createLike(_username,await createdPost.get("postId"), true);
  return createdPost;
}

async function addLike(_postId, _username, _type) {
  let postExist = await post.postExist(_postId);
  let likeExist = await like.likeExist(_username,_postId);
  let postCreated;
  if(postExist  && !likeExist) {
    postCreated = await post.addLike(_postId, _username, _type);
  } else {
    return null;
  }
  let liker = await user.getUserByUsername(_username).get("address");
  let poster = await post.getPostById(_postId).get("username");
  let posterAddress = await user.getUserByUsername(poster).get("address");
  if(_type){
    await TokenEconomy.giveLike(liker, posterAddress, _postId);
  } else {
    await TokenEconomy.giveDisLike(liker, posterAddress, _postId);
  }
  return postCreated;
}

function createComment(_username, _postId, _content) {
  comment.createComment(_username,_postId,_content);
}

function removeRepost(_postId){
  for (let i = 0; i <_postId.length ; i++) {
    post.removePostById(_postId[i]);
  }
}

module.exports = {
  getTopPost,
  getNewPost,
  createPost,
  addLike,
  createComment,
  removeRepost
};
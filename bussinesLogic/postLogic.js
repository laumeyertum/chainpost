const post = require("../dataAccess/post");
const like = require("../dataAccess/like");
const comment = require("../dataAccess/comment");

function getTopPost() {
  return post.getTopPost();
}

function getNewPost() {
  return post.getNewPost();
}

async function createPost(_username, _title,_type, _postContent) {
  let createdPost = await post.createPost(_username,_title,_type,_postContent);
  like.createLike(await createdPost.get("postId"), _username, true);
  return createdPost;
}

async function addLike(_postId, _username, _type) {
  if(await post.postExist(_postId)) {
    return post.addLike(_postId, _username, _type);
  } else {
    return null;
  }
}

function createComment(_username, _postId, _content) {
  comment.createComment(_username,_postId,_content);
}
module.exports = {
  getTopPost,
  getNewPost,
  createPost,
  addLike,
  createComment
};
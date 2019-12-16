const express = require('express');
const router = express.Router();
const postLogic = require("../bussinesLogic/postLogic");

/* GET home page. */
router.get('/', async function(req, res, next) {
  let posts  = await postLogic.getTopPost();
  console.log(posts[0].get("type"));
  console.log(posts.length);
  res.render('index', { title: 'Express',root: '../', postList: posts, postListLength: posts.length });
});

router.post('/posting', async function (req, res, next) {
  console.log("here2");
  let username = req.body.username;
  let title = req.body.title;
  let type = req.body.type;
  let content = req.body.content;
  let post  =  await postLogic.createPost(username, title, type, content);
  res.send(post);
});

router.post('/upDownVote', function(req, res, next) {
  let username = req.body.username;
  let postId = req.body.postId;
  let type = req.body.type;
  postLogic.addLike(postId, username, type);
//  TODO maybe send back success for colour change on website
});

module.exports = router;

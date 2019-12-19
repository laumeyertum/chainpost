const express = require('express');
const router = express.Router();
const postLogic = require("../bussinesLogic/postLogic");
const prisonLogic = require("../bussinesLogic/prisonLogic");

/* GET home page. */
router.get('/', async function(req, res, next) {
  let posts  = await postLogic.getTopPost();
  res.render('index', { title: 'Express',root: '../', postList: posts, postListLength: posts.length });
});

router.post('/posting', async function (req, res, next) {
  console.log("here2");
  let username = await req.body.username;
  let title = req.body.title;
  let type = req.body.type;
  let content = req.body.content;
  let post  =  await postLogic.createPost(username, title, type, content);
  res.send(post);
});

router.post('/upDownVote', async function(req, res, next) {
  let username = req.body.username;
  let postId = req.body.postId;
  let type = req.body.type;
  return await postLogic.addLike(postId, username, type);
});

router.post('/report', async function(req, res, next){
  let originalPostId = req.body.originalPostId;
  let repostPostId = req.body.repostPostId;
  let username = req.body.username;
  let report  =  await prisonLogic.reportPost(repostPostId,originalPostId,username);
  res.send(report);
});



module.exports = router;

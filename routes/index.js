const express = require('express');
const router = express.Router();
const postLogic = require("../bussinesLogic/postLogic");

/* GET home page. */
router.get('/', async function(req, res, next) {
  let posts  = await postLogic.getTopPost();
  console.log(posts[0].get("title"));
  console.log(posts.length);
  res.render('index', { title: 'Express',root: '../', postList: posts, postListLength: posts.length });
});

router.post('/', async function (req, res, next) {
  let username = req.body.username;
  let title = req.body.title;
  let type = req.body.type;
  let content = req.body.content;
  let post  =  await postLogic.createPost(username, title, type, content);
  res.send(post);
});

module.exports = router;

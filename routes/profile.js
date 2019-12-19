const express = require('express');
const router = express.Router();

const userLogic = require('./../bussinesLogic/userLogic');
const user = require('./../dataAccess/user');
const TokenEconomy = require('./../utilities/TokenEconomy');
const MemeCoin = require('./../utilities/MemeCoin');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('profile');
});

router.post('/user', async function(req, res, next) {
  let user = await user.getUserByUsername(req.body.username);
  // let userJson = {
  //   username: user.get("username"),
  //   address: user.get('address')
  // };
  res.send(user);
});

router.post('/userPosts', async function(req, res, next) {
  let posts = userLogic.getPostsByUsername(req.body.username);
  res.send(posts);
});

router.post('/userLikes', async function(req, res, next) {
  let likes = userLogic.getLikesByUsername(req.body.username);
  res.send(likes);
});

router.post('/buyToken', async function(req, res, next) {
  await TokenEconomy.buyMemeCoin(req.body.address, req.body.value);
  res.send();
});

router.post('/token', async function(res, req, next) {
  let tokens = MemeCoin.getBalanceOf(req.body.address);
  res.send(tokens);
});

module.exports = router;

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
  let userData = await user.getUserByUsername(req.body.username);
  // let userJson = {
  //   username: user.get("username"),
  //   address: user.get('address')
  // };
  res.send(userData);
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
  let address = await user.getAddressByUsername(req.body.username);
  await TokenEconomy.buyMemeCoin(address, req.body.value);
  res.send(address);
});

router.post('/token', async function (req, res, next) {
  let address = await user.getAddressByUsername(req.body.username);
  console.log(address);
  let amount = await MemeCoin.getBalanceOf(address);
  console.log(amount);
  res.send(amount);
});

module.exports = router;

var express = require('express');
var router = express.Router();
const user = require('./../bussinesLogic/userLogic');
/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("hi");
    res.render('register', { title: 'Express',root: '../' });
});

/* Submit user registration*/
router.post('/registerForm', function(req, res, next){
    console.log("signedup");
    let username = req.body.username;
    console.log(username);
    let address = req.body.address;
    console.log(address);
    let pwd = req.body.psw;
    user.register(username, address, pwd);
    res.redirect('./../index');
});

module.exports = router;

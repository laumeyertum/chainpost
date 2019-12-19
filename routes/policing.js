const express = require('express');
const router = express.Router();
const prisonLogic = require('./../bussinesLogic/prisonLogic');
const postLogic = require('./../bussinesLogic/postLogic');
const post = require('./../dataAccess/post');

/* GET home page. */
router.get('/', async function(req, res, next) {
    console.log("hi");
    let reportList = await prisonLogic.getAllReports();
    let repostList = [];
    let originalList = [];
    for (let i = 0; i < reportList.length; i++) {
        let repost = await post.getPostById(reportList[i].get("repostPostId"));
        let original = await post.getPostById(reportList[i].get("originalPostId"));
        repostList.push(repost);
        originalList.push(original);
    }
    res.render('policing', { title: 'Express',root: '../', reportList: reportList, repostList: repostList, originalList: originalList });
});

module.exports = router;

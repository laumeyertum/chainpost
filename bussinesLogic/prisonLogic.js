const prison  = require("../dataAccess/prison");
const confirmation = require("../dataAccess/confirmation");
const post  = require("../dataAccess/post");
const TokenEconomy = require('./../utilities/TokenEconomy');

async function getAllReports() {
  let reports = await prison.getAllReports();
  let repostPosts = [];
  let originalPosts = [];
  for (let i = 0; i <reports.length ; i++) {
    let repostPostId = await reports[i].get("repostPostId");
    let originalPostId = await reports[i].get("originalPostId");
    repostPosts.push(await post.getPostById(repostPostId));
    originalPosts.push(await post.getPostById(originalPostId));
  }
  return [reports,repostPosts,originalPosts];
}

async function reportPost(_repostPostId, _originalPostId, _username) {
  if(!await prison.reportExist(_repostPostId)){
    return null;
  }
  let report =  await prison.createReport(_repostPostId,_originalPostId,_username);
  confirmation.createConfirmation(_repostPostId,_username);
  return report;
}

async function resolveReports(){
  let allReports = prison.getAllReports();
  let postId;
  let originalPoster;
  let reporter;
  let confirmer;
  for (let i = 0; i <allReports.length ; i++) {
    let report = allReports[i];
    let reportPostId = report.get("repostPostId");
    postId.push(reportPostId);
    originalPoster.push(post.getPostById(report.get("originalPostId")).get("username"));
    report.push(report.get("flagger"));
    let confirmations =
    confirmer.push()
  }
  TokenEconomy.rewardForLikes(postId, originalPoster, reporter, confirmer);
}

module.exports = {
  getAllReports,
  reportPost
};
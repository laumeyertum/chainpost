const prison  = require("../dataAccess/prison");
const confirmation = require("../dataAccess/confirmation");
const post  = require("../dataAccess/post");

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
  confirmation.createConfirmation(_repostPostId,_username)
  return report;
}

module.exports = {
  getAllReports,
  reportPost
};
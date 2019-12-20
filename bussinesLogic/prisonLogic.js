const prison = require('../dataAccess/prison');
const confirmation = require('../dataAccess/confirmation');
const post = require('../dataAccess/post');
const TokenEconomy = require('./../utilities/TokenEconomy');
const user = require('./../dataAccess/user');
const postLogic = require('./postLogic');

async function getAllReports() {
  let reports = await prison.getAllReports();
  // let repostPosts = [];
  // let originalPosts = [];
  // for (let i = 0; i < reports.length; i++) {
  //   let repostPostId = await reports[i].get('repostPostId');
  //   let originalPostId = await reports[i].get('originalPostId');
  //   repostPosts.push(await post.getPostById(repostPostId));
  //   originalPosts.push(await post.getPostById(originalPostId));
  // }
  return reports;
}

async function reportPost(_repostPostId, _originalPostId, _username) {
  console.log(await prison.reportExist(_repostPostId));
  console.log(_originalPostId, _repostPostId);
  console.log(!await post.postExist(_repostPostId));
  console.log(!await post.postExist(_originalPostId));
  if (await prison.reportExist(_repostPostId) || !await  post.postExist(_repostPostId) || !await post.postExist(_originalPostId)) {
    return null;
  }
  console.log("createReport");
  return await prison.createReport(_repostPostId, _originalPostId, _username);
}

async function addConfiramtion(_username,_postId, _type) {
  let reportExist = await prison.reportExist(_postId);
  let confirmationExist = await confirmation.confirmationExist(_postId,_username);
  if(reportExist  && !confirmationExist) {
    await prison.addConfirmation(_postId, _type);
    return await confirmation.createConfirmation(_postId,_username,_type);
  } else {
    return null;
  }
}

//TODO add differentiation between repost and false report
async function resolveReports() {
  let allReports = await prison.getAllReports();
  let postId = [];
  let originalPoster = [];
  let reporter = [];
  let confirmer = [];

  console.log(allReports.length);
  for (let i = 0; i < allReports.length; i++) {
    let report = allReports[i];
    let reportPostId = await report.get('repostPostId');
    console.log(report.get("confirmations"));
    if(report.get("confirmations")<=0){
      continue;
    }
    postId.push(reportPostId);
    originalPoster.push(await
        user.getAddressByUsername(await post.getPostById(await report.get('originalPostId')).get('username')));
    reporter.push(await user.getAddressByUsername(await report.get('flagger')));
    let confirmations = await confirmation.getAllConfirmationsByPostId(reportPostId);
    let confirmerAddress = [];
    for (let j = 0; j < confirmations.length; j++) {
      confirmerAddress.push(await user.getAddressByUsername(await confirmations[j].get('username')));
    }
    confirmer.push(confirmerAddress);
  }
  console.log("here");
  console.log(postId);
  console.log(originalPoster);
  console.log(reporter);
  console.log(confirmer);
  await TokenEconomy.rewardForLikes(postId, originalPoster, reporter, confirmer);
  await postLogic.removeRepost(postId);
}

module.exports = {
  getAllReports,
  reportPost,
  resolveReports,
  addConfiramtion
};
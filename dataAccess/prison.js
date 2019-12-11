const Sequelize  = require('./../utilities/sequelize');
const sequelize = Sequelize.sequelize;

const Prison = sequelize.import("./../models/Prison.js");

function createReport(_repostPostId, _originalPostId, _username) {
  return Prison.create({
    repostPostId: _repostPostId,
    originalPostId: _originalPostId,
    username: _username,
    confirmations: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

async function reportExist(_repostPostId) {
  return await Prison.findByPk(_repostPostId) != null;
}

function getAllReports(){
  return Prison.findAll();
}

async function addConfirmation(_postId, _type){
  let report = await Prison.findByPk(_postId);
  if(report!= null){
    let i;
    if (_type) {
      i = 1;
    } else {
      i = -1;
    }
    sequelize.query("UPDATE Prisons SET confirmation = confirmation +" + i + " WHERE postId = " + _postId);
  }
}


module.exports = {
  createReport,
  reportExist,
  getAllReports,
  addConfirmation
};
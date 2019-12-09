const Sequelize  = require('./../utilities/sequelize');
const sequelize = Sequelize.sequelize;

const Prison = sequelize.import("../models/Prison.js");

function createReport(_originalPostId, _repostPostId, _username) {
  return Prison.create({
    repostPostId: _repostPostId,
    originalPostId: _originalPostId,
    username: _username,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

async function reportExist(_repostPostId) {
  return await Prison.findByPk(_repostPostId) != null;
}

module.exports = {
  createReport,
  reportExist
};
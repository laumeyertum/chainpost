const schedule = require('node-schedule');
const prisonLogic = require('./../bussinesLogic/prisonLogic');

const processLikes5 = schedule.scheduledJobs('*/5 * * * *', async function() {
  await prisonLogic.resolveReports();
});

const processLikes24 = schedule.scheduledJobs('* 0 * * *', async function() {
  await prisonLogic.resolveReports();
});

const processLikes7 = schedule.scheduledJobs('* * * * 0', async function() {
  await prisonLogic.resolveReports();
});

module.exports = {
  processLikes5,
  processLikes24,
  processLikes7
};
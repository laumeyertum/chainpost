const Sequelize = require('sequelize');
const sequelize = new Sequelize('chainpost', 'chainpost', 'blockchain', {
  host: 'localhost',
  dialect:'mariadb'
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
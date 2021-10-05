const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedJob = require('./jobData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedJob();

  process.exit(0);
};

seedAll();

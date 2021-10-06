const sequelize = require('../config/connection');
const seedJob = require('./jobData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedJob();

  process.exit(0);
};

seedAll();

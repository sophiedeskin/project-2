const User = require('./users');
const Job = require('./jobs');

User.hasMany(Job, {
    foreignKey: 'user_id',
  });

Job.belongsTo(User, {
    foreignKey: 'user_id',
  });

  module.exports = { User, Job };
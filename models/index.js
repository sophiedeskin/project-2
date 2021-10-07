const User = require('./users');
const Job = require('./jobs');

User.hasMany(Job, {
    foreignKey: 'user_id',
    onDelete: "CASCADE"
  });

Job.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "CASCADE"
  });

  module.exports = { User, Job };
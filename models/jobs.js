const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Job extends Model {}

Job.init(
  {
    job_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job_company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job_salary: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    job_technologies: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    job_contact: {
        type: DataTypes.STRING,
        allowNull: false,
      }
   
  },
  {
    sequelize,

  }
);

module.exports = Job;

// note
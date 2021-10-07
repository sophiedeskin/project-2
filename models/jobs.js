const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Job extends Model {}

Job.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
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
      },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "job",
  }
);

module.exports = Job;

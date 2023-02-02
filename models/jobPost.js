const Sequelize = require('sequelize');

module.exports = (sequelize) =>
{
const JobPosts = sequelize.define('jobPost', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  requirements: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  offer: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  job_category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  department: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  job_type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  total_positions: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  experience: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  posting_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  apply_before: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});
  return JobPosts;
};
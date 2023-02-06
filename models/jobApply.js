const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const jobApply = sequelize.define("jobApply", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    resume: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
      },

  });

  return jobApply;
};

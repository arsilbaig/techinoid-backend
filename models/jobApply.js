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
    subject: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT('long'),
      unique: false,
      allowNull: false,
    },
    document: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
      },

  });

  return jobApply;
};

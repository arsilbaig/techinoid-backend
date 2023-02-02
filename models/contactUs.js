const Sequelize = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const contactUs = sequelize.define("contactUs", {
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
      unique: true,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
  });

  return contactUs;
};

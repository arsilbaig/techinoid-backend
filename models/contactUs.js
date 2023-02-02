const Sequelize = require("sequelize");
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
  });

  return contactUs;
};

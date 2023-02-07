const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const connect = sequelize.define("connect", {
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
  });

  return connect;
};

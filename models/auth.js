const Sequelize = require('sequelize');
const { sequelize } = require('.');

module.exports=(sequelize, DataTypes) => {
const Auth = sequelize.define('Auth', {
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

  firstName: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}
);

return Auth;
}
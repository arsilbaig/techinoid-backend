const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define('blog', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    publishedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return Blog;
};

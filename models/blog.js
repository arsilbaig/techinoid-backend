const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define('blog', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    publishedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return Blog;
};

const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define('blog', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    publishedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return Blog;
};

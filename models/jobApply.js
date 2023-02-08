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
      unique: false,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    resume: {
      type: DataTypes.TEXT('long'),
      allowNull:false,
    },
    jobPostid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "jobPosts",
        key: "id"
      },
    }
  }, {
    sequelize,
    tableName: 'jobApply',
    timestamps: true,
    indexes: [
      {
        name: "fk_id",
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

  return jobApply;
};

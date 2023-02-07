const path = require("path");
const DataTypes = require("sequelize").DataTypes;
const Sequelize = require("sequelize");
const jobPost = require("../models/jobPost");
const jobApply = require("../models/jobApply");
const env = process.env.NODE_ENV || "development";
const config = require(`${__dirname}/../config/config.json`)[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.blog = require("../models/blog")(sequelize, DataTypes);
db.portfolio = require("../models/portfolio")(sequelize, DataTypes);
db.auth = require("../models/auth")(sequelize, DataTypes);
db.jobPost = require("../models/jobPost")(sequelize, DataTypes);
db.contactUs = require("../models/contactUs")(sequelize, DataTypes);
db.jobApply = require("../models/jobApply")(sequelize, DataTypes);
db.connect = require("../models/connect")(sequelize, DataTypes);


db.jobPost.hasMany(db.jobApply, { foreignKey: 'jobPostid' });
db.jobApply.belongsTo(db.jobPost, { foreignKey: 'jobPostid' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

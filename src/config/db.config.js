const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

const config = require('./index');

dotenv.config();

const sequelize = new Sequelize(config.DB.DATABASE, config.DB.USER, config.DB.PASSWORD,
  {
    dialect: 'mysql',
    host: config.DB.HOST,
    // port: config.DB.PORT || 3306,
    define: {
      timestamps: false,
    },
  });

(async () => await sequelize.sync())();

module.exports = sequelize;

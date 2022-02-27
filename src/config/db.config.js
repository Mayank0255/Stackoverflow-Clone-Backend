const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

const config = require('./index');

dotenv.config();

const sequelize = new Sequelize('heroku_5b3edd6ff48e9ee', 'bcf35dc4b59c09', 'bfd4f1f2',
  {
    dialect: 'mysql',
    host: 'us-cdbr-east-05.cleardb.net',
    port: config.DB.PORT || 3306,
    define: {
      timestamps: false,
    },
  });

(async () => await sequelize.sync())();

module.exports = sequelize;

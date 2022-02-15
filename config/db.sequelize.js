const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD,
  {
    dialect: 'mysql',
    host: process.env.HOST,
    port: process.env.PORTDB || 3306,
    define: {
      timestamps: false,
    },
  });

(async () => await sequelize.sync({ alter: true }))();

module.exports = sequelize;

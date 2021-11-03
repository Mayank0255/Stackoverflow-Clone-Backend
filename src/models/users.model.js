const Sequelize = require('sequelize');
const db = require('../../config/db.sequelize');

// constructor
// eslint-disable-next-line func-names
const User = function (user) {
  this.username = user.username;
  this.password = user.password;
};

const UsersModelSequelize = db.define('users', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING(255),
    allowNull: false,
    unique: 'username',
  },
  password: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  views: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  db,
  tableName: 'users',
  timestamps: false,
  indexes: [
    {
      name: 'PRIMARY',
      unique: true,
      using: 'BTREE',
      fields: [
        { name: 'id' },
      ],
    },
    {
      name: 'username',
      unique: true,
      using: 'BTREE',
      fields: [
        { name: 'username' },
      ],
    },
  ],
});

module.exports = { User, UsersModelSequelize };

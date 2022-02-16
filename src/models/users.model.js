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
    allowNull: false,
  },
  views: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  db,
  underscored: true,
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

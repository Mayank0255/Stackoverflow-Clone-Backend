const { Sequelize, DataTypes } = require('sequelize');
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
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: 'username',
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  views: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
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

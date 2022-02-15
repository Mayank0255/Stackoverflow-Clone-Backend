const Sequelize = require('sequelize');
const db = require('../../config/db.sequelize');
const { PostsModelSequelize } = require('./posts.model');
const { AnswersModelSequelize } = require('./answers.model');
const { CommentsModelSequelize } = require('./comments.model');

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

UsersModelSequelize.hasMany(CommentsModelSequelize, {
  foreignKey: 'user_id',
});
CommentsModelSequelize.belongsTo(UsersModelSequelize);

UsersModelSequelize.hasMany(AnswersModelSequelize, {
  foreignKey: 'user_id',
});
AnswersModelSequelize.belongsTo(UsersModelSequelize);

UsersModelSequelize.hasMany(PostsModelSequelize, {
  foreignKey: 'user_id',
});
PostsModelSequelize.belongsTo(UsersModelSequelize);

module.exports = { User, UsersModelSequelize };

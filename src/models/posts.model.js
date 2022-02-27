const { DataTypes } = require('sequelize');
const db = require('../config/db.config');

// constructor
// eslint-disable-next-line func-names
const Post = function (post) {
  this.title = post.title;
  this.body = post.body;
  this.userId = post.userId;
  this.tagName = post.tagName;
};

const PostsModelSequelize = db.define('posts', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  title: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  views: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  db,
  tableName: 'posts',
  underscored: true,
  timestamps: true,
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
      name: 'user_id',
      using: 'BTREE',
      fields: [
        { name: 'user_id' },
      ],
    },
  ],
});

module.exports = { Post, PostsModelSequelize };

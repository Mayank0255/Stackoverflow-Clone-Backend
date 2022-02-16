const { Sequelize, DataTypes } = require('sequelize');
const db = require('../../config/db.sequelize');

// eslint-disable-next-line func-names
const Comment = function (answer) {
  this.body = answer.body;
  this.user_id = answer.user_id;
  this.post_id = answer.post_id;
};

const CommentsModelSequelize = db.define('comments', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  db,
  tableName: 'comments',
  underscored: true,
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
      name: 'post_id',
      using: 'BTREE',
      fields: [
        { name: 'post_id' },
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

module.exports = { Comment, CommentsModelSequelize };

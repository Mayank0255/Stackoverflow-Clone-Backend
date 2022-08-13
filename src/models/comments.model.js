const { DataTypes } = require('sequelize');
const db = require('../config/db.config');

const CommentsModel = db.define('comments', {
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
}, {
  db,
  tableName: 'comments',
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

module.exports = { CommentsModel };

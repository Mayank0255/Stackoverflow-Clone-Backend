const { Sequelize, DataTypes } = require('sequelize');
const db = require('../../config/db.sequelize');

const TagsModelSequelize = db.define('tags', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  tagname: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: 'tagname',
  },
  description: {
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
  tableName: 'tags',
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
      name: 'tagname',
      unique: true,
      using: 'BTREE',
      fields: [
        { name: 'tagname' },
      ],
    },
  ],
});

module.exports = { TagsModelSequelize };

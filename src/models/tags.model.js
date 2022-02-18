const { Sequelize, DataTypes } = require('sequelize');
const db = require('../../config/db.sequelize');

const TagsModelSequelize = db.define('tags', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
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
}, {
  db,
  tableName: 'tags',
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

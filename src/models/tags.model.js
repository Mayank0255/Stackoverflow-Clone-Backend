const Sequelize = require('sequelize');
const db = require('../../config/db.sequelize');

// constructor
// eslint-disable-next-line func-names
const Tag = function () {};

const TagsModelSequelize = db.define('tags', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  tagname: {
    type: Sequelize.STRING(255),
    allowNull: false,
    unique: 'tagname',
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
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

module.exports = { Tag, TagsModelSequelize };

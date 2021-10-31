const Sequelize = require('sequelize');
const db = require('../../config/db.sequelize');
const { Posts } = require('./posts.model');
const { PostTag } = require('./posttag.model');

// constructor
// eslint-disable-next-line func-names
const Tag = function () {};

const Tags = db.define('tags', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  tagname: {
    type: Sequelize.STRING(255),
    allowNull: true,
    unique: 'tagname',
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  db,
  tableName: 'tags',
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

// eslint-disable-next-line object-curly-newline
Tags.belongsToMany(Posts, { through: PostTag, foreignKey: 'tag_id' });
Posts.belongsToMany(Tags, { through: PostTag, foreignKey: 'post_id' });

module.exports = { Tag, Tags };

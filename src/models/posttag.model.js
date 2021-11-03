const Sequelize = require('sequelize');
const db = require('../../config/db.sequelize');

const PostTagModelSequelize = db.define('posttag', {
  created_at: {
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  db,
  tableName: 'posttag',
  timestamps: false,
  indexes: [
    {
      name: 'PRIMARY',
      unique: true,
      using: 'BTREE',
      fields: [
        { name: 'post_id' },
        { name: 'tag_id' },
      ],
    },
    {
      name: 'tag_id',
      using: 'BTREE',
      fields: [
        { name: 'tag_id' },
      ],
    },
  ],
});

module.exports = { PostTagModelSequelize };

const db = require('../config/db.config');

const PostTagModelSequelize = db.define('posttag', {}, {
  db,
  tableName: 'posttag',
  underscored: true,
  timestamps: true,
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

const Sequelize = require('sequelize');
const db = require('../../config/db.sequelize');

// eslint-disable-next-line func-names
const Answer = function (answer) {
  this.body = answer.body;
  this.user_id = answer.user_id;
  this.post_id = answer.post_id;
};

const AnswersModelSequelize = db.define('answers', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: true,
    primaryKey: true,
  },
  body: {
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
  tableName: 'answers',
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

module.exports = { Answer, AnswersModelSequelize };

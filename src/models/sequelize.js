const Sequelize = require('sequelize');

const { UsersModelSequelize } = require('./users.model');
const { PostsModelSequelize } = require('./posts.model');
const { TagsModelSequelize } = require('./tags.model');
const { PostTagModelSequelize } = require('./posttag.model');
const { AnswersModelSequelize } = require('./answers.model');
const { CommentsModelSequelize } = require('./comments.model');

UsersModelSequelize.hasMany(PostsModelSequelize, {
  foreignKey: 'user_id',
});
PostsModelSequelize.belongsTo(UsersModelSequelize);

UsersModelSequelize.hasMany(CommentsModelSequelize, {
  foreignKey: 'user_id',
});
CommentsModelSequelize.belongsTo(UsersModelSequelize);

UsersModelSequelize.hasMany(AnswersModelSequelize, {
  foreignKey: 'user_id',
});
AnswersModelSequelize.belongsTo(UsersModelSequelize);

PostsModelSequelize.hasMany(CommentsModelSequelize, {
  foreignKey: 'post_id',
});
CommentsModelSequelize.belongsTo(PostsModelSequelize);

PostsModelSequelize.hasMany(AnswersModelSequelize, {
  foreignKey: 'post_id',
});
AnswersModelSequelize.belongsTo(PostsModelSequelize);

PostsModelSequelize.belongsToMany(TagsModelSequelize, { through: PostTagModelSequelize, foreignKey: 'post_id' });
TagsModelSequelize.belongsToMany(PostsModelSequelize, { through: PostTagModelSequelize, foreignKey: 'tag_id' });

module.exports = {
  UsersModelSequelize,
  PostsModelSequelize,
  TagsModelSequelize,
  PostTagModelSequelize,
  AnswersModelSequelize,
  CommentsModelSequelize,
};

const { UsersModel } = require('./users.model');
const { PostsModel } = require('./posts.model');
const { TagsModel } = require('./tags.model');
const { PostTagModel } = require('./posttag.model');
const { AnswersModel } = require('./answers.model');
const { CommentsModel } = require('./comments.model');

UsersModel.hasMany(PostsModel, {
  foreignKey: { name: 'user_id', allowNull: false },
});
PostsModel.belongsTo(UsersModel);

UsersModel.hasMany(CommentsModel, {
  foreignKey: { name: 'user_id', allowNull: false },
});
CommentsModel.belongsTo(UsersModel);

UsersModel.hasMany(AnswersModel, {
  foreignKey: { name: 'user_id', allowNull: false },
});
AnswersModel.belongsTo(UsersModel);

PostsModel.hasMany(CommentsModel, {
  foreignKey: { name: 'post_id', allowNull: false },
});
CommentsModel.belongsTo(PostsModel);

PostsModel.hasMany(AnswersModel, {
  foreignKey: { name: 'post_id', allowNull: false },
});
AnswersModel.belongsTo(PostsModel);

PostsModel.belongsToMany(TagsModel, { through: PostTagModel, foreignKey: { name: 'post_id', allowNull: false } });
TagsModel.belongsToMany(PostsModel, { through: PostTagModel, foreignKey: { name: 'tag_id', allowNull: false } });

module.exports = {
  UsersModel,
  PostsModel,
  TagsModel,
  PostTagModel,
  AnswersModel,
  CommentsModel,
};

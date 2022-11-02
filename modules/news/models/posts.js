'use strict';
const {
  Model
} = require('sequelize');
const Categories = require('./categories');
const coreModels = require('./index');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {as: 'creator', foreignKey: 'creatorId'});

      this.belongsTo(models.Categories, { as: 'categories', foreignKey: 'categoryId' });
    }
  }
  Posts.init({
    slug: DataTypes.STRING,
    title: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    creatorId: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'posts',
    modelName: 'Posts',
  });

  return Posts
};
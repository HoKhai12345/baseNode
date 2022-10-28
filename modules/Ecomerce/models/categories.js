'use strict';
const Post = require('./products');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Categories.init({
    name: DataTypes.STRING,
    thumbnail: DataTypes.STRING
  }, {
    sequelize: sequelize,
    tableName: 'categories',
    modelName: 'Categories',
  });

  return Categories

  //! Define relationship to each class here

  // Categories.hasMany(Post, {as: 'products'})
}
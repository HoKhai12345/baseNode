'use strict';
const {
  Model
} = require('sequelize');
const Categories = require('./categories');
const coreModels = require('./index');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     this.belongsTo(models.Categories, { as:'cate' , foreignKey: 'categoryId' });
    }
  }
  Products.init({
    name: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'products',
    modelName: 'Products',
  });

  return Products
};
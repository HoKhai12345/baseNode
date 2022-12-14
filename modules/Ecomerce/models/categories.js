'use strict';
const Products = require('./products');

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
      models.Categories.hasMany(models.Products, { as: "products" });
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

  const Products = sequelize.define('Products', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  const Cate = sequelize.define('Categories', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    thumbnail: {
      type: DataTypes.STRING
    }
  });

  return Categories

  //! Define relationship to each class here
}
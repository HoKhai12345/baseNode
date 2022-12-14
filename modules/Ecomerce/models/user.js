'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Roles, {
        as: 'roles',
        through: models.Users_Roles,
        constraints: false
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};
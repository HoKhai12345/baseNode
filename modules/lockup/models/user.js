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
      // this.hasMany(models.Posts, { as: "posts" });

      this.belongsToMany(models.Roles, {
        as: 'roles',
        through: models.Users_Roles,
        constraints: false
      });
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};
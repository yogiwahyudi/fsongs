'use strict';
const bcrypt = require('bcryptjs')
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
      User.hasMany(models.Favorite, {foreignKey:'userId'})
    }
  }
  User.init({
    email:{
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty:{
          arg:true,
          msg: 'Email cannot be null'
        },
        isEmail:{
          arg: true,
          msg : 'Email or Password Invalid'
        }
      }
    }, 
    password:{
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          arg: true,
          msg: 'Password cannot be null'
        },
        len: [5, 8]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate(user, opt){
        user.password = bcrypt.hashSync(user.password, 10)
      }
    }
  });
  return User;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCredential extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    // UserCredential thuộc về 1 User (1:1)
    UserCredential.belongsTo(models.User, { foreignKey: 'user_id' });
}
  }
  UserCredential.init({
    password_hash: DataTypes.STRING,
    last_login: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserCredential',
  });
  return UserCredential;
};
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
    // 1. User và Credentials (1:1)
    User.hasOne(models.UserCredential, { foreignKey: 'user_id' });

    // 2. User và Role (N:N qua UserRole)
    User.belongsToMany(models.Role, { 
        through: models.UserRole, 
        foreignKey: 'user_id', 
        otherKey: 'role_id',
        as: 'Roles'
    });

    // 3. User và Class (Contextual Role N:N qua ClassUser)
    User.belongsToMany(models.Class, { 
        through: models.ClassUser, 
        foreignKey: 'user_id', 
        otherKey: 'class_code',
        as: 'Classes'
    });

    // 4. User là người tạo (Creator/Owner) của Class (1:N)
    User.hasMany(models.Class, { foreignKey: 'creator_id', as: 'CreatedClasses' });
    
    // 5. User có nhiều Submissions và Notifications (1:N)
    User.hasMany(models.Submission, { foreignKey: 'user_id' });
    User.hasMany(models.Notification, { foreignKey: 'sender_id' });
}
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
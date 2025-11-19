'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    // 1. Role và User (N:N qua UserRole)
    Role.belongsToMany(models.User, { 
        through: models.UserRole, 
        foreignKey: 'role_id', 
        otherKey: 'user_id',
        as: 'Users'
    });

    // 2. Role và Permission (N:N qua RolePermission)
    Role.belongsToMany(models.Permission, { 
        through: models.RolePermission, 
        foreignKey: 'role_id', 
        otherKey: 'permission_id',
        as: 'Permissions'
    });
}
  }
  Role.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};
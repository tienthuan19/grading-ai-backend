'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    // Permission và Role (N:N qua RolePermission)
    Permission.belongsToMany(models.Role, { 
        through: models.RolePermission, 
        foreignKey: 'permission_id', 
        otherKey: 'role_id',
        as: 'Roles'
    });
}
  }
  Permission.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Permission',
  });
  return Permission;
};
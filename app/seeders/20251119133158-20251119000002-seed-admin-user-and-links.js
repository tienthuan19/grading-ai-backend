'use strict';
const bcrypt = require('bcryptjs'); // Cần bcrypt để hash mật khẩu

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    const hashedPassword = await bcrypt.hash('admin123456', 12); // Hash mật khẩu 'admin123456'

    // --- 1. Tạo Tài khoản Admin (ID: 1) ---
    await queryInterface.bulkInsert('Users', [{
      id: 1,
      username: 'Super Admin',
      email: 'admin@ai.edu.vn',
      deletedAt: null,
      createdAt: now,
      updatedAt: now
    }]);

    // --- 2. Tạo Credentials (Mật khẩu) cho Admin ---
    await queryInterface.bulkInsert('UserCredentials', [{
      user_id: 1, // Liên kết với User ID 1
      password_hash: hashedPassword, 
      last_login: null,
      createdAt: now,
      updatedAt: now
    }]);
    
    // --- 3. Liên kết Roles và Permissions (RolePermissions) ---
    // (Admin ID: 1, Teacher ID: 2, Student ID: 3)
    // (Permissions ID: 1 -> 8)
    const rolePermissionsData = [];

    // Admin (ID 1): Có toàn quyền (Permissions 1-8)
    for (let i = 1; i <= 8; i++) {
        rolePermissionsData.push({ role_id: 1, permission_id: i, createdAt: now, updatedAt: now });
    }

    // Teacher (ID 2): Quyền quản lý
    rolePermissionsData.push({ role_id: 2, permission_id: 1, createdAt: now, updatedAt: now }); // user:read_all
    rolePermissionsData.push({ role_id: 2, permission_id: 3, createdAt: now, updatedAt: now }); // class:create
    rolePermissionsData.push({ role_id: 2, permission_id: 5, createdAt: now, updatedAt: now }); // assignment:create
    rolePermissionsData.push({ role_id: 2, permission_id: 7, createdAt: now, updatedAt: now }); // grade:view_all
    rolePermissionsData.push({ role_id: 2, permission_id: 8, createdAt: now, updatedAt: now }); // grade:edit_final

    // Student (ID 3): Quyền học tập
    rolePermissionsData.push({ role_id: 3, permission_id: 6, createdAt: now, updatedAt: now }); // submission:submit

    await queryInterface.bulkInsert('RolePermissions', rolePermissionsData);

    // --- 4. Liên kết Admin với Role 'Admin' (UserRoles) ---
    await queryInterface.bulkInsert('UserRoles', [{
      user_id: 1, // User Super Admin
      role_id: 1, // Role Admin
      createdAt: now,
      updatedAt: now
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { email: 'admin@ai.edu.vn' }, {});
    await queryInterface.bulkDelete('UserCredentials', { user_id: 1 }, {});
    await queryInterface.bulkDelete('UserRoles', null, {});
    await queryInterface.bulkDelete('RolePermissions', null, {});
  }
};
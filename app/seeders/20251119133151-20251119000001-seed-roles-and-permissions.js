'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    
    // --- 1. Seed Roles (Vai trò) ---
    await queryInterface.bulkInsert('Roles', [
      { id: 1, name: 'Admin', description: 'Quản trị viên hệ thống (Toàn quyền)', createdAt: now, updatedAt: now },
      { id: 2, name: 'Teacher', description: 'Giáo viên (Quản lý lớp học và chấm điểm)', createdAt: now, updatedAt: now },
      { id: 3, name: 'Student', description: 'Học sinh (Nộp bài và xem điểm cá nhân)', createdAt: now, updatedAt: now }
    ]);

    // --- 2. Seed Permissions (Quyền hạn) ---
    await queryInterface.bulkInsert('Permissions', [
      // Quyền chung
      { id: 1, name: 'user:read_all', description: 'Xem danh sách tất cả người dùng', createdAt: now, updatedAt: now },
      { id: 2, name: 'user:manage_all', description: 'Tạo/sửa/xóa bất kỳ người dùng nào', createdAt: now, updatedAt: now },
      // Quyền lớp học
      { id: 3, name: 'class:create', description: 'Tạo lớp học mới', createdAt: now, updatedAt: now },
      { id: 4, name: 'class:manage', description: 'Quản lý, xóa lớp học của người khác', createdAt: now, updatedAt: now },
      // Quyền bài tập
      { id: 5, name: 'assignment:create', description: 'Tạo/sửa bài tập mới', createdAt: now, updatedAt: now },
      { id: 6, name: 'submission:submit', description: 'Nộp bài tập (cá nhân)', createdAt: now, updatedAt: now },
      // Quyền chấm điểm
      { id: 7, name: 'grade:view_all', description: 'Xem điểm, câu trả lời của tất cả học sinh', createdAt: now, updatedAt: now },
      { id: 8, name: 'grade:edit_final', description: 'Sửa điểm cuối cùng (score_final)', createdAt: now, updatedAt: now },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
    await queryInterface.bulkDelete('Permissions', null, {});
  }
};
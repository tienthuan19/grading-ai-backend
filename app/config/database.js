// Nạp các biến môi trường từ file .env
require('dotenv').config();

module.exports = {
    // Cấu hình cho môi trường development
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        // Cấu hình connection pool để tối ưu hiệu năng
        pool: {
            max: 5,   // Số kết nối tối đa trong pool
            min: 0,   // Số kết nối tối thiểu
            acquire: 30000, // Thời gian (ms) tối đa để cố gắng có được kết nối trước khi báo lỗi
            idle: 10000     // Thời gian (ms) tối đa mà một kết nối có thể "nhàn rỗi" trước khi bị giải phóng
        }
    },
    // Cấu hình cho môi trường production (bạn sẽ cần các biến môi trường riêng)
    production: {
        username: process.env.PROD_DB_USER,
        password: process.env.PROD_DB_PASSWORD,
        database: process.env.PROD_DB_DATABASE,
        host: process.env.PROD_DB_HOST,
        port: process.env.PROD_DB_PORT,
        dialect: 'mysql',
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
};
const { Sequelize } = require('sequelize');

// Lấy môi trường hiện tại, mặc định là 'development'
const env = process.env.NODE_ENV || 'development';
// Nạp cấu hình tương ứng với môi trường từ file config
const config = require(__dirname + '/../config/database.js')[env];

// Khởi tạo một đối tượng Sequelize
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

// Hàm để kiểm tra kết nối đến database
const checkConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Connection to the database has been established successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
};

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.checkConnection = checkConnection;

// Load các model (ví dụ)
// db.User = require('./user.model.js')(sequelize, Sequelize);

module.exports = db;
const Sequelize = require('sequelize');

/** 创建一个 Sequelize 对象，并连接到 mysql 数据库 */
const sequelize = new Sequelize('share_photo', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});

module.exports = sequelize;

const Sequelize = require('sequelize');
const sequelize = require('../db/conn_pool');
const utils = require('../utils/common');


/** 与数据库里的 user_info 表的字段一一对应 */
const UserInfo = sequelize.define('user_info', {
    uuid: {type: Sequelize.STRING(64), primaryKey: true, allowNull: false},
    department: Sequelize.STRING(255),
    major: Sequelize.STRING(255),
    admission_time: Sequelize.INTEGER(4),
    graduation_time: Sequelize.INTEGER(4),
    hobby: Sequelize.STRING(1024),
    about_me: Sequelize.STRING(2048),
    create_time: Sequelize.INTEGER(11),
    update_time: Sequelize.INTEGER(11)
}, {
    timestamps: false,
    tableName: 'user_info'
});

UserInfo.beforeCreate((userinfo, options) => {
    const current_time = utils.getUnixTime();
    userinfo.create_time = current_time;
    userinfo.update_time = current_time;
});

UserInfo.beforeUpdate((userinfo, options) => {
    userinfo.update_time = utils.getUnixTime();
});

module.exports = UserInfo;

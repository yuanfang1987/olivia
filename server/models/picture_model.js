const Sequelize = require('sequelize');
const sequelize = require('../db/conn_pool');
const utils = require('../utils/common');

/** 与数据库里的 pictures 的字段一一对应 */
const Picture = sequelize.define('picture', {
    uuid: {type: Sequelize.STRING(64), primaryKey: true, allowNull: false},
    user_id: {type: Sequelize.STRING(64), allowNull: false},
    store_path: Sequelize.STRING(255),
    description: Sequelize.STRING(255),
    stat: Sequelize.INTEGER(1),
    like_count: Sequelize.INTEGER(11),
    create_time: Sequelize.INTEGER(11),
    update_time: Sequelize.INTEGER(11)
}, {
    timestamps: false,
    tableName: 'pictures'
});

/** 执行 Create 方法前的回调函数 */
Picture.beforeCreate((picture, options) => {
    const current_time = utils.getUnixTime();
    picture.create_time = current_time;
    picture.update_time = current_time;
});

/** 执行 update操作前的回调函数 */
Picture.beforeUpdate((picture, options) => {
    picture.update_time = utils.getUnixTime();
});

module.exports = Picture;

const Sequelize = require('sequelize');
const sequelize = require('../db/conn_pool');
const utils = require('../utils/common');

const User = sequelize.define('user', {
    uuid: {type: Sequelize.STRING(64), primaryKey: true, allowNull: false},
    email: {type: Sequelize.STRING(255), allowNull: false},
    password: {type: Sequelize.STRING(255), allowNull: false},
    status: {type: Sequelize.INTEGER(10), allowNull: false},
    name: Sequelize.STRING(64),
    avatar: Sequelize.STRING(1024),
    gender: Sequelize.INTEGER(11),
    role: Sequelize.STRING(255),
    lock_time: Sequelize.INTEGER(11),
    delete_time: Sequelize.INTEGER(11),
    create_time: Sequelize.INTEGER(11),
    update_time: Sequelize.INTEGER(11)
},{
    timestamps: false,
    tableName: 'users'
});

User.beforeCreate((user, options) => {
    const current_time = utils.getUnixTime();
    user.create_time = current_time;
    user.update_time = current_time;
});

User.beforeUpdate((user, options) => {
    user.update_time = utils.getUnixTime();
});

module.exports = User;

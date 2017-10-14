const Sequelize = require('sequelize');
const sequelize = require('../db/conn_pool');
const utils = require('../utils/common');


const Picture = sequelize.define('picture', {
    uuid: {type: Sequelize.STRING(64), primaryKey: true, allowNull: false},
    user_id: {type: Sequelize.STRING(64), allowNull: false},
    store_path: Sequelize.STRING(255),
    description: Sequelize.STRING(255),
    status: Sequelize.INTEGER(11),
    like_count: Sequelize.INTEGER(11),
    create_time: Sequelize.INTEGER(11),
    update_time: Sequelize.INTEGER(11)
}, {
    timestamps: false,
    tableName: 'pictures'
});

Picture.beforeCreate((picture, options) => {
    const current_time = utils.getUnixTime();
    picture.create_time = current_time;
    picture.update_time = current_time;
});

Picture.beforeUpdate((picture, options) => {
    picture.update_time = utils.getUnixTime();
});

module.exports = Picture;

const User = require('../models/user_model');
const UserInfo = require('../models/user_info_model');
const utils = require('../utils/common');

exports.getUsers = function (req, res) {
    User.findAll().then(users => {
        res.status(200).json({res_code: 1, users});
    }).catch(err => {
        res.status(200).json({res_code: 0, message: err});
    });
};


/** 注册用户 */
exports.registerUser = function (req, res) {
    /**
     *  请求体结构：
     *  {
	        "email": "201710071110aa@qq.com",
	        "password": "Aa123456",
	        "gender": 0, // 0 女， 1 男
	        "name": "Matt"
        }
     *
     * */
    const body = req.body;
    const email = body.email;
    const password = utils.cryptPwd(body.password);
    const name = body.name;
    const gender = body.gender;

    console.log('---------register user info---------');
    console.log('email: ', email);
    console.log('name: ', name);

    const uuid = utils.generateUUID();
    const status = 1;
    User.create({uuid, email, password, status, name, gender})
        .then(user => {
            UserInfo.create({uuid: user.uuid}).then(userinfo => {
                console.log('insert data to user_info table: ', userinfo);
                req.session.user_id = uuid;
                res.status(200).json({res_code: 1, user});
            }).catch(err => {
                console.log('insert into user_info table fail: ', err.toString());
                res.status(200).json({res_code: 0, message: err.toString()});
            });
    }).catch(err => {
            res.status(200).json({res_code: 0, message: err.toString()});
    })
};

/** 登录 */
exports.login = function (req, res) {
    /**
     *  请求体结构：
     *  {
	        "email": "201710071110aa@qq.com",
	        "password": "Aa123456"
        }
     *
     * */
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (utils.cryptPwd(req.body.password) === user['password']) {
            req.session.user_id = user['uuid'];
            res.status(200).json({res_code: 1, user});
        } else {
            res.status(200).json({res_code: 0, message: 'password invalid'});
        }
    }).catch(err => {
        console.log('query user fail: ', err);
        res.status(200).json({res_code: 0, message: 'user not exist'});
    })

};

/** 登出 */
exports.logout = function (req, res) {
    console.log('enter logout.');
    if (req.session.user_id) {
        console.log('found user_id in session');
        req.session.destroy();
        res.status(200).json({res_code: 1});
    } else {
        console.log('not found user_id');
        res.status(200).json({res_code: 0, message: 'user not login'})
    }
};

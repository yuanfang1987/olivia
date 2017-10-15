const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user_controller');
const user_info_controller = require('../controllers/user_info_controller');
const picture_controller = require('../controllers/picture_controller');


// 中间件,记录操作时间, 判断用户是否已登录
router.use(function authController(req, res, next) {
    console.log('execute time: ', new Date());
    console.log('url: ', req.url);
    console.log('cookie: ', req.cookie);
    console.log('session: ', req.session);
    console.log('session id: ', req.sessionID);

    if ((req.url.indexOf('register')>-1) || (req.url.indexOf('login')>-1)) {
        next();
    } else {
        if (!req.session.user_id) {
            console.log('login require!');
            res.status(200).json({res_code: 0, message: "user not login!"});
        } else {
            next();
        }
    }
});

// 与用户相关的路由
router.get('/user/fetch-all-users', user_controller.getUsers);
router.post('/user/register', user_controller.registerUser);
router.post('/user/login', user_controller.login);
router.post('/user/logout', user_controller.logout);
router.post('/user/update', user_info_controller.updateUserInfo);

// 处理图片相关的路由
router.post('/picture/upload', picture_controller.savePicture);
router.get('/picture/all', picture_controller.getPicturesByUserID);

module.exports = router;

const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user_controller');
const user_info_controller = require('../controllers/user_info_controller');
const picture_controller = require('../controllers/picture_controller');


/** 中间件,记录操作时间, 判断用户是否已登录 */
router.use(function authController(req, res, next) {
    console.log('execute time: ', new Date());
    console.log('url: ', req.url);
    console.log('cookie: ', req.cookie);
    console.log('session: ', req.session);
    console.log('session id: ', req.sessionID);

    /** 如果是用户注册或登录的请求，则无需检查 session 有没有 user_id */
    if ((req.url.indexOf('register')>-1) || (req.url.indexOf('login')>-1)) {
        next();
    } else {
        /** 否则先判断有无 user_id，有则放行，无则拦截，阻止其进一步操作 */
        if (!req.session.user_id) {
            console.log('login require!');
            res.status(200).json({res_code: 0, message: "用户未登录"});
        } else {
            next();
        }
    }
});

/** 配置与用户相关的路由，包括注册、登录、登出、更新用户信息等 */
router.get('/user/fetch-all-users', user_controller.getUsers);
router.post('/user/register', user_controller.registerUser);
router.post('/user/login', user_controller.login);
router.delete('/user/logout', user_controller.logout);
router.post('/user/update', user_info_controller.updateUserInfo);

/** 处理图片相关的路由， 上传图片、删除图片、获取图片 */
router.post('/picture/upload', picture_controller.savePicture);
router.get('/picture/all', picture_controller.getPicturesByUserID);
router.post('/picture/destroy', picture_controller.deletePicturesByUserID);

/** 导出路由模块 */
module.exports = router;

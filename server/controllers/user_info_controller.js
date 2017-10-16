const UserInfo = require('../models/user_info_model');

/** 更新用户信息 */
exports.updateUserInfo = function (req, res) {
    const uuid = req.session.user_id;
    const department = req.body.department;
    const major = req.body.major;
    const admission_time = req.body.admission_time;
    const graduation_time = req.body.graduation_time;
    const hobby = req.body.hobby;
    const about_me = req.body.about_me;

    UserInfo.update({
        department,
        major,
        admission_time,
        graduation_time,
        hobby,
        about_me
    }, {
        where: {
            uuid: uuid
        }
    }).then(() => {
        res.status(200).json({res_code: 1, message: 'update user info success'});
    }).catch(err => {
        res.status(200).json({res_code: 0, message: err});
    })

};

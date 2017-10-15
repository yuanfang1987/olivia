var fs = require('fs');
var Sequelize = require('sequelize');
var utils = require('../utils/common');
var Picture = require('../models/picture_model');

exports.savePicture = function (req, res) {
    /**
     * 请求体结构
     *   {
     *      "base64str": ""
     *      "desc": ""
     *   }
     *
     * */
    console.log('enter savePicture function');
    const user_id = req.session.user_id;
    const base64Str = req.body.base64str;
    const description = req.body.desc;

    const file_path = './picture/'+utils.getUnixTime()+'.jpg';
    const str = base64Str.replace(/^data:image\/\w+;base64,/, '');
    const bitmap = new Buffer(str, 'base64');

    fs.writeFile(file_path, bitmap, function (err) {
        if (err) {
            console.log('save file fail: ', err);
            res.status(200).json({res_code: 0, message: err});
        } else {
            console.log('save file success.');
            // 把路径及图片描述写入数据库
            const uuid = utils.generateUUID();
            const store_path = file_path.replace('./', '');
            Picture.create({uuid, user_id, store_path, description, stat: 1}).then(picture => {
                res.status(200).json({res_code: 1, picture});
            }).catch(err => {
                console.log('save picture to db fail: ', err);
                res.status(200).json({res_code: 0, message: err});
            });
        }
    });

};

exports.getPicturesByUserID = function(req, res) {
    /**
     *{
        attributes: ['store_path', 'description']
    },
     * */
    console.log('enter getPicturesByUserID function');
    const user_id = req.session.user_id;
    Picture.findAll({
        attributes: ['store_path', 'description'],
        where: {
            user_id: user_id,
            stat: 1
        }
    }).then(pictures => {
        /** 解析赋值 */
        res.status(200).json({res_code: 1, pictures});
    }).catch(err => {
        console.log('get pictures fail: ', err);
        res.status(200).json({res_code: 1, error});
    })

};

exports.deletePicturesByUserID = function(req, res){
    console.log('enter deletePicturesByUserID function');
    const user_id = req.session.user_id;
    const pictures = req.body.picture_paths;
    const Op = Sequelize.Op;
    Picture.update({
        stat: 0
    }, {
        where: {
            user_id: user_id,
            store_path: {
                [Op.in]: pictures
            },
        }
    }).then(() => {
        res.status(200).json({res_code: 1, message: '删除成功'});
    }).catch(err => {
        console.log('delete picture fail: ', err);
        res.status(200).json({res_code: 0, message: err})
    })

};

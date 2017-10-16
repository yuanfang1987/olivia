var crypto = require('crypto');
var fs = require('fs');

/** 对密码进行 md5 加密 */
exports.cryptPwd = function (password) {
    var md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
};

/** 获取 unix 时间戳 */
exports.getUnixTime = function () {
    return Math.round(new Date().getTime()/1000);
};

/** 生成 uuid */
exports.generateUUID = function () {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
};

/** 把 base64编码的字符串解码还原成图片， 此方法已废弃 */
exports.decodeBase64ToPicture = function (base64str, file) {
    var str = base64str.replace(/^data:image\/\w+;base64,/, '');
    var bitmap = new Buffer(str, 'base64');
    // fs.writeFileSync(file, bitmap);
    fs.writeFile(file, bitmap, function (err) {
        if (err) {
            console.log('save file fail: ', err)
        } else {
            console.log('save file success.')
        }
    });
};

var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

const all_router = require('./routers/all_router');


var app = express();
app.set('port', process.env.PORT || 3000);

/** 添加静态目录 */
app.use(express.static(path.join(__dirname, '../web/dist')));

/** 添加虚拟目录 */
app.use('/picture', express.static('picture'));

/** 用body parser 来解析post和url信息中的参数 */
app.use(bodyParser.json({limit : '10000kb'}));
app.use(bodyParser.urlencoded({extended: false}));

/** 使用 morgan 将请求日志打印到控制台 */
app.use(morgan('dev'));

/** 解析 cookie */
app.use(cookieParser());

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 3600000 }}));

app.use('/v1', all_router);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

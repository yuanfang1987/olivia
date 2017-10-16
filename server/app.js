var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

/** 导入自定义的路由模块 */
const all_router = require('./routers/all_router');


var app = express();
/** 如果不能从环境变量 env 中取到端口，则使用 3000 作为监听端口 */
app.set('port', process.env.PORT || 3000);

/** 添加静态目录, 当用浏览器访问根目录时，如 http://localhost:3000，则会在 web/dist 目录下自动寻找一个名为 index.html 的文件
 *  来作为首页 */
app.use(express.static(path.join(__dirname, '../web/dist')));

/** 添加虚拟目录, 用来获取图片 */
app.use('/picture', express.static('picture'));

/** 用body parser 来解析post和url信息中的参数 */
app.use(bodyParser.json({limit : '10000kb'}));
app.use(bodyParser.urlencoded({extended: false}));

/** 使用 morgan 将请求日志打印到控制台 */
app.use(morgan('dev'));

/** 解析 cookie */
app.use(cookieParser());

/** 设置 coolie 的生命周期是一个小时 */
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 3600000 }}));

/** 设置路由 */
app.use('/v1', all_router);

/** 启动 HTTP 服务 */
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

require('babel-core/register');
var express = require('express');
var app = express();
// import {router} from './routes/index'
var router=require('./routes/index');
var pug = require('pug');

var mongoose=require('mongoose');
var logger=require('morgan');//node.js关于http请求的日志中间件
var dbUrl="mongodb://127.0.0.1:27017/test";
var db = mongoose.connect(dbUrl);
var path = require('path');
var port=process.env.PORT||3000;

var cookieParser=require('cookie-parser');
var session = require('express-session');
var mongoStore=require('connect-mongo')(session);
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');

var server=require('http').Server(app);
server.listen(port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(serveStatic('build'))
app.use(express.static(path.join(__dirname, 'build'))); 
// app.use(serveStatic('build', {'index': ['home.pug']})) 
// app.use(serveStatic('node_modules'))
app.use(cookieParser())
app.use(session({
  secret: 'xueseng',
  resave: false,
  saveUninitialized: true,
  store:new mongoStore({
    url:dbUrl,
    collection:'session'
  })
}))

app.set('views','./app/views/');
app.set('view engine','pug');
// app.use(multer());

console.log('start on'+port);
db.connection.on('error',function(error) {
    console.log("mongodb fail"+error);
})
db.connection.on('open',function() {
    console.log("mongodb success");
})
if ('development'===app.get('env')) {
    app.set('showStackError',true);
    app.use(logger(':method :url :status'))
    app.locals.pretty=true;
    mongoose.set('debug',true);
}

app.use('/',router);

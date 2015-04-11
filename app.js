var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multer = require('multer'); 
var session = require('express-session');
var fs = require('fs');

var routes = require('./routes/index');
var userindex = require('./routes/userindex');
var user = require('./routes/user');
var admin = require('./routes/admin');
var init = require('./routes/init');
var search = require('./routes/search');
var picturewall = require('./routes/picturewall');
var uploadpicture = require('./routes/uploadpicture');
var userphoto = require('./routes/userphoto');
var editinfo = require('./routes/editinfo');
var address = require('./routes/address');
var message = require('./routes/message');
var chat = require('./routes/chat');
var collection = require('./routes/collection');

var app = express();

// 连接数据库
mongoose.connect('mongodb://localhost/talks');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.locals.moment = require('moment');

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({dest: "./public/images/temp"}));
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'talks, very secret'
}));


app.use('/', routes);
app.use('/init', init);//添加测试数据
app.use('/admin', admin);
app.use('/userindex', userindex);
app.use('/user' , user);
app.use('/search' , search);
app.use('/picturewall' , picturewall);
app.use('/uploadpicture' , uploadpicture);
app.use('/userphoto' , userphoto);
app.use('/editinfo' , editinfo);
app.use('/address' , address);
app.use('/message' , message);
app.use('/chat' , chat);
app.use('/collection' , collection);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

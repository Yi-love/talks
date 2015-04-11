var express = require('express');
var crypto = require('crypto');
var User = require('../models/user');

var router = express.Router();

router.get('/', function(req, res) {
	if (req.session.user ){
		res.render('index', {user : req.session.user});
	}
  	else{
  		res.render('index',{});
  	}
});

router.get('/login', function(req, res) {
  res.render('login', {});
});

router.get('/register', function(req, res) {
  res.render('register', {});
});
router.get('/exit', function(req, res) {
	if ( req.session.user ){
		User.findById(req.session.user._id , function(err , user){
			user.online = 0;
			user.save();
			delete req.session.user;
	 		res.redirect('/');
		});
	}else{
		res.redirect('/');
	}
	
	
});
// 用户登录
router.post('/login' , function(req , res){
	var username = req.body.username;
	var password = req.body.password;
	User.findByUserName(username , function(err,user){ //根据用户名查询用户
		if (err) {
			console.log(err);
			res.redirect('/login');
		}
		// console.log(user);
		if ( user !== null ){
			var loginPass = crypto.createHash('sha256').update(password).digest('hex');//密码加密
			if ( user.password === loginPass && user.freeze === 0){//密码正确   
				req.session.user = user;  //登录成功
				user.online = 1;
				
				// console.log('登录成功');
				if ( user.isfirst  === 1 ){
					user.isfirst = 0;
					user.save();
					res.redirect('/editinfo');
				}else{
					user.save();
					res.redirect('/userindex');
				}
			}else{
				res.redirect('/login');
			}
		}else{
			res.redirect('/login');
		}
		
	});
});

// 注册用户
router.post('/register' , function(req , res){
	var username = req.body.username;
	var password = req.body.password;
	var passwords = req.body.passwords;

	// 两次密码输入是否一样
	if ( password === passwords ){
		var registerPass = crypto.createHash('sha256').update(password).digest('hex');//密码加密
		
		var user = new User({
			username : username,
			password : registerPass,
			isfirst : 1
		});
		user.save(function(err){
			if(err){
				console.log(err);
				res.render('register', {});
			}
			res.redirect('/');
		});
		
	}else {
		res.render('register', {});
	}
});

module.exports = router;

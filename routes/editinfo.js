var express = require('express');
var User = require('../models/user');
var _ = require('underscore');
var crypto = require('crypto');
var fs = require('fs');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
	if ( req.session.user ){
		User.findById(req.session.user._id , function(err,user){
			if (err) throw err;
			res.render('info',{user:user});
		});
	}else{
		res.redirect('/login');
	}
});
// 修改基本资料
router.post('/info', function(req, res) {
	if ( req.session.user ){
		var id = req.body.user._id;
		var userObj = req.body.user;
		// console.log('-------------------------------'+userObj);
		var _user;
		if ( id !== 'undefined' ){
			User.findById(id , function(err , user){
				if (err)
				{
					console.log(err);
				}
				_user = _.extend(user , userObj);
				_user.save(function(err , user){
					if (err){
						console.log(err);
					}
					req.session.user = user;
					res.redirect('/user/'+user._id);
				});
			});
		}
	}else{
		res.redirect('/login');
	}
});
// 修改邮箱资料
router.post('/safe', function(req, res) {
	if ( req.session.user ){
		var id = req.body.user._id;
		User.findById(id , function(err , user){
			if (err){
				console.log(err);
			}
			if ( user.email ){
				var email = req.body.email;
				if (user.email !== email) {
					res.redirect('/editinfo');
				}
			}
			var newemail = req.body.newemail;
			var password = crypto.createHash('sha256').update(req.body.password).digest('hex');//密码加密
			if ( password === user.password ){
				user.email = newemail;
				user.save(function(err , u){
					if (err){
						console.log(err);
					}
					req.session.user = u;
					res.redirect('/user/'+u._id);
				});
			}else {
				res.redirect('/editinfo');
			}
		});
	}else{
		res.redirect('/login');
	}
});
// 修改密码
router.post('/password', function(req, res) {
	if ( req.session.user ){
		var id = req.body.user._id;
		User.findById(id , function(err , user){
			if (err){
				console.log(err);
			}
		    if ( user.email ){
			    var email = req.body.email;
				if (user.email == email) {
					var oldpassword = crypto.createHash('sha256').update(req.body.oldpassword).digest('hex');//密码加密
					var repassword = req.body.repassword;
					var password = req.body.password;
					if (repassword !== password || oldpassword !== user.password ){
						res.redirect('/editinfo');
					}else{
						password = crypto.createHash('sha256').update(password).digest('hex');//密码加密
						if ( oldpassword === user.password ){
							user.password = password;
							user.save(function(err , u){
								if (err){
									console.log(err);
								}
								req.session.user = u;
								res.redirect('/user/'+u._id);
							});
						}else{
							res.redirect('/editinfo');
						}
					}
				}else{
					res.redirect('/editinfo');
				}
			}else{
				res.redirect('/editinfo');
			}
		});
	}else{
		res.redirect('/login');
	}
});
// 上传背景
router.post('/other', function(req, res) {
	if ( req.session.user ){
		// 查看图片是在body里 还是files里
		var user = req.session.user;
		var personal = req.files.personalization;
		if (personal == 'undefined')
			personal = req.body.personalization;
		if (personal == 'undefined')
			res.redirect('/editinfo'); 
		var type = personal.name.substring(personal.name.lastIndexOf(".") + 1, personal.name.length).toLowerCase();
		var personalization = 'images/personalization/'+user._id+'.'+type;
		var tpath = personal.path;
		var tgpath = './public/'+personalization;
		fs.rename(tpath , tgpath , function(err){//保存到目标路径
			if (err) throw err;
			fs.unlink(tpath , function(){//删除缓存文件
				if (err) throw err;
				User.findById(user._id , function(err,u){//更新图片
					if (err) throw err;
					u.personalization = personalization;
					u.save(function(err,me){
						if (err) console.log(err);
						req.session.user = me;
						res.redirect('/user/'+me._id);
					});
				});
			});
		});
	}else{
		res.redirect('/login');
	}
});
module.exports = router;

var express = require('express');
var crypto = require('crypto');
var Admin = require('../models/admin');
var User = require('../models/user');
var Heart = require('../models/heart');
var Photo = require('../models/photo');

var router = express.Router();

router.get('/', function(req, res) {
	if (req.session.admin ){
		res.render('adminindex', {admin : req.session.admin});
	}
  	else{
  		res.redirect('/admin/login');
  	}
});

router.get('/login', function(req, res) {
  res.render('adminlogin', {});
});

router.get('/exit', function(req, res) {
	delete req.session.admin;
  res.redirect('/admin/login');
});
router.get('/adminindex', function(req, res) {
		if (req.session.admin ){
			User.findByOnline(1 , function(err , online){
				if (err){
					console.log(err);
				}
				User.findBySex('男' , function(err , man){
					if (err){
						console.log(err);
					}
					User.findCount(function(err , usercount){
						if (err){
							console.log(err);
						}
						Heart.findCount(function(err , heartcount){
							Heart.findFreeze(0 , function(err , heartfreezecount){
								Photo.findCount(function(err , photocount){
									Photo.findFreeze(0 , function(err , photofreezecount){
										res.send({online : online , man : man , usercount:usercount , 
											heartcount:heartcount , heartfreezecount:heartfreezecount , 
											photocount:photocount,photofreezecount:photofreezecount });
									});
								});
							});
						});
					});
				});
			});
		}
	  	else{
	  		res.redirect('/admin/login');
	  	}
});
// 照片管理
var photosum = 30;
router.get('/photoadmin', function(req, res) {
	if (req.session.admin ){
		Photo.fetch( 0 , photosum ,function(err , photos){
			if (err){
				console.log(err);
			}
			var ts = parseInt(photos.length/3);
			photos = photos.reverse();
			var phtsone = new Array();
			var phtstwo = new Array();
			var phtsthree = new Array();
			for( var i = 0 ;i < photos.length ; i++ ){
				if ( i < ts ){
					phtsone.push(photos[i]);
				}else if ( i < 2*ts ){
					phtstwo.push(photos[i]);
				}else {
					phtsthree.push(photos[i]);
				}
			}
			res.render('photoadmin', {admin : req.session.admin , phtsone:phtsone , phtstwo:phtstwo,phtsthree:phtsthree});
		});
	}
  	else{
  		res.redirect('/admin/login');
  	}
});

var heartsum = 50;
// 心里话管理
router.get('/heartadmin', function(req, res) {
	if (req.session.admin ){
		Heart.fetch( 0 , heartsum , function(err , hearts){
			if (err){
				console.log(err);
			}
			res.render('heartadmin', {admin : req.session.admin , hearts :hearts.reverse()});
		});
	}
  	else{
  		res.redirect('/admin/login');
  	}
});

var usersum = 10;
// 查看用户信息
router.get('/useradmin', function(req, res) {
	if (req.session.admin ){
		User.fetch( 0 , usersum , function(err,users){
			if ( err ){
				console.log(err);
			}
			res.render('useradmin', {admin : req.session.admin , users : users.reverse()});
		});
	}
  	else{
  		res.redirect('/admin/login');
  	}
});
// 退出
router.get('/exit', function(req, res) {
	delete req.session.admin;
  	res.redirect('/admin/login');
});

// 管理员登录
router.post('/login' , function(req , res){
	var adminname = req.body.adminname;
	var adminpassword = req.body.adminpassword;
	Admin.findByAdminName(adminname , function(err,admin){ //根据用户名查询用户
		if (err) {
			console.log(err);
			res.redirect('/admin/login');
		}
		// console.log(Admin);
		if ( admin !== null ){
			var loginPass = crypto.createHash('sha256').update(adminpassword).digest('hex');//密码加密
			if ( admin.adminpassword === loginPass ){//密码正确   
				req.session.admin = admin;  //登录成功
				// console.log('登录成功');
				res.redirect('/admin');
			}else{
				res.redirect('/admin/login');
			}
		}else{
			res.redirect('/admin/login');
		}
		
	});
});

// 冻结用户
router.post('/setfreeze' , function(req , res){
	if (req.session.admin ){
		var userid = req.body.userid;
		var freeze = req.body.freeze;
		// console.log(req.body.freeze);
		User.findById(userid , function(err , user){
			if ( err ){
				console.log(err);
				return 0; 
			}
			if ( user === null ){
				return;
			}
			user.freeze = freeze;
			user.save();
			res.send({});
		});
	}else{
		res.redirect('/admin/login');
	}
});

// 查找用户
router.get('/findmoreuser/:userindex' , function(req , res){
	if (req.session.admin ){
		var userindex = req.params.userindex;
		if (userindex < 0 ){
			userindex = 0;
		}
		User.fetch( userindex*usersum , usersum  , function(err , userlist){
			if ( err ){
				console.log(err);
				res.send({userlist:{}}); 
			}
			res.send({userlist:userlist});
		});
	}else{
		res.redirect('/admin/login');
	}
});
// 查找冻结用户
router.get('/finddjuser/:userindex/:usertype' , function(req , res){
	if (req.session.admin ){
		var userindex = req.params.userindex;
		var usertype = req.params.usertype;
		if (userindex < 0 ){
			userindex = 0;
		}
		User.findByFreeze( usertype ,userindex*usersum , usersum  , function(err , userlist){
			if ( err ){
				console.log(err);
				res.send({userlist:{}}); 
			}
			res.send({userlist:userlist});
		});
	}else{
		res.redirect('/admin/login');
	}
});

// 冻结心里话
router.post('/setHeartfreeze' , function(req , res){
	if (req.session.admin ){
		var heartid = req.body.heartid;
		var freeze = req.body.freeze;
		// console.log(req.body.freeze);
		Heart.findById(heartid , function(err , heart){
			if ( err ){
				console.log(err);
				return 0; 
			}
			if ( heart === null ){
				return;
			}
			heart.freeze = freeze;
			heart.save();
			res.send({});
		});
	}else{
		res.redirect('/admin/login');
	}
});
// 查找心里话
router.get('/findmoreheart/:heartindex' , function(req , res){
	if (req.session.admin ){
		var heartindex = req.params.heartindex;
		if (heartindex < 0 ){
			heartindex = 0;
		}
		Heart.fetch( heartindex*heartsum , heartsum  , function(err , heartlist){
			if ( err ){
				console.log(err);
				res.send({heartlist:{}}); 
			}
			res.send({heartlist:heartlist});
		});
	}else{
		res.redirect('/admin/login');
	}
});
// 查找冻结心里话
router.get('/finddjheart/:heartindex/:hearttype' , function(req , res){
	if (req.session.admin ){
		var heartindex = req.params.heartindex;
		var hearttype = req.params.hearttype;
		if (heartindex < 0 ){
			heartindex = 0;
		}
		Heart.findByFreeze( hearttype ,heartindex*heartsum , heartsum  , function(err , heartlist){
			if ( err ){
				console.log(err);
				res.send({heartlist:{}}); 
			}
			res.send({heartlist:heartlist});
		});
	}else{
		res.redirect('/admin/login');
	}
});
// 冻结照片
router.post('/setPhotofreeze' , function(req , res){
	if (req.session.admin ){
		var photoid = req.body.photoid;
		var freeze = req.body.freeze;
		Photo.findById(photoid , function(err , photo){
			if ( err ){
				console.log(err);
				return 0; 
			}
			if ( photo === null ){
				return;
			}
			photo.freeze = freeze;
			photo.save();
			res.send({});
		});
	}else{
		res.redirect('/admin/login');
	}
});
// 查找照片
router.get('/findmorephoto/:photoindex' , function(req , res){
	if (req.session.admin ){
		var photoindex = req.params.photoindex;
		if (photoindex < 0 ){
			photoindex = 0;
		}
		Photo.fetch( photoindex*photosum , photosum  , function(err , photolist){
			if ( err ){
				console.log(err);
				return ;
			}
			var ts = parseInt(photolist.length/3);
			photolist = photolist.reverse();
			var phtsone = new Array();
			var phtstwo = new Array();
			var phtsthree = new Array();
			for( var i = 0 ;i < photolist.length ; i++ ){
				if ( i < ts ){
					phtsone.push(photolist[i]);
				}else if ( i < 2*ts ){
					phtstwo.push(photolist[i]);
				}else {
					phtsthree.push(photolist[i]);
				}
			}
			res.send({phtsone:phtsone , phtstwo:phtstwo,phtsthree:phtsthree});
		});
	}else{
		res.redirect('/admin/login');
	}
});
// 查找冻结照片
router.get('/finddjphoto/:photoindex/:phototype' , function(req , res){
	if (req.session.admin ){
		var photoindex = req.params.photoindex;
		var phototype = req.params.phototype;
		if (photoindex < 0 ){
			photoindex = 0;
		}
		Photo.findByFreeze( phototype ,photoindex*photosum , photosum  , function(err , photolist){
			if ( err ){
				console.log(err);
				return;
			}
			var ts = parseInt(photolist.length/3);
			photolist = photolist.reverse();
			var phtsone = new Array();
			var phtstwo = new Array();
			var phtsthree = new Array();
			for( var i = 0 ;i < photolist.length ; i++ ){
				if ( i < ts ){
					phtsone.push(photolist[i]);
				}else if ( i < 2*ts ){
					phtstwo.push(photolist[i]);
				}else {
					phtsthree.push(photolist[i]);
				}
			}
			res.send({phtsone:phtsone , phtstwo:phtstwo,phtsthree:phtsthree});
		});
	}else{
		res.redirect('/admin/login');
	}
});

module.exports = router;

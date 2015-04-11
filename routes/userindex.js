var express = require('express');
var Heart = require('../models/heart');
var Comment = require('../models/comment');
var Agree = require('../models/agree');
var Friends = require('../models/friends');
var User = require('../models/User');
var Collection = require('../models/collection');

var router = express.Router();

var heartsum = 50;
router.get('/', function(req, res) {
	if ( req.session.user ){
		Heart.fetch( 0 , heartsum , function(err,hearts){
			if (err){
				console.log(err);
			}
			res.render('userindex',{user:req.session.user , hearts:hearts});
		});
	}else{
		res.redirect('/login');
	}
});

// 查看心里话详情
router.get('/heartinfo/:heartid', function(req, res) {
	var heartid = req.params.heartid;
	if ( req.session.user ){
		Heart.findById(heartid , function(err, heart){
			if (err){
				console.log(err);
			}
			Comment.findByHeartid(heartid , function(err , comments){
				if (err){
					console.log(err);
				}
				// console.log('----------------------'+heartid+'        '+comments);
				res.render('heartinfo',{heart:heart , comments:comments.reverse()});
			});
		});
	}else{
		res.redirect('/login');
	}
});
// 写心里话
router.get('/editheart', function(req, res) {
	if ( req.session.user ){
		res.render('heart',{});
	}else{
		res.redirect('/login');
	}
});
// 写心里话
// 五百年前的大明京城，一家小医馆里生活着一群贫嘴乐呵的年轻人，专治疑难杂症的小大夫朱一品、花痴又娇蛮的老板娘陈安安...
router.post('/editheart', function(req, res) {
	if ( req.session.user ){
		var content = req.body.heartcontent;
		var user = req.session.user;
		var heart = new Heart({
			userid : user._id,
			nickname:user.nickname,
			userimg : user.userimg,
			content : content,
			location: '无法获取地理位置信息',
			writeimgs : ''
		});
		heart.save(function(err,h){
			if (err){
				console.log(err);
			}
			res.redirect('/userindex');
		});
		
	}else{
		res.redirect('/login');
	}
});
// 转发
router.post('/transmit', function(req, res) {
	if ( req.session.user ){
		var heartid = req.body.heartid;
		// console.log('-------------------'+heartid);
		Heart.findById(heartid,function(err,heart){
			if (err){
				console.log(err);
			}
			var user = req.session.user;
			heart.transmit++;
			heart.browsenum++;
			var h = new Heart({
				userid : user._id,
				nickname:user.nickname,
				userimg : user.userimg,
				content : '\/\/转发心里话 。@'+heart.nickname+' \/\/'+heart.content,
				location: user.location,
				writeimgs : heart.writeimgs,
				transmit: heart.transmit,
				browsenum : heart.browsenum
			});
			h.save();
			heart.save();
			res.send({num : heart.transmit});
		});
	}else{
		res.redirect('/login');
	}
});
// 五百年前的大明京城，一家小医馆里生活着一群贫嘴乐呵的年轻人，专治疑难杂症的小大夫朱一品、花痴又娇蛮的老板娘陈安安...
router.post('/editcomment', function(req, res) {
	if ( req.session.user ){
		var content = req.body.commentcontent;
		var heartid = req.body.heartid;
		var user = req.session.user;
		Heart.findById(heartid,function(err,heart){
			if ( err ){
				console.log(err);
			}
			var comment = new Comment({
				heartid : heartid,
				userid : user._id,
				nickname : user.nickname,
				userimg : user.userimg,
				content : content
			});
			comment.save();
			heart.commentnum++;
			heart.browsenum++;
			heart.save(function(err,h){
				if ( err ){
					console.log(err);
				}
				res.redirect('/userindex/heartinfo/'+h._id);
			});
		});
		
	}else{
		res.redirect('/login');
	}
});
// 点赞
router.post('/agree', function(req, res) {
	if ( req.session.user ){
		var heartid = req.body.heartid;
		Heart.findById(heartid,function(err,heart){
			if (err){
				console.log(err);
			}
			var user = req.session.user;
			
			Agree.findByUserid(user._id , function(err,agree){
				if ( err){
					console.log(err);
				}
				if ( agree === null ){
					agree = new Agree({
						userid : user._id,
						agreeurl : ','
					});
				}
				if ( agree.agreeurl.match(heart._id+',')){
					heart.browsenum++;
				}else{
					heart.agree++;
					heart.browsenum++;
					agree.agreeurl += heartid+',';
					agree.save();
				}
				heart.save();
				res.send({num : heart.agree});
			});
		});
	}else{
		res.redirect('/login');
	}
});

router.get('/findheartplace/:heartindex/:place' , function(req,res){
	if ( req.session.user ) {
		var place = parseInt(req.params.place);
		var heartindex = req.params.heartindex;
		var user = req.session.user;
		if ( place === 2 ){//自己的心里话
			Heart.findByUserid(user._id , heartindex*heartsum , heartsum , function(err , heartlist){
				if (err ){
					console.log(err);
				}
				res.send({heartlist : heartlist});
			});
		}else if (place === 1 ){//朋友圈的心里话
			Friends.findByUserId(user._id , function(err , friends){
				if (err){
					console.log(err);
				}
				var friendlist = friends.friendid.split(',');
				Heart.findByUserids(friendlist ,heartindex*heartsum , heartsum , function(err , heartlist){
					if ( err ){
						console.log(err);
					}
					res.send({heartlist : heartlist});
				});
			});
		}else {//全部的
			Heart.fetch(heartindex*heartsum , heartsum , function(err , heartlist){
				if (err ){
					console.log(err);
				}
				res.send({heartlist : heartlist});
			});
		}
	}else {
		res.redirect('/login');
	}
});
// 收藏
router.post('/collection', function(req, res) {
	if ( req.session.user ){
		var heartid = req.body.heartid;
		var user = req.session.user;
		Collection.findByHUid(user._id , heartid,function(err,collection){
			if (err){
				console.log(err);
			}
			if ( collection == null ){
				Heart.findById(heartid , function(err , heart){
					if ( err){
						console.log(err);
					}
					if ( heartid == null ){
						
					}else{
						collection = new Collection({
							userid : user._id,
							heartid : heartid
						});
						heart.collectionnum++;
						heart.save();
						collection.save();	
					}
					res.send({content: '谢谢收藏'});
				});
			}else{
				res.send({content: '你已经收藏了'});
			}
		});
	}else{
		res.redirect('/login');
	}
});
// 冻结
router.post('/deleteheart', function(req, res) {
	if ( req.session.user ){
		var heartid = req.body.heartid;
		Heart.findById(heartid , function(err , heart){
			if ( err ){
				console.log(err);
				return 0; 
			}
			if ( heart === null ){
				return;
			}
			heart.freeze = 1;
			heart.save();
			res.send({});
		});
	}else{
		res.redirect('/login');
	}
});
module.exports = router;

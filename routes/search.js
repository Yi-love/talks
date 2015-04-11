var express = require('express');
var User = require('../models/user');
var Friend = require('../models/friends');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
	User.fetch(0 , 10 , function(err,hotusers){
		if(err){
			console.log(err);
		}
		if ( req.session.user ){
			User.findByLocationLike(req.session.user.location , function(err,nearbyusers){
				if(err){
					console.log(err);
				}
				Friend.findByUserId(req.session.user._id , function(err,friend){
					if(err){
						console.log(err);
					}
					if ( friend === null ){
						friend = new Friend({
							userid : req.session.user._id
						});
						friend.save();
					} 

					User.findById(req.session.user._id , function(err , user){
						if(err){
							console.log(err);
						}
						req.session.user = user;
						var fslist = friend.friendid;
						// console.log('search------------------------------'+fslist);
						res.render('search',{user:req.session.user , nearbyusers:nearbyusers,hotusers:hotusers , fslist : fslist});
					});
				});
			});
		}else{
			res.render('search',{hotusers:hotusers , fslist:''});
		}
	});
});
// 查询用户
router.get('/searchuser', function(req, res) {
	res.redirect('/search');
});
// 查询用户
router.post('/searchuser', function(req, res) {
	var nickname = req.body.nickname;
	User.findByNameLike(nickname , function(err ,users){
		if (err){
			console.log(err);
		}
		User.fetch(0 , 10 , function(err,hotusers){
			if(err){
				console.log(err);
			}
			if ( req.session.user ){
				User.findByLocationLike(req.session.user.location , function(err,nearbyusers){
				    if(err){
					    console.log(err);
					}
					res.render('search',{user:req.session.user ,searchusers:users, nearbyusers:nearbyusers,hotusers:hotusers});
				});
			}else{
				res.render('search',{searchusers:users,hotusers:hotusers});
			}
		});
	});
});
module.exports = router;

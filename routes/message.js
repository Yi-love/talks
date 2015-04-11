var express = require('express');
var User = require('../models/user');
var Information = require('../models/information');

var router = express.Router();

router.get('/', function(req, res) {
	if (req.session.user ){
		User.findById(req.session.user._id , function(err , user){
			if ( err ) {
				console.log(err);
			}
			Information.findByUserId(user._id , function(err, informations){
				if ( err ){
					console.log(err);
				}
				req.session.user = user;
				res.render('message', {user : user , informations : informations});
			});
		});
	}
  	else{
  		res.redirect('/login');
  	}
});
router.post('/sendmessage', function(req, res) {
	if (req.session.user ){
		var friendid  = req.body.userid;
		var userid = req.body.friendid;
		User.findById(friendid , function(err , friend){
			if (err){
				console.log(err);
			}
			User.findById(userid , function(err , user){
				if (err){
					console.log(err);
				}
				var information = new Information({
					userid :  friend._id,
					sendid : user._id,
					sendimg : user.userimg,
					sendname : user.nickname,
					content : req.body.content
				});
				information.save();
			});
		});
	}
});
module.exports = router;
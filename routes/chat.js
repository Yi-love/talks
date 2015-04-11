var express = require('express');
var User = require('../models/user');
var Information = require('../models/information');

var router = express.Router();
// 聊天数据
router.get('/:chatuserid', function(req, res) {
	var chatuserid = req.params.chatuserid;
	User.findById(chatuserid , function(err , friend){
		if (err){
			console.log(err);
		}
		if (req.session.user ){
			User.findById(req.session.user._id , function(err , user){
				if ( err ) {
					console.log(err);
				}
				Information.findByUserIdAndSendId(user._id , friend._id , function(err, informations){
					if ( err ){
						console.log(err);
					}
					req.session.user = user;
					res.render('chat', {user : user ,friend:friend , informations : informations});
				});
			});
	  	}else{
	  		res.redirect('/login');
	  	}
	});
	
});

module.exports = router;
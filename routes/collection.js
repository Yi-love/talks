var express = require('express');
var Collection = require('../models/collection');
var Heart = require('../models/heart');

var router = express.Router();
// 聊天数据
router.get('/', function(req, res) {
	if (req.session.user ){
		var user = req.session.user;
		Collection.findByUser(user._id , function(err , collections){
			if (err ){
				console.log(err);
			}
			if ( collections != null ){
				var heartids = [];
				for (var i = collections.length - 1; i >= 0; i--) {
					heartids[heartids.length] = collections[i].heartid;
				};
				Heart.findByIds(heartids , function(err , hearts){
					if (err ){
						console.log(err);
					} 
					res.render('collection' , {hearts:hearts});
				});
			}else{
				res.render('collection' , {hearts:null});
			}
		});
	}else{
	  	res.redirect('/login');
	}
});

module.exports = router;
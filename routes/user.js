var express = require('express');
var Heart = require('../models/heart');
var User = require('../models/user');
var Photo = require('../models/photo');
var router = express.Router();

/* GET users listing. */
router.get('/:userid', function(req, res) {
	if ( req.session.user ){
		if ( req.params.userid ){ //查看别人的信息资料
			User.findById(req.params.userid ,function(err , user){
				Heart.findByUserid(user._id , 0 , 20 , function(err,hearts){
					if (err){
						console.log(err);
					}
					Photo.findByUserId(user._id , function(err,photos){
						if (err){
							console.log(err);
						}
						res.render('user',{user:user , me:req.session.user , hearts:hearts , photos:photos});
					});
					
				});
			});
		}
	}else{
		res.redirect('/login');
	}
});

module.exports = router;

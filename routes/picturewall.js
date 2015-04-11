var express = require('express');
var User = require('../models/user');
var Photo = require('../models/photo');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
		Photo.fetch(0 , 30 , function(err,photos){
			var ts = parseInt(photos.length/3);
			photos = photos;
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
			res.render('picturewall',{user:req.session.user , phtsone:phtsone , phtstwo:phtstwo,phtsthree:phtsthree});
		});
});
// 查找冻结照片
router.get('/finddjphoto/:photoindex/:phototype' , function(req , res){
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
});
router.get('/picture/:userid', function(req, res) {
	var  userid = req.params.userid;

	Photo.findByUserId(userid , function(err,photos){
	   if (err){
			console.log(err);
			res.redirect('/picturewall');
		}
		if ( photos == null ){
			res.redirect('/picturewall');
		}
		res.render('picture',{photos:photos});
	});
});
module.exports = router;

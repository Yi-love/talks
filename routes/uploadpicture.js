var express = require('express');
var Photo = require('../models/photo');
var router = express.Router();
var fs = require('fs');
/* GET users listing. */
router.get('/', function(req, res) {
	if ( req.session.user ){
		res.render('uploadpicture',{user : req.session.user });
	}else{
		res.redirect('/login');
	}
});

// 上传图片
router.post('/', function(req, res) {
	if ( req.session.user ){
		// 查看图片是在body里 还是files里
		try{
			var pict = req.files.pictures;
			if (pict == undefined ){
				pict = req.body;
			}
			if (pict == undefined){
				res.redirect('/uploadpicture'); 
			}
			var imgurl = '';
			
			var lens = pict.length;
			var date = (Date.now()).toString();
			if ( lens == undefined ){
				imgurl += 'images/photo/'+date+pict.name;
			}else{
				for ( var i = 0 ; i < lens ; i++ ){
					imgurl += 'images/photo/'+date+pict[i].name;
					if ( i < lens-1 ){
						imgurl += ',';
					}
				}
			}
			if ( lens == undefined ){
				var tem_path = pict.path;
				var target_path = './public/images/photo/'+date+pict.name;
				fs.rename(tem_path , target_path , function(err){//保存到目标路径
					if (err) throw err;
					fs.unlink(tem_path , function(){//删除缓存文件
						if (err) throw err;
					});
				});
			}else{
				for ( var j = 0 ; j < lens ; j++ ){
					var tem_path = pict[j].path;
					var target_path = './public/images/photo/'+date+pict[j].name;
					fs.rename(tem_path , target_path , function(err){//保存到目标路径
						if (err) throw err;
						fs.unlink(tem_path , function(){//删除缓存文件
							if (err) throw err;
						});
					});
				}
			}
			
			var photo = new Photo({
				userid : req.session.user._id,
				imgurl : imgurl,
				abstract : '惊喜天天有!'
			});
			photo.save();
			res.redirect('/user/'+req.session.user._id);
		}catch(e){
			console.log(e);
			res.redirect('/uploadpicture');
		}	
	}else{
		res.redirect('/login');
	}
});
module.exports = router;

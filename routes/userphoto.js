var express = require('express');
var User = require('../models/user');
var router = express.Router();
var fs = require('fs');
/* GET users listing. */
router.get('/', function(req, res) {
	if ( req.session.user ){
		res.render('userphoto',{user:req.session.user});
	}else{
		res.redirect('/login');
	}
});

// 上传头像
router.post('/', function(req, res) {
	if ( req.session.user ){
		// 查看图片是在body里 还是files里
		var user = req.session.user;
		var pict = req.files.userimg;
		if (pict == 'undefined')
			pict = req.body.userimg;
		if (pict == 'undefined')
			res.redirect('/userphoto'); 
		var type = pict.name.substring(pict.name.lastIndexOf(".") + 1, pict.name.length).toLowerCase();
		var imgurl = 'images/user/'+user._id+'.'+type;
		var tem_path = pict.path;
		var target_path = './public/'+imgurl;
		fs.rename(tem_path , target_path , function(err){//保存到目标路径
			if (err) throw err;
			fs.unlink(tem_path , function(){//删除缓存文件
				if (err) throw err;
				User.findById(user._id , function(err,u){//更新图片
					if (err) throw err;
					u.userimg = imgurl;
					u.save();
					req.session.user = u;
					res.redirect('/user/'+u._id);
				});
			});
		});
		
	}else{
		res.redirect('/login');
	}
});
module.exports = router;

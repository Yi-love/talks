var express = require('express');
var crypto = require('crypto');
var User = require('../models/user');
var Admin = require('../models/admin');
var Heart = require('../models/heart');
var Comment = require('../models/comment');
var Photo = require('../models/photo');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
	res.render('init' , {});
});
router.post('/add', function(req, res) {
	var usernum = req.body.usernum;//用户数量 
	var heartnum = req.body.heartnum;
	var commentnum = req.body.commentnum;
	addUser(usernum);
	// addAdmin();
	// addHeart(heartnum);
	// addComment(commentnum);
	// addPhoto();
  	res.redirect('/init');
});
// 添加用户
function addUser(usernum){
	for (var i = usernum ; i >= 0; i--) {
		var user = new User({
			username : 'user'+i,
			password : crypto.createHash('sha256').update('123456').digest('hex'),//密码加密,
			isfirst : 1
		});
		user.save();
	}
}
// 添加管理员
function addAdmin(){
	var admin = new Admin({
			adminname : 'Yi',
			adminnickname : '-_-益',
			adminpassword : crypto.createHash('sha256').update('123456').digest('hex')//密码加密,
		});
		admin.save();
}
// 添加心里话
function addHeart(heartnum){
	User.fetchAll(function(err ,users){
		if (err){
			console.log(err);
		}
		for (var i = users.length - 1; i >= 0; i--) {
			 console.log('oks');
			for (var j = heartnum ; j >= 0; j--) {
				var heart = new Heart({
					userid : users[i]._id,
					nickname:users[i].nickname,
					userimg : users[i].userimg,
					content : '50年前，长沙镖子岭。四个土夫子正蹲在一个土丘上，所有人都不说话，直勾勾地盯着地上那把洛阳铲。铲子头上带着刚从地下带出的旧土，离奇的是，这一坏土正不停地向外渗着鲜红的液体，就像刚刚在血液里蘸过一样。“这下子麻烦大喽。”老烟头把他的旱烟在地上敲了敲，接着道，“下面是个血尸嘎，弄不好我们这点儿当当，都要撂在下面噢。”“下不下去喃？要得要不得，一句话，莫七里八里的！”独眼的小伙子说，“你说你个老人家腿脚不方便，就莫下去了，我和我弟两个下去，管他什么东西，直接给他来一梭子。”',
					location: '广州天河区',
					writeimgs : 'img/photo/1.jpg,img/photo/2.jpg,img/photo/3.jpg,img/photo/4.jpg'
				});
				heart.save();
			}
		}
	});
}
// 添加评论
function addComment(commentnum){
	Heart.fetchAll(function(err,hearts){
		if ( err )
		{
			console.log(err);
		}
		User.fetchAll(function(err , users){
			if (err){
				console.log(err);
			}
			var ulen = users.length;
			for ( var i = 0 , len = hearts.length ; i < len ; i++ ){
				for ( var j = 0 ; j < commentnum ; j++ ){
					var ui = parseInt(ulen*Math.random())-1;
						ui = ui < 0 ? 0 : ui;
					// console.log('ui:   '+ui +'   len:'+ ulen);
					var comment = new Comment({
						heartid : hearts[i]._id,
						userid : users[ui]._id,
						nickname : users[ui].nickname,
						userimg : users[ui].userimg,
						content : '年少的我，曾以为爱情可以超越一切，那时我不明白，世上另有一种力量，叫做命运，只可承受，不可改变。'
					});
					console.log('ok');
					comment.save();
				}
			}
		});
		
	});
	
}

function addPhoto(){
	User.fetchAll(function(err , users){
		if (err){
			console.log(err);
		}
		var imgurl = ['images/photo/1.jpg,images/photo/7.jpg,images/photo/14.jpg,images/photo/20.jpg,images/photo/26.jpg,images/photo/32.jpg,images/photo/4.jpg,images/photo/10.jpg,images/photo/17.jpg,images/photo/23.jpg,images/photo/29.jpg,images/photo/35.jpg',
					  'images/photo/2.jpg,images/photo/8.jpg,images/photo/15.jpg,images/photo/21.jpg,images/photo/27.jpg,images/photo/33.jpg,images/photo/4.jpg,images/photo/10.jpg,images/photo/17.jpg,images/photo/23.jpg,images/photo/29.jpg,images/photo/35.jpg',
					  'images/photo/9.jpg,images/photo/3.jpg,images/photo/16.jpg,images/photo/22.jpg,images/photo/28.jpg,images/photo/34.jpg,images/photo/13.jpg,images/photo/12.jpg,images/photo/19.jpg,images/photo/24.jpg,images/photo/6.jpg,images/photo/12.jpg',
		              'images/photo/4.jpg,images/photo/10.jpg,images/photo/17.jpg,images/photo/23.jpg,images/photo/29.jpg,images/photo/35.jpg,images/photo/22.jpg,images/photo/11.jpg,images/photo/18.jpg,images/photo/25.jpg,images/photo/30.jpg,images/photo/31.jpg',
		              'images/photo/22.jpg,images/photo/11.jpg,images/photo/18.jpg,images/photo/25.jpg,images/photo/30.jpg,images/photo/31.jpg,images/photo/2.jpg,images/photo/8.jpg,images/photo/15.jpg,images/photo/21.jpg,images/photo/27.jpg,images/photo/33.jpg',
		              'images/photo/13.jpg,images/photo/12.jpg,images/photo/19.jpg,images/photo/24.jpg,images/photo/6.jpg,images/photo/12.jpg,images/photo/9.jpg,images/photo/3.jpg,images/photo/16.jpg,images/photo/22.jpg,images/photo/28.jpg,images/photo/34.jpg'
		             ];
		for ( var i = 0 , len = users.length ; i < len ; i++ ){
			var r = parseInt(6*Math.random());
			r = r < 0 ? 0 : r;
			r = r >= 6 ? 5 : r;
			var photo = new Photo({
				userid : users[i]._id,
				imgurl : imgurl[r],
				abstract : '惊喜天天有!'
			});
			photo.save();
	    }
	});
}
module.exports = router;

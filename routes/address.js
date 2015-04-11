var express = require('express');
var Friend = require('../models/friends');
var User = require('../models/user');
var Information = require('../models/information');

var router = express.Router();

function Frienfance(obj){
	this._id = obj._id;
	this.nickname = obj.nickname;
	this.userimg = obj.userimg;
	this.frinum = obj.frinum;
	this.fannum = obj.fannum;
	this.ftype = obj.ftype;
}

// 好友列表
router.get('/', function(req, res) {
	if (req.session.user ){
		var user = req.session.user;
		User.findById(user._id , function(err , me){
			if ( err ) {
				console.log(err);
			}
			req.session.user = me;
			Friend.findByUserId(me._id , function(err , friend){
				if ( err ) {
					console.log(err);
				}
				if ( friend === null ){
					friend = new Friend({
						userid : me._id
					});
					friend.save();
				}

				User.fetchAll(function(err , userlist){
					if ( err ) {
						console.log(err);
					}
					// console.log('-------------------------------------'+userlist);
					var fris = friend.friendid.split(',');
					var fans = friend.fanceid.split(',');
					var frslist = new Array();
					for ( var i = 0 ; i < fris.length ; i++ ){
						for( var j = 0 ; j < userlist.length ; j ++){
							if ( fris[i].match(userlist[j]._id) ){
								// console.log(userlist[j]._id+'-----------------------------------------'+fris[i]);
								var frienfance = new Frienfance({
									_id : userlist[j]._id,
									nickname : userlist[j].nickname,
									userimg : userlist[j].userimg,
									frinum : userlist[j].friends,
									fannum : userlist[j].fances,
									ftype : 0
								});
								frslist[frslist.length] = frienfance;
							}
						}
					}
					for ( var i = 0 ; i < fans.length ; i++ ){
						for( var j = 0 ; j < userlist.length ; j ++){
							if ( fans[i].match(userlist[j]._id) ){
								var frienfance = new Frienfance({
									_id : userlist[j]._id,
									nickname : userlist[j].nickname,
									userimg : userlist[j].userimg,
									frinum : userlist[j].friends,
									fannum : userlist[j].fances,
									ftype : 1
								});
								frslist[frslist.length] = frienfance;
							}
						}
					}

					// console.log('-------------------------------------'+frslist);
					res.render('address', {user : me , frslist : frslist});
				});
			});
		});
		
	}
  	else{
  		res.redirect('/login');
  	}
});
// 添加好友
router.get('/adduser/:userid/:urltype', function(req, res) {
	if (req.session.user ){
		var user = req.session.user;
		var friendid = req.params.userid;
		var urltype = parseInt(req.params.urltype);
		Friend.findByUserId(user._id , function(err , me){
			if ( err ) {
				console.log(err);
			}
			if ( me === null ){
				me = new Friend({
					userid : user._id
				});
			}
			Friend.findByUserId(friendid , function(err,friend){
				if ( friend === null ){
					friend = new Friend({
						userid : friendid
					});
				}
				var information = new Information({
					userid : friendid,
					category : 0
				});
				if ( !me.friendid.match(friendid+',') && !friend.friendid.match(user._id+',') ){//两个互不认识
					me.friendid += friendid+',';
					friend.fanceid += user._id+',';
					addFance(user._id , friendid);
					information.content = user.nickname+'成为了您的新粉丝!';
				}else if( me.fanceid.match(friendid+',') && friend.friendid.match(user._id+',') ){
					me.friendid += friendid+',';
					// console.log(friendid+'---------------------------------'+me.fanceid);
					me.fanceid = me.fanceid.replace(new RegExp(friendid+',') , '');
					// console.log(friendid+'---------------22222------------------'+me.fanceid);
					addFriend(user._id);//变成朋友
					information.content = user.nickname+'添加你为好友!';
				}

				friend.save(function(err ,  f){
					me.save(function(err , m){
						User.findById(user._id , function(err , unew){
							if ( err ){
								console.log(err);
							}
							information.sendid = unew._id;
							information.sendimg = unew.userimg;
							information.sendname = unew.nickname;
							information.save();
							if ( urltype === 0 ){
								res.redirect('/search');
							}else if( urltype === 1 ){
								res.redirect('/user/'+friendid);
							}else if( urltype === 3){
								res.redirect('/picturewall');
							}else{
								res.redirect('/address');
							}
						});
					});
				});
			});
		});
	}
  	else{
  		res.redirect('/login');
  	}
});

function addFance(userid , friendid){
	User.findById(userid , function(err ,user){
		if ( err ) {
			console.log(err);
		}
		User.findById(friendid , function(err , friend){
			if ( err ) {
				console.log(err);
			}
			user.friends++;
			friend.fances++;
			user.save();
			friend.save();
		});
	});
}
function addFriend(userid){
	User.findById(userid , function(err ,user){
		if ( err ) {
			console.log(err);
		}
		user.friends++;
		user.fances--;
		user.fances = user.fances < 0 ? 0 : user.fances;
		user.save();
	});
}
module.exports = router;

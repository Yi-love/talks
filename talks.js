var io = require('socket.io')();

// 用户列表
var userlist = [];

io.sockets.on('connection', function(socket) {
	// 用户登录聊天室
	socket.on('login' , function(data){
		var k = lookuser(data.userid);
		if (  k >= 0 ){
			userlist[k].userid = data.userid;
			userlist[k].socket = this;
			userlist[k].friendid = data.friendid;
		}else{
			userlist[userlist.length] = {socket:this , userid:data.userid , friendid : data.friendid};
		}
	});
	// 聊天
	socket.on('chat', function(data) {
		var content = data.content;
		var userid = data.userid;
		var friendid = data.friendid;
		var k = lookuser(friendid);
		if ( k >= 0 ){
			sio = userlist[k].socket;
			if ( userlist[k].friendid == userid ){//用户与自己聊天   发送数据
				sio.emit('showcontent', {
					content: content ,
				});
			}else {
				sio.emit('messagenew', {//用户在线，但不与自己聊天，发送信息和提示信息
					title : '您有一条新的消息!',
					content: content,
					friendid : userid
				});
			}
		}else{
			socket.emit('sendmessage', {//用户不在。发送信息
				content: content,
				friendid : friendid
			});
		}
	}); 
	socket.on('logout', function(data) {//退出聊天室
		var userid = data.userid;
		var k = lookuser(userid);
		if ( k >= 0 ){
			userlist.splice(k , 1);
		}
	});
});

function lookuser(userid){//查看用户是否在线
	for ( var i = 0  , len = userlist.length ; i < len ; i ++ ){
		if ( userlist[i].userid == userid ){
			return i;
		}
	}
	return - 1;
}
exports.listen = function(_server){
	io.listen(_server);
};
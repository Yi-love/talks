window.onload =function(){
	var socket = io.connect();
	var messagelist = document.getElementById('chatlist');
	var message = document.getElementById('message');
    var sendbt = document.getElementById('send_bt');
    var sendmessagebox = document.getElementById('sendmessagebox');
    var user = {
    	userid:document.getElementById('userid').value , 
    	usernickname:document.getElementById('usernickname').value,
    	userimg:document.getElementById('userimg').value
    };
    var friend = {
    	friendid:document.getElementById('friendid').value , 
    	friendnickname:document.getElementById('friendnickname').value,
    	friendimg:document.getElementById('friendimg').value
    };
    socket.emit('login' , {userid:user.userid , friendid:friend.friendid});
    // 获取聊天数据
	socket.on('showcontent', function(data) {
        var value = data.content;
        var issend = data.issend;
        messagelist.innerHTML +='<div class="comment_item"><div class="comment_friend_img"><img src="../'+friend.friendimg+'" alt=""></div><div class="comment_friend_content"><div class="friend_sj"></div><p>'+value+'</p></div></div>';
   		window.scrollTo(0 , document.body.scrollHeight);
    });
    // 发送提示消息
    socket.on('messagenew' , function(data){
    	var value = data.content;
        var sendid = data.friendid;
        var title = data.title;
        sendmessagebox.style.display = 'block';
        if ( sendid ){
        	$.ajax({
        	  type: 'POST',
        	  url: '/message/sendmessage',
        	  data: JSON.stringify({ userid: user.userid , friendid : sendid , content: value }),
  			  contentType: 'application/json'
        	});
        }
        var url = "/chat/"+sendid;
        sendmessagebox.innerHTML = '<a href="'+url+'">'+title+'</a>';
        setTimeout(function(){
        	sendmessagebox.style.display = 'none';
        } , 5*1000);
    });
    // 对方不在，发送消息
    socket.on('sendmessage', function(data) {
        var value = data.content;
        var friendid = data.friendid;
        if ( friendid == friend.friendid ){
        	$.ajax({
        	  type: 'POST',
        	  url: '/message/sendmessage',
        	  data: JSON.stringify({ userid: friend.friendid , friendid: user.userid , content: value }),
  			  contentType: 'application/json'
        	});
        }
    });
    // 提交聊天数据
    sendbt.addEventListener('click' , function(){
    	if ( message.value.trim() == '' ) 
    		return;
    	socket.emit('chat', {content: message.value , userid:user.userid , friendid:friend.friendid});
    	var text = message.value;
    	messagelist.innerHTML +='<div class="comment_item"><div class="comment_user_img"><img src="../'+user.userimg+'" alt=""></div><div class="comment_user_content"><div class="user_sj"></div><p>'+text+'</p></div></div>';
    	message.value ='';
    	window.scrollTo(0 , document.body.scrollHeight);
    });
    window.onbeforeunload = function(){
	    socket.emit('logout' , {userid:user.userid});
    };
};
 

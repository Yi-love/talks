$(document).ready(function(){
	$('.user_list').on('click' , function(evt){
		var target = event.target || window.event.srcElement;
		if ( $(target).hasClass("btn-danger") && target.nodeName == 'BUTTON' ){
			var userid = $(target).attr('data-id');
			$.ajax({
				type: "POST",
				url: "/admin/setfreeze",
				data: "userid="+userid+"&freeze=1",
				success: function(msg){
				   // alert('冻结成功！');
				}
			});
			$(target).removeClass('btn-danger').addClass('btn-success');
			$(target).html('解锁');
		}else if ( $(target).hasClass("btn-success") && target.nodeName == 'BUTTON' ){
			var userid = $(target).attr('data-id');
			$.ajax({
				type: "POST",
				url: "/admin/setfreeze",
				data: "userid="+userid+"&freeze=0",
				success: function(msg){
				    // alert('解冻成功！');
				}
			});
			$(target).removeClass('btn-success').addClass('btn-danger');
			$(target).html('冻结');
		}
	});

	var userindex = 1;
	var USERTYPE = 0;
	$('.addmore').click(function(){
		if ( USERTYPE  === 0 ){
			findMoreUser();
		}else if ( USERTYPE === 1 ){
			findDJUser(0);
		}else{
			findDJUser(1);
		}
	});

	function findMoreUser(){
		$.get("/admin/findmoreuser/"+userindex ,  function(data){
		    var userlist = data.userlist;
			if ( userlist.length > 0 ) {
				userappend(userlist);
			}
		});
	};

	function findDJUser(usertype){
		$.get("/admin/finddjuser/"+userindex+"/"+usertype ,  function(data){
		    var userlist = data.userlist;
		    // console.log(userlist);
			if ( userlist.length > 0 ) {
				userappend(userlist);
			}
		});
	}
	function userappend(obj){
		var userlist = obj;
		var temp = '';
		for (var i = userlist.length - 1; i >= 0; i--) {
			temp += '<div class="user_item"><div><img src="../'+userlist[i].userimg+'" alt=""></div><div>'+userlist[i].username+'</div><div>'+userlist[i].nickname+'</div><div>';
			if ( userlist[i].online === 1 ){
				temp += '<i class="icon-mobile online"></i></div><div>';
			}else{
				temp += '<i class="icon-mobile notonline"></i></div><div>';
			}
			if ( userlist[i].freeze === 1 ){
				temp += '<button type="button" class="btn btn-success btn-sm" data-id="'+userlist[i]._id+'">解锁</button></div></div>'
			}else {
				temp += '<button type="button" class="btn btn-danger btn-sm" data-id="'+userlist[i]._id+'">冻结</button></div></div>'
			}
		};
		$('.user_list').append(temp);
		userindex++;
	};
	
	$('.userlist_title h4').on('click' , function(){
		$('.userlist_title h4').removeClass('choice');
		$(this).addClass('choice');
		userindex = 0;
		$('.user_list').html('');
		if ($(this).hasClass('userall')){	
			USERTYPE = 0;
			findMoreUser();
		}else if ($(this).hasClass('notdj')){
			USERTYPE = 1;
			findDJUser(0);
		}else{
			USERTYPE = 2;
			findDJUser(1);
		}
	});
});
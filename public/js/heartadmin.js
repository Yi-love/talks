$(document).ready(function(){
	$('.say-content').on('click' , function(evt){
		var target = event.target || window.event.srcElement;
		if ( $(target).hasClass("btn-danger") && target.nodeName == 'BUTTON' ){
			var heartid = $(target).attr('data-id');
			$.ajax({
				type: "POST",
				url: "/admin/setHeartfreeze",
				data: "heartid="+heartid+"&freeze=1",
				success: function(msg){
				   // alert('冻结成功！');
				}
			});
			$(target).removeClass('btn-danger').addClass('btn-success');
			$(target).html('解锁');
		}else if ( $(target).hasClass("btn-success") && target.nodeName == 'BUTTON' ){
			var heartid = $(target).attr('data-id');
			$.ajax({
				type: "POST",
				url: "/admin/setHeartfreeze",
				data: "heartid="+heartid+"&freeze=0",
				success: function(msg){
				    // alert('解冻成功！');
				}
			});
			$(target).removeClass('btn-success').addClass('btn-danger');
			$(target).html('冻结');
		}
	});

	var heartindex = 1;
	var HEARTTYPE = 0;
	$('.addmore').click(function(){
		if ( HEARTTYPE  === 0 ){
			findMoreheart();
		}else if ( HEARTTYPE === 1 ){
			findDJheart(0);
		}else{
			findDJheart(1);
		}
	});

	function findMoreheart(){
		$.get("/admin/findmoreheart/"+heartindex ,  function(data){
		    var heartlist = data.heartlist;
			if ( heartlist.length > 0 ) {
				heartappend(heartlist);
			}
		});
	};

	function findDJheart(hearttype){
		$.get("/admin/finddjheart/"+heartindex+"/"+hearttype ,  function(data){
		    var heartlist = data.heartlist;
		    // console.log(heartlist);
			if ( heartlist.length > 0 ) {
				heartappend(heartlist);
			}
		});
	}
	function heartappend(obj){
		var heartlist = obj;
		var temp = '';
		for ( var i = 0 ; i < heartlist.length ;  i++ ) {
			temp += '<li class="say-item"><div class="say-item-content"><div class="say-user"><div class="user-img-box"><div class="user-img"><img src="../'+heartlist[i].userimg+'" alt=""></div></div><div class="say-title"><h3>'+heartlist[i].nickname+'</h3><h6>'+heartlist[i].writetime+'</h6></div><span class="pushpin">';
			if ( heartlist[i].freeze == 0 ){
				temp += '<button type="button" data-id="'+heartlist[i]._id+'" class="btn btn-danger btn-sm">冻结</button></span></div>';
			}else{
				temp += '<button type="button" data-id="'+heartlist[i]._id+'" class="btn btn-success btn-sm">解锁</button></span></div>';
			}
			temp += '<p class="article-content">'+heartlist[i].content+'</p><div class="article-img-box">';
			if ( heartlist[i].writeimgs != '' ){
				var imgs = heartlist[i].writeimgs.split(',');
				temp += '<ul>';
				for ( var j = 0 , len = imgs.length ; j < len ; j++ ){
					temp += '<li><img src="../'+imgs[j]+'" alt=""></li>';
				}
				temp += '</ul>';
			}
			temp += '</div></div></li>';
		};
		$('.say-content').append(temp);
		heartindex++;
	}
	$('.userlist_title h4').on('click' , function(){
		$('.userlist_title h4').removeClass('choice');
		$(this).addClass('choice');
		heartindex = 0;
		$('.say-content').html('');
		if ($(this).hasClass('heartall')){	
			HEARTTYPE = 0;
			findMoreheart();
		}else if ($(this).hasClass('notdj')){
			HEARTTYPE = 1;
			findDJheart(0);
		}else{
			HEARTTYPE = 2;
			findDJheart(1);
		}
	});
});
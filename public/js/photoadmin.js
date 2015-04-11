$(document).ready(function(){
	$('.photo_list').on('click' , function(evt){
		var target = event.target || window.event.srcElement;
		if ( $(target).hasClass("btn-danger") && target.nodeName == 'BUTTON' ){
			var photoid = $(target).attr('data-id');
			$.ajax({
				type: "POST",
				url: "/admin/setPhotofreeze",
				data: "photoid="+photoid+"&freeze=1",
				success: function(msg){
				   // alert('冻结成功！');
				}
			});
			$(target).removeClass('btn-danger').addClass('btn-success');
			$(target).html('解锁');
		}else if ( $(target).hasClass("btn-success") && target.nodeName == 'BUTTON' ){
			var photoid = $(target).attr('data-id');
			$.ajax({
				type: "POST",
				url: "/admin/setPhotofreeze",
				data: "photoid="+photoid+"&freeze=0",
				success: function(msg){
				    // alert('解冻成功！');
				}
			});
			$(target).removeClass('btn-success').addClass('btn-danger');
			$(target).html('冻结');
		}
	});

	var photoindex = 1;
	var PHOTOTYPE = 0;
	$('.addmore').click(function(){
		if ( PHOTOTYPE  === 0 ){
			findMorephoto();
		}else if ( PHOTOTYPE === 1 ){
			findDJphoto(0);
		}else{
			findDJphoto(1);
		}
	});

	function findMorephoto(){
		$.get("/admin/findmorephoto/"+photoindex ,  function(data){
		    var phtsone = data.phtsone;
		    var phtstwo = data.phtstwo;
		    var phtsthree = data.phtsthree;
			if ( phtsone.length > 0 ) {
				photoappend(phtsone , 0);
				photoappend(phtstwo , 1);
				photoappend(phtsthree , 2);
			}
		});
	};

	function findDJphoto(phototype){
		$.get("/admin/finddjphoto/"+photoindex+"/"+phototype ,  function(data){
		    var phtsone = data.phtsone;
		    var phtstwo = data.phtstwo;
		    var phtsthree = data.phtsthree;
			if ( phtsone.length > 0 ) {
				photoappend(phtsone , 0);
				photoappend(phtstwo , 1);
				photoappend(phtsthree , 2);
			}
		});
	}
	function photoappend(obj , _index){
		var photolist = obj;
		var temp = '';
		for ( var i = 0 ; i < photolist.length ;  i++ ) {
			var imgs = photolist[i].imgurl.split(',');
			temp += '<li><div><img src="../'+imgs[0]+'" alt=""></div>';
			if ( photolist[i].freeze == 0 ){
				temp += '<button type="button" data-id="'+photolist[i]._id+'"  class="btn btn-danger btn-sm">冻结</button></li>';
			}else{
				temp += '<button type="button" data-id="'+photolist[i]._id+'" class="btn btn-success btn-sm">解锁</button></li>';
			}
		};
		if ( _index == 0 ){
			$('.photo_ol_one').append(temp);
		}
		else if ( _index == 1 ){
			$('.photo_ol_two').append(temp);
		}else {
			$('.photo_ol_three').append(temp);
		}
		photoindex++;
	}
	$('.userlist_title h4').on('click' , function(){
		$('.userlist_title h4').removeClass('choice');
		$(this).addClass('choice');
		photoindex = 0;
		$('.photo_ol_one').html('');
		$('.photo_ol_two').html('');
		$('.photo_ol_three').html('');
		if ($(this).hasClass('photoall')){	
			PHOTOTYPE = 0;
			findMorephoto();
		}else if ($(this).hasClass('notdj')){
			PHOTOTYPE = 1;
			findDJphoto(0);
		}else{
			PHOTOTYPE = 2;
			findDJphoto(1);
		}
	});
});
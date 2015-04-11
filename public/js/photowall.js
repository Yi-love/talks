$(document).ready(function(){
	headexe();
	var photoindex = 0;
	$('.addmore').on('click', function(){
		$.get("/picturewall/finddjphoto/"+photoindex+'/0' ,  function(data){
		    var phtsone = data.phtsone;
		    var phtstwo = data.phtstwo;
		    var phtsthree = data.phtsthree;
			if ( phtsone.length > 0 ) {
				photoappend(phtsone , 0);
				photoappend(phtstwo , 1);
				photoappend(phtsthree , 2);
			}
		});
	});

	function photoappend(obj , _index){
		var photolist = obj;
		var temp = '';
		for ( var i = 0 ; i < photolist.length ;  i++ ) {
			var imgs = photolist[i].imgurl.split(',');
			temp += '<li><div class="picture"><a href="/picturewall/picture/'+photolist[i].userid+'"><img src="'+imgs[0]+'" alt=""></a></div><div class="picture_info"><span><a href="/address/adduser/'+photolist[i].userid+'/3"><i class="icon-plus2"></i></a></span><span><a href="/chat/'+photolist[i].userid+'"><i class="icon-bubble"></i></a></span><span><a href="/user/'+photolist[i].userid+'"><i class="icon-home"></i></a></span></div><div class="arct">'+photolist[i].abstract+'</div></li>';
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

});
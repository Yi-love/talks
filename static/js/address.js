window.onload = function(){
	var friendall =document.getElementById('all_bt');
	var friendonly = document.getElementById('friend_bt');
	var fance = document.getElementById('fance_bt');
	var userbox = document.getElementById('user_list_box');
	var list = userbox.querySelectorAll('li');
	var index = 0;
	friendall.addEventListener('click' , function(){
		friendall.style.color = '#f39c11';
		friendall.style.borderBottom = '2px solid #f39c11';
		friendonly.style.color = '#000';
		friendonly.style.borderBottom = 'none';
		fance.style.color = '#000';
		fance.style.borderBottom = 'none';
		index = 0;
		selectList(index , list);
	});
	friendonly.addEventListener('click' , function(){
		friendonly.style.color = '#f39c11';
		friendonly.style.borderBottom = '2px solid #f39c11';
		friendall.style.color = '#000';
		friendall.style.borderBottom = 'none';
		fance.style.color = '#000';
		fance.style.borderBottom = 'none';
		index = 1;
		selectList(index , list);
	});
	fance.addEventListener('click' , function(){
		fance.style.color = '#f39c11';
		fance.style.borderBottom = '2px solid #f39c11';
		friendonly.style.color = '#000';
		friendonly.style.borderBottom = 'none';
		friendall.style.color = '#000';
		friendall.style.borderBottom = 'none';
		index = 2;
		selectList(index , list);
	});

	var searchfriend = document.getElementById('searchfriend');
	var listnames = new Array(list.length);
	for( var i = 0 ; i < list.length ; i++ ) {
		listnames[i] = list[i].querySelector('h3').innerHTML.trim();
	}
	// console.log(listnames);
	searchfriend.addEventListener('keyup',function(){
		var searchvalue = searchfriend.value.trim();
		console.log(searchvalue);
		for( var i = 0 ; i < list.length ; i++ ) {
			if( searchvalue === "" ){
				list[i].style.display = 'block';
			}else if( new RegExp(searchvalue).test(listnames[i])){
				list[i].style.display = 'block';
			}else{
				list[i].style.display = 'none';
			}
		}
	});
};

// 筛选
function selectList(index,list){
	var id = index;
	var len = list.length;
	var lis= list;
	var showid = 0;
	if ( id === 0 ){
		for ( var i = 0 ; i < len ; i++ ) {
			lis[i].style.display = 'block';
		}
	}else if( id === 1 ){
		for ( var i = 0 ; i < len ; i++ ) {
			if ( parseInt(lis[i].getAttribute('data-type')) === 0 ){
				lis[i].style.display = 'block';
			}else{
				lis[i].style.display = 'none';
			}
		}
	}else{
		for ( var i = 0 ; i < len ; i++ ) {
			if ( parseInt(lis[i].getAttribute('data-type')) === 1 ){
				lis[i].style.display = 'block';
			}else{
				lis[i].style.display = 'none';
			}
		}
	}
}
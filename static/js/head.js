// 根据ID查找元素
function getById (idname) {
	return document.getElementById(idname);
}
/*****************
	查找是否有className
*/
function hasClass(obj , classname){
	return obj.className.match(new RegExp('(\\s|^)'+classname+'(\\s|$)'));
}
/****************
	添加class
*/
function addClass(obj , classname) {
	if ( !this.hasClass(obj , classname) ) obj.className += " "+classname;
}
/*********************
	删除class
*/
function removeClass(obj , classname) {
	if ( hasClass(obj , classname) ) {
		var reg = new RegExp('(\\s|^)'+classname+'(\\s|$)');
		obj.className = obj.className.replace(reg , " ");
	}
}

function headexe(){
	// 菜单切换
	var pink = getById('pink');
	getById('menu_bt').addEventListener('click',function(){
		var menu = getById('menu');
		if ( hasClass(menu , 'trans_out') ){
			removeClass(menu , 'trans_out');
			addClass(menu , 'trans_in');
			removeClass(pink , 'other_hidden');
			addClass(pink , 'other_show');
		}else {
			removeClass(menu , 'trans_in');
			addClass(menu , 'trans_out');
			removeClass(pink , 'other_show');
			addClass(pink , 'other_hidden');
		}
	});

	// 其他选项
	getById('other_menu_bt').addEventListener('click' , function(){
		var menu = getById('other_menu');
		removeClass(menu , 'other_hidden');
		addClass(menu , 'other_show');
		removeClass(pink , 'other_hidden');
		addClass(menu , 'other_show');
	});

	pink.addEventListener('click' , function(){
		var menu = getById('menu');
		var other_menu = getById('other_menu');

		if ( hasClass(other_menu , 'other_show') ) {
			removeClass(other_menu , 'other_show');
			addClass(other_menu , 'other_hidden');
			if ( hasClass(menu , 'trans_out') ) {
				removeClass(pink , 'other_show');
				addClass(pink , 'other_hidden');
			}
		}else {
			removeClass(menu , 'trans_in');
			addClass(menu , 'trans_out');
			removeClass(pink , 'other_show');
			addClass(pink , 'other_hidden');
		}
	});
}
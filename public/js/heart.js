window.onload = function(){
	var heartcontent = document.getElementById('heartcontent');
	document.getElementById('editbt').addEventListener('click' , function(){
		if (heartcontent.value.trim() != ""){
			document.getElementById('editheart').submit();
		}
	});
};
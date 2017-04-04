window.onload = function () {
	var info = document.getElementById('info');
	var safe = document.getElementById('safe');
	var password = document.getElementById('password');
	var other = document.getElementById('other');

	var info_content = document.getElementById('info_content');
	var safe_content = document.getElementById('safe_content');
	var password_content = document.getElementById('password_content');
	var other_content = document.getElementById('other_content');

	var info_form = document.getElementById('info_form');
	var safe_form = document.getElementById('safe_form');
	var password_form = document.getElementById('password_form');
	var other_form = document.getElementById('other_form');
	var index = 0;
	info.addEventListener('click' , function(e){
		info_content.style.display = 'block';
		safe_content.style.display = 'none';
		password_content.style.display = 'none';
		other_content.style.display = 'none';
		info.style.borderBottom = '0.2rem solid #3598db';
		safe.style.borderBottom = 'none';
		password.style.borderBottom = 'none';
		other.style.borderBottom = 'none';
		index = 0;
	});
	safe.addEventListener('click' , function(e){
		info_content.style.display = 'none';
		safe_content.style.display = 'block';
		password_content.style.display = 'none';
		other_content.style.display = 'none';
		safe.style.borderBottom = '0.2rem solid #3598db';
		info.style.borderBottom = 'none';
		password.style.borderBottom = 'none';
		other.style.borderBottom = 'none';
		index = 1;
	});
	password.addEventListener('click' , function(e){
		password_content.style.display = 'block';
		safe_content.style.display = 'none';
		info_content.style.display = 'none';
		other_content.style.display = 'none';
		password.style.borderBottom = '0.2rem solid #3598db';
		safe.style.borderBottom = 'none';
		info.style.borderBottom = 'none';
		other.style.borderBottom = 'none';
		index = 2;
	});
	other.addEventListener('click' , function(e){
		other_content.style.display = 'block';
		safe_content.style.display = 'none';
		password_content.style.display = 'none';
		info_content.style.display = 'none';
		other.style.borderBottom = '0.2rem solid #3598db';
		safe.style.borderBottom = 'none';
		password.style.borderBottom = 'none';
		info.style.borderBottom = 'none';
		index = 3;
	});

	var savenow = document.getElementById('save_now');
	savenow.addEventListener('click' , function(){
		if (index === 0){
			info_form.submit();
		}else if (index === 1){
			safe_form.submit();
		}else if (index === 2){
			password_form.submit();
		}else if (index === 3){
			other_form.submit();
		}
	});
};